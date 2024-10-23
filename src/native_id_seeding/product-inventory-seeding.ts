import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { productsArray } from "../seed-data/products";
import { glassInventoryArray } from "../seed-data/glass-inventory";
import { FlipCoin, getSchemaName } from "../lib/utils";
import { ProductTable } from "../drizzle/schema";
import { GetUserIds } from "../fetch-queries/get-users";

export async function seedProducts() {
  console.log("seeding products ...");

  try {
    await db.transaction(async (trx) => {
      for (const product of productsArray) {
        const serializedConfigOptions = JSON.stringify(product.config_options);
        await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".products 
                    (type, 
                    "image_url", 
                    alt, 
                    description, 
                    "config_options", 
                    "date_created", 
                    "date_updated")
            VALUES (${product.type},
                    ${product.image_url},
                    ${product.alt},
                    ${product.description},
                    ${serializedConfigOptions},
                    ${product.date_created},
                    ${product.date_updated})`
        );
      }
      console.log(`${productsArray.length} Products seeded successfully`);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function seedGlassInventory() {
  const productIds = await db
    .select({ id: ProductTable.id })
    .from(ProductTable);
  console.log("Product IDs: ", productIds);
  const userIds = await GetUserIds();
  console.log("User IDs: ", userIds);
  console.log("");
  try {
    console.log("seeding glass inventory ...");
    await db.transaction(async (trx) => {
      for (const item of glassInventoryArray) {
        const serializedThickness = JSON.stringify(item.thickness);
        const serializedShapes = JSON.stringify(item.shapes);
        const serializedTint = JSON.stringify(item.tint);
        let compatibleProducts: string[] = [];
        for (const product of productIds) {
          if (FlipCoin()) {
            compatibleProducts.push(product.id);
          }
        }
        if (compatibleProducts.length === 0) {
          compatibleProducts.push(productIds[0].id);
          compatibleProducts.push(productIds[1].id);
        }
        const serializedCompatibleProducts = JSON.stringify(compatibleProducts);
        const serializedQuantityIncoming = JSON.stringify(
          item.quantity_incoming
        );
        const randomUserId =
          userIds[Math.floor(Math.random() * userIds.length)].id;
        await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".glass_inventory_item 
                      (name, 
                       description, 
                       thickness, 
                       shapes, 
                       tint, 
                       compatible_products, 
                       quantity_available, 
                       quantity_incoming, 
                       date_created, 
                       date_updated, 
                       updated_by)
              VALUES (${item.name},
                      ${item.description},
                      ${serializedThickness},
                      ${serializedShapes},
                      ${serializedTint},
                      ${serializedCompatibleProducts},
                      ${item.quantity_available},
                      ${serializedQuantityIncoming},
                      ${item.date_created},
                      ${item.date_updated},
                      ${randomUserId})`
        );
      }
      console.log(
        `${glassInventoryArray.length} Glass Inventory seeded successfully`
      );
    });
  } catch (error) {
    console.error(error);
  }
}
