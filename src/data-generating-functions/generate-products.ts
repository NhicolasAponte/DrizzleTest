import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { productTypes } from "../seed-data/placeholder-data";
import { Product } from "./type-definitions";

function generateRandomProduct(type: string, config_options: any): Product {
  const date_created = faker.date.past({ years: 2 });
  let date_updated = faker.date.recent({ days: 30 });
  while (date_updated < date_created) {
    date_updated = faker.date.recent({ days: 30 });
  }
  return {
    id: uuidv4(),
    type: type, // from array of product names
    image_url: "https://some/image/url",
    alt: "alt image description",
    description: "description for " + type,
    // NOTE TODO: update config options
    config_options: config_options,
    date_created,
    date_updated,
  };
}

export function generateProducts(outputDir?: string) {
  const products: Product[] = [];
  for (let product of productTypes) {
    products.push(generateRandomProduct(product.type, product.config_options));
  }

  const dir = outputDir ? outputDir : "./src/seed-data";
  const jsonPath = `${dir}/products.json`;
  const tsPath = `${dir}/products.ts`;

  const outputDirectory = path.dirname(jsonPath);
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");
  console.log(`Generated ${products.length} products and saved to ${jsonPath}`);

  const tsContent = `import { Product } from "../data-generating-functions/type-definitions";\n\nexport const productsArray: Product[] = ${JSON.stringify(
    products,
    null,
    2
  )};\n`;
  fs.writeFileSync(tsPath, tsContent, "utf-8");
  console.log(`Generated ${products.length} products and saved to ${tsPath}`);
}
