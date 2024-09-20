import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { generate } from "random-words";
import { ordersArray } from "../seed-data/orders";
import { glassInventoryArray } from "../seed-data/glass-inventory";
import { productsArray } from "../seed-data/products";

export type OrderItem = {
  id: number;
  orderId: string;
  product_type_id: string; // uuid
  product_config: any; // jsonb
  quantity: number;
  note: string;
};

interface productConfig {
  productId: string;
  productType: string;
  shape: string;
  tint: string;
  thickness: string;
  dimensions: string;
  fabrication_options: string;
  misc_options: string;
}

interface glassConfig {
  glassType: string;
  shape: string;
  tint: string;
  thickness: string;
  dimensions: string;
  fabrication_options: string;
  misc_options: string;
}
// need an array of products and configs
function generateRandomOrderItem(orderId: string) {
  const randomGlass =
    glassInventoryArray[Math.floor(Math.random() * glassInventoryArray.length)];
  return {
    id: Math.floor(Math.random() * 1000),
    orderId,
    product_type_id:
      productsArray[Math.floor(Math.random() * productsArray.length)].id, // get product id from generated products
    // use math.random to generate a number 1-5 and get the product[i] at that index
    product_config: {
      // combination of product and glass config
      glassId: randomGlass.id,
      name: randomGlass.name,
      thickness:
        randomGlass.available_thickness[
          Math.floor(Math.random() * randomGlass.available_thickness.length)
        ],
      shape:
        randomGlass.shapes[
          Math.floor(Math.random() * randomGlass.shapes.length)
        ],
      tint: randomGlass.tint[
        Math.floor(Math.random() * randomGlass.tint.length)
      ],
      dimensions: getRandomDimensions(),
    },
    quantity: notSoRandomDistribution(),
    note: "some note",
  };
}

function getRandomDimensions() {
  const width = Math.floor(Math.random() * 48) + 1;
  let height = Math.floor(Math.random() * 96) + 1;
  while (height < width) {
    height = Math.floor(Math.random() * 96) + 1;
  }
  return `${width}x${height}`;
}

function notSoRandomDistribution() {
  const num = Math.floor(Math.random() * 3) + 1;

  return num === 1
    ? Math.floor(Math.random() * 10)
    : num === 2
    ? Math.floor(Math.random() * 60)
    : Math.floor(Math.random() * 211);
}

export function generateOrderItems() {
  const orderItemsData: OrderItem[] = [];
  for (let order of ordersArray) {
    const numItems = Math.floor(Math.random() * 9) + 1;
    for (let i = 0; i < numItems; i++) {
      orderItemsData.push(generateRandomOrderItem(order.id));
    }
  }

  const dir = "./src/seed-data/";
  const jsonPath = `${dir}order-items.json`;
  const tsPath = `${dir}order-items.ts`;

  const outputDir = path.dirname(jsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(orderItemsData, null, 2), "utf-8");
  console.log(
    `Generated ${orderItemsData.length} order items and saved to ${jsonPath}`
  );

  const tsContent = `import { OrderItem } from "../seed-functions/generate-order-items";\n\nexport const orderItemsArray: OrderItem[] = ${JSON.stringify(
    orderItemsData,
    null,
    2
  )};\n`;
  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(
    `Generated ${orderItemsData.length} order items and saved to ${tsPath}`
  );
}
