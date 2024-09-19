import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { productTypes } from "../seed-data/placeholder-data";

export type Product = {
  id: string;
  type: string;
  image_url: string;
  alt: string;
  description: string;
  config_options: any;
  // unit price, eventually need to work in unit of measure
  // price: number;
  // unit:
  date_created: string;
  date_updated: string;
};

// get product arrays from orders ui and put them in product types file
// use product array 
function generateRandomProduct(type: string, config_options: any): Product {
  return {
    id: uuidv4(),
    type: type,// from array of product names 
    image_url: "https://via.placeholder.com/150",
    alt: "alt image description",
    description: "description for " + type,
    // NOTE TODO: update config options
    config_options: config_options,
    date_created: new Date().toLocaleString(),
    date_updated: new Date().toLocaleString(),
  };
}

export function generateProducts() {
  const products: Product[] = [];
  for (let product of productTypes) {
    products.push(generateRandomProduct(product.type, product.config_options));
  }

  const dir = "./src/seed-data/";
  const jsonPath = `${dir}products.json`;
  const tsPath = `${dir}products.ts`;

  const outputDir = path.dirname(jsonPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");
  console.log(`Generated ${products.length} products and saved to ${jsonPath}`);

  const tsContent = `import { Product } from "../seed-functions/generate-products";\n\nexport const productsArray: Product[] = ${JSON.stringify(
    products,
    null,
    2
  )};\n`;
  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(`Generated ${products.length} products and saved to ${tsPath}`);
}
