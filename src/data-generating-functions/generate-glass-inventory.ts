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
import { productsSeed } from "../seed-data/seed-products";
import { GlassInventoryItem } from "./type-definitions";
import { usersSeed } from "../seed-data/seed-users";
import { saveSeedDataToFiles } from "../lib/utils";

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
  for (let i = 0; i < productsSeed.length; i++) {
    const coin = Math.floor(Math.random() * 2) + 1;
    if (coin % 2 === 0) {
      compatibleProducts.push(productsSeed[i].id);
    }
  }

  const dateCreated = faker.date.past({ years: 2 });
  let dateUpdated = faker.date.recent({ days: 60 });
  while (dateUpdated < dateCreated) {
    dateUpdated = faker.date.recent({ days: 60 });
  }

  return {
    id: uuidv4(),
    name,
    description: "some description for " + name,
    // thickness: Array.from(
    //   { length: Math.floor(Math.random() * 5) + 1 },
    //   () => `${Math.floor(Math.random() * 10) + 1}mm`
    // ),
    // shapes: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
    //   faker.word.noun()
    // ),
    // tint: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () =>
    //   faker.color.human()
    // ),
    thickness: ["1/8", "1/4", "3/8", "1/2", "3/4"],
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
      restock_order_id: uuidv4(),
      supplier_id: uuidv4(),
      expected_arrival_date: faker.date.future(),
    },
    // material on floor, whether it's in processing or stock
    // quantity_on_premise: Math.floor(Math.random() * 1000),
    // probably not needed - qty being processed for an order
    // quantity_on_order: Math.floor(Math.random() * 1000),
    // will require manual entry of re-stock orders
    // the amount of material coming in from  a supplier
    date_created: dateCreated,
    date_updated: dateUpdated,
    updated_by: usersSeed[Math.floor(Math.random() * usersSeed.length)].id,
  };
}

export function generateGlassInventory(outputDir?: string) {
  const glassInventory: GlassInventoryItem[] = [];
  for (let item of GlassInventoryItems) {
    glassInventory.push(generateRandomGlassInventoryItem(item.name));
  }

  let dataType = "GlassInventoryItem";
  let arrayName = "glassInventorySeed";

  const dir = "./src/seed-data";
  const fileName = "seed-glass-inventory";

  let jsonPath = `${dir}/${fileName}.json`;
  let tsPath = `${dir}/${fileName}.ts`;
  let importLine = `import { ${dataType} } from "../data-generating-functions/type-definitions";\n`;

  saveSeedDataToFiles(
    glassInventory,
    dataType,
    arrayName,
    jsonPath,
    tsPath,
    importLine
  );

  if (outputDir) {
    jsonPath = `${outputDir}/${fileName}.json`;
    tsPath = `${outputDir}/${fileName}.ts`;
    importLine = `import { ${dataType} } from "../definitions/data-model";\n`;

    saveSeedDataToFiles(
      glassInventory,
      dataType,
      arrayName,
      jsonPath,
      tsPath,
      importLine
    );
  }
}

// const outputDirectory = path.dirname(jsonPath);
// if (!fs.existsSync(outputDirectory)) {
//   fs.mkdirSync(outputDirectory, { recursive: true });
// }

// fs.writeFileSync(jsonPath, JSON.stringify(glassInventory, null, 2), "utf-8");
// console.log(
//   `Generated ${glassInventory.length} glass inventory items and saved to ${jsonPath}`
// );

// const tsContent = `import { GlassInventoryItem } from "../data-generating-functions/type-definitions";\n\nexport const glassInventoryArray: GlassInventoryItem[] = ${JSON.stringify(
//   glassInventory,
//   null,
//   2
// )};\n`;
// fs.writeFileSync(tsPath, tsContent, "utf-8");
// console.log(
//   `Generated ${glassInventory.length} glass inventory items and saved to ${tsPath}`
// );
