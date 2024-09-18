import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { generate } from "random-words";
import { ordersArray } from "../seed-data/orders";

export type OrderItem = {
    id: number;
    orderId: string;
    product_id: string; // uuid
    product_config: any; // jsonb
    quantity: number;
    note: string;
}

  interface productConfig {
    productId: string;
    productType: string;
    shape: string;
    tint: string;
    thickness: string;
    dimensions: string;
    fabrication_options: string;
    misc_options: string
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
function generateRandomOrderItem(orderId: string){
    return {
        id: Math.floor(Math.random() * 1000),
        orderId,
        product_id: uuidv4(), // get product id from generated products 
        // use math.random to generate a number 1-5 and get the product[i] at that index
        product_config: { // combination of product and glass config 
            name: generate(1)[0],
            price: Math.floor(Math.random() * 10000),
            description: "some description",
        },
        quantity: Math.floor(Math.random() * 211),
        note: "some note",
    };
}

export function generateOrderItems(){
    const orderItemsData: OrderItem[] = [];
    for (let order of ordersArray){
        const numItems = Math.floor(Math.random() * 9) + 1;
        for (let i = 0; i < numItems; i++){
            orderItemsData.push(generateRandomOrderItem(order.id));
        }
    }

    const dir = "./src/seed-data/";
    const jsonPath = `${dir}order-items.json`;
    const tsPath = `${dir}order-items.ts`;

    const outputDir = path.dirname(jsonPath);
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir, {recursive: true});
    }

    fs.writeFileSync(
        jsonPath,
        JSON.stringify(orderItemsData, null, 2),
        "utf-8"
    );
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

