import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { fa, faker } from "@faker-js/faker";
import {
  productTypes,
  GlassInventoryItems,
  shapeOptions,
  tintOptions,
} from "../seed-data/placeholder-data";
import { users } from "../seed-data/users";
import { date } from "drizzle-orm/mysql-core";

export type GlassInventoryItem = {
  id: string;
  name: string;
  description: string;
  available_thickness: string[];
  shapes: string[];
  tint: string[];
  compatible_products: string[];
  quantity_available: number;
  // supplier_id: string;
  quantity_incoming: quantityIncoming; // jsonb
  date_created: string;
  date_updated: string;
  updated_by: string;
};

// NOTE TODO:
// shape, stock sheets, and different processes may have different min and max values
// for length and width so check each part of config, and offer user option based on
// the largest min smallest max across all parts of configuration

interface quantityIncoming {
  quantity_incoming: number;
  order_id: string;
  supplier_id: string;
  expected_arrival: string;
}

function generateRandomGlassInventoryItem(name: string): GlassInventoryItem {
  const randomName =
    GlassInventoryItems[Math.floor(Math.random() * GlassInventoryItems.length)];
  const numShapes = Math.floor(Math.random() * 20) + 5;
  const compatibleShapes = [];
  for (let i = 0; i < numShapes; i++) {
    compatibleShapes.push(
      shapeOptions[Math.floor(Math.random() * shapeOptions.length)].name
    );
  }
  const numTints = Math.floor(Math.random() * 8) + 4;
  const compatibleTints = [];
  for (let i = 0; i < numTints; i++) {
    compatibleTints.push(
      tintOptions[Math.floor(Math.random() * tintOptions.length)].name
    );
  }
  const compatibleProducts = [];
  for (let i = 0; i < productTypes.length; i++) {
    const coin = Math.floor(Math.random() * 2) + 1;
    if (coin % 2 === 0) {
      compatibleProducts.push(productTypes[i].id);
    }
  }

  const dateCreated = faker.date.past({ years: 2 }).toLocaleString();
  let dateUpdated = faker.date.recent({ days: 60 }).toLocaleString();
  while (dateUpdated < dateCreated) {
    dateUpdated = faker.date.recent({ days: 60 }).toLocaleString();
  }

  return {
    id: uuidv4(),
    name,
    description: "some description for " + name,
    // available_thickness: Array.from(
    //   { length: Math.floor(Math.random() * 5) + 1 },
    //   () => `${Math.floor(Math.random() * 10) + 1}mm`
    // ),
    // shapes: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
    //   faker.word.noun()
    // ),
    // tint: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
    //   faker.color.human()
    // ),
    available_thickness: ["1/8", "1/4", "3/8", "1/2", "3/4"],
    shapes: compatibleShapes,
    tint: compatibleTints,
    // compatible_products: Array.from(
    //   { length: Math.floor(Math.random() * 5) + 1 },
    //   () => uuidv4()
    // ),
    compatible_products: compatibleProducts, // productTypes.map((product, index) => {
    //   const coin = Math.floor(Math.random() * 2) + 1;// NOTE TODO: clean up compatible products logic
    //   if (coin === 1) {
    //     return product.id;
    //   }
    //   return productTypes[0].id;
    // }),
    quantity_available: Math.floor(Math.random() * 1000),
    //supplier_id: uuidv4(),
    quantity_incoming: {
      quantity_incoming: Math.floor(Math.random() * 1000),
      order_id: uuidv4(),
      supplier_id: uuidv4(),
      expected_arrival: faker.date.future().toLocaleString(),
    },
    // material on floor, whether it's in processing or stock
    // quantity_on_premise: Math.floor(Math.random() * 1000),
    // probably not needed - qty being processed for an order
    // quantity_on_order: Math.floor(Math.random() * 1000),
    // will require manual entry of re-stock orders
    // the amount of material coming in from  a supplier
    date_created: dateCreated,
    date_updated: dateUpdated,
    updated_by: users[Math.floor(Math.random() * users.length)].id,
  };
}

export function generateGlassInventory() {
  const glassInventory: GlassInventoryItem[] = [];
  for (let item of GlassInventoryItems) {
    glassInventory.push(generateRandomGlassInventoryItem(item.name));
  }

  const dir = "./src/seed-data/";
  const jsonPath = `${dir}glass-inventory.json`;
  const tsPath = `${dir}glass-inventory.ts`;

  const outputDir = path.dirname(jsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(glassInventory, null, 2), "utf-8");
  console.log(
    `Generated ${glassInventory.length} glass inventory items and saved to ${jsonPath}`
  );

  const tsContent = `import { GlassInventoryItem } from "../seed-functions/generate-glass-inventory";\n\nexport const glassInventoryArray: GlassInventoryItem[] = ${JSON.stringify(
    glassInventory,
    null,
    2
  )};\n`;
  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(
    `Generated ${glassInventory.length} glass inventory items and saved to ${tsPath}`
  );
}
