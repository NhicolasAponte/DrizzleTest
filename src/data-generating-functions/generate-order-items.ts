import * as fs from "fs";
import * as path from "path";
import { OrderItem } from "./type-definitions";
import { inventoryGlassSeed } from "../seed-data/seed-inventory-glass";
import { inventoryProductSeed } from "../seed-data/seed-inventory-products";
import { ordersSeed } from "../seed-data/seed-orders";
import { saveSeedDataToFiles } from "../lib/utils";

// interface productConfig {
//   productId: string;
//   productType: string;
//   shape: string;
//   tint: string;
//   thickness: string;
//   dimensions: string;
//   fabrication_options: string;
//   misc_options: string;
// }

// interface glassConfig {
//   glassType: string;
//   shape: string;
//   tint: string;
//   thickness: string;
//   dimensions: string;
//   fabrication_options: string;
//   misc_options: string;
// }

// need an array of products and configs
function generateRandomOrderItem(itemId: number, orderId: string) {
  const randomGlass =
    inventoryGlassSeed[Math.floor(Math.random() * inventoryGlassSeed.length)];
  const dimensions = getRandomDimensions();
  return {
    id: itemId,
    order_id: orderId,
    product_type_id:
      inventoryProductSeed[
        Math.floor(Math.random() * inventoryProductSeed.length)
      ].id, // get product id from generated products
    // use math.random to generate a number 1-5 and get the product[i] at that index
    product_config: {
      // combination of product and glass config
      glass_id: randomGlass.id,
      name: randomGlass.name,
      thickness:
        randomGlass.thickness[
          Math.floor(Math.random() * randomGlass.thickness.length)
        ],
      shape:
        randomGlass.shapes[
          Math.floor(Math.random() * randomGlass.shapes.length)
        ],
      tint: randomGlass.tint[
        Math.floor(Math.random() * randomGlass.tint.length)
      ],
      length: dimensions.length,
      width: dimensions.width,
    },
    quantity: notSoRandomDistribution(),
    note: "some note",
  };
}

function getRandomDimensions() {
  const width = Math.floor(Math.random() * 48) + 1;
  let length = Math.floor(Math.random() * 96) + 1;
  while (length < width) {
    length = Math.floor(Math.random() * 96) + 1;
  }
  return { width, length };
}

function notSoRandomDistribution() {
  const num = Math.floor(Math.random() * 3) + 1;

  return num === 1
    ? Math.floor(Math.random() * 10) + 1
    : num === 2
    ? Math.floor(Math.random() * 60) + 1
    : Math.floor(Math.random() * 211) + 1;
}

//function that generates id's

export function generateOrderItems(outputDir?: string) {
  const orderItemsData: OrderItem[] = [];
  const item_ids: number[] = [];
  console.log("Generating order items...");

  for (let order of ordersSeed) {
    const numItems = Math.floor(Math.random() * 9) + 1;
    console.log(`Generating ${numItems} order items for order ${order.id}`);
    for (let i = 0; i < numItems; i++) {
      let itemId = Math.floor(Math.random() * 10000);

      while (item_ids.includes(itemId)) {
        console.log("itemId already exists: ", itemId);
        itemId = Math.floor(Math.random() * 10000);
      }
      item_ids.push(itemId);
      const orderItem = generateRandomOrderItem(itemId, order.id);

      orderItemsData.push(orderItem);
    }
  }

  const dataType = "OrderItem";
  const arrayName = "orderItemsSeed";

  const dir = "./src/seed-data";
  const fileName = "seed-order-items";

  let jsonPath = `${dir}/${fileName}.json`;
  let tsPath = `${dir}/${fileName}.ts`;
  let importLine = `import { ${dataType} } from "../data-generating-functions/type-definitions";\n`;

  saveSeedDataToFiles(
    orderItemsData,
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
      orderItemsData,
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

// fs.writeFileSync(jsonPath, JSON.stringify(orderItemsData, null, 2), "utf-8");
// console.log(
//   `Generated ${orderItemsData.length} order items and saved to ${jsonPath}`
// );

// const tsContent = `import { OrderItem } from "../data-generating-functions/type-definitions";\n\nexport const orderItemsArray: OrderItem[] = ${JSON.stringify(
//   orderItemsData,
//   null,
//   2
// )};\n`;
// fs.writeFileSync(tsPath, tsContent, "utf-8");
// console.log(
//   `Generated ${orderItemsData.length} order items and saved to ${tsPath}`
// );
