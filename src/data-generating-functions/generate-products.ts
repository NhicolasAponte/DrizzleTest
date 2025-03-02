import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";
import { productTypes } from "../lib/placeholder-data";
import { InventoryProduct } from "../data-model/schema-types";
import { saveSeedData } from "../lib/utils";
import { profilesSeed } from "../seed/data/user-profiles";

function generateRandomProduct(
  type: string,
  config_options: any
): InventoryProduct {
  const date_created = faker.date.past({ years: 2 });
  let date_updated = faker.date.recent({ days: 30 });
  while (date_updated < date_created) {
    date_updated = faker.date.recent({ days: 30 });
  }
  const randomUserProfile =
    profilesSeed[Math.floor(Math.random() * profilesSeed.length)];

  return {
    product_id: uuidv4(),
    type: type, // from array of product names
    image_url: "https://some/image/url",
    alt: "alt image description",
    description: "description for " + type,
    // NOTE TODO: update config options
    config_options: config_options,
    date_updated,
    updated_by:
      randomUserProfile.first_name + " " + randomUserProfile.last_name,
  };
}

export function generateProducts(outputDir?: string) {
  const products: InventoryProduct[] = [];
  for (let product of productTypes) {
    products.push(generateRandomProduct(product.type, product.config_options));
  }

  const dataType = "InventoryProduct";
  const arrayName = "inventoryProductSeed";
  const fileName = "inventory-products";

  saveSeedData(products, dataType, arrayName, fileName);
}

// const outputDirectory = path.dirname(jsonPath);
// if (!fs.existsSync(outputDirectory)) {
//   fs.mkdirSync(outputDirectory, { recursive: true });
// }

// fs.writeFileSync(jsonPath, JSON.stringify(products, null, 2), "utf-8");
// console.log(`Generated ${products.length} products and saved to ${jsonPath}`);

// const tsContent = `import { Product } from ${};\n\nexport const productsArray: Product[] = ${JSON.stringify(
//   products,
//   null,
//   2
// )};\n`;
// fs.writeFileSync(tsPath, tsContent, "utf-8");
// console.log(`Generated ${products.length} products and saved to ${tsPath}`);
