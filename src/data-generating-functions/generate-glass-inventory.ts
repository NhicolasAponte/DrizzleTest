import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import {
  GlassInventoryItems,
  shapeOptions,
  tintOptions,
} from "../lib/placeholder-data";
import { InventoryGlassItem } from "../data-model/schema-types";
import { saveSeedData } from "../lib/utils";
import { inventoryProductSeed } from "../seed/data/inventory-products";
import { profilesSeed } from "../seed/data/user-profiles";

function generateRandomInventoryGlassItem(name: string): InventoryGlassItem {
  const inventoryGlassItems = GlassInventoryItems;
  const randomName =
    inventoryGlassItems[Math.floor(Math.random() * inventoryGlassItems.length)];
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
  for (let i = 0; i < inventoryProductSeed.length; i++) {
    const coin = Math.floor(Math.random() * 2) + 1;
    if (coin % 2 === 0) {
      compatibleProducts.push(inventoryProductSeed[i].product_id);
    }
  }

  const dateCreated = faker.date.past({ years: 2 });
  let dateUpdated = faker.date.recent({ days: 60 });
  while (dateUpdated < dateCreated) {
    dateUpdated = faker.date.recent({ days: 60 });
  }

  const randomUserProfile =
    profilesSeed[Math.floor(Math.random() * profilesSeed.length)];

  return {
    glass_id: uuidv4(),
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
    updated_by:
      randomUserProfile.first_name + " " + randomUserProfile.last_name,
  };
}

export function generateInventoryGlass(outputDir?: string) {
  const glassInventory: InventoryGlassItem[] = [];
  for (let item of GlassInventoryItems) {
    glassInventory.push(generateRandomInventoryGlassItem(item.name));
  }

  const dataType = "InventoryGlassItem";
  const arrayName = "inventoryGlassSeed";
  const fileName = "inventory-glass";

  saveSeedData(glassInventory, dataType, arrayName, fileName);
}

// const outputDirectory = path.dirname(jsonPath);
// if (!fs.existsSync(outputDirectory)) {
//   fs.mkdirSync(outputDirectory, { recursive: true });
// }

// fs.writeFileSync(jsonPath, JSON.stringify(glassInventory, null, 2), "utf-8");
// console.log(
//   `Generated ${glassInventory.length} glass inventory items and saved to ${jsonPath}`
// );

// const tsContent = `import { GlassInventoryItem } from ${};\n\nexport const glassInventoryArray: GlassInventoryItem[] = ${JSON.stringify(
//   glassInventory,
//   null,
//   2
// )};\n`;
// fs.writeFileSync(tsPath, tsContent, "utf-8");
// console.log(
//   `Generated ${glassInventory.length} glass inventory items and saved to ${tsPath}`
// );
