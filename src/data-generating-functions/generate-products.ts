import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { productTypes } from "../seed-data/placeholder-data";
import { Product } from "./type-definitions";
import { saveSeedDataToFiles } from "../lib/utils";

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

  const dataType = "Product";
  const arrayName = "productsArray";

  const dir = "./src/seed-data";
  const fileName = "seedProducts";

  let jsonPath = `${dir}/${fileName}.json`;
  let tsPath = `${dir}/${fileName}.ts`;
  let importLine =
    'import { Product } from "../data-generating-functions/type-definitions";\n';

  saveSeedDataToFiles(
    products,
    dataType,
    arrayName,
    jsonPath,
    tsPath,
    importLine
  );

  if (outputDir) {
    jsonPath = `${outputDir}/${fileName}.json`;
    tsPath = `${outputDir}/${fileName}.ts`;
    importLine = 'import { Product } from "../definitions/data-model";\n';

    saveSeedDataToFiles(
      products,
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

// fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");
// console.log(`Generated ${products.length} products and saved to ${jsonPath}`);

// const tsContent = `import { Product } from "../data-generating-functions/type-definitions";\n\nexport const productsArray: Product[] = ${JSON.stringify(
//   products,
//   null,
//   2
// )};\n`;
// fs.writeFileSync(tsPath, tsContent, "utf-8");
// console.log(`Generated ${products.length} products and saved to ${tsPath}`);
