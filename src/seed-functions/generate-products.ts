import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { faker } from "@faker-js/faker";

export type Product = {
    id: string;
    name: string;
    description: string;
    image: string;
    alt: string;
    category: string;
    subcategory: string;
    quantity_available: number;
    config_options: any;
    // unit price, eventually need to work in unit of measure
    price: number;
    // unit: 
    supplier_id: string;
    quantity_on_premise: number;
    quantity_on_order: number;
    quantity_incoming: quantityIncoming; // jsonb
    tags: string[];
  }

  interface quantityIncoming {
    quantity_incoming: number;
    order_id: string;
    supplier_id: string;
    expected_arrival: string;
  }

  // get product arrays from orders ui and put them in product types file 

    function generateRandomProduct(): Product {
        return {
        id: uuidv4(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: "https://via.placeholder.com/150",
        alt: "alt image description",
        category: faker.commerce.department(),
        subcategory: faker.commerce.productMaterial(),
        quantity_available: Math.floor(Math.random() * 1000),
        // NOTE TODO: update config options 
        config_options: {
            color: faker.color.human(),
            size: faker.commerce.productAdjective(),
            material: faker.commerce.productMaterial(),
        },
        price: Math.floor(Math.random() * 1000),
        supplier_id: uuidv4(),
        // material on floor, whether it's in processing or stock 
        quantity_on_premise: Math.floor(Math.random() * 1000), 
        // probably not needed - qty being processed for an order 
        quantity_on_order: Math.floor(Math.random() * 1000), 
        // will require manual entry of re-stock orders
        // the amount of material coming in from  a supplier 
        quantity_incoming: { 
            quantity_incoming: Math.floor(Math.random() * 1000),
            order_id: uuidv4(),
            supplier_id: uuidv4(),
            //   expected_arrival: "2024-11-10T10:02:32.713Z",
            expected_arrival: faker.date.future().toLocaleString(),
        },
        tags: [faker.commerce.productAdjective(), faker.commerce.productAdjective(), faker.commerce.productAdjective()]
        };
    }

    export function generateProducts() {
        const products: Product[] = [];
        for (let i = 0; i < 50; i++) {
            products.push(generateRandomProduct());
        }
      
        const dir = "./src/seed-data/";
        const jsonPath = `${dir}products.json`;
        const tsPath = `${dir}products.ts`;
      
        const outputDir = path.dirname(jsonPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
      
        fs.writeFileSync(
          jsonPath,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
        console.log(
          `Generated ${products.length} products and saved to ${jsonPath}`
        );
      
        const tsContent = `import { Product } from "../seed-functions/generate-products";\n\nexport const productsArray: Product[] = ${JSON.stringify(
          products,
          null,
          2
        )};\n`;
        fs.writeFileSync(tsPath, tsContent, "utf-8");
        console.log(
          `Generated ${products.length} products and saved to ${tsPath}`
        );
    }