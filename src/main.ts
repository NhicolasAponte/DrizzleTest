import "dotenv/config";
import { db } from "./drizzle/db";
import { eq, sql } from "drizzle-orm";
import { generateUsers } from "./seed-functions/generate-users";
import { generateUserProfiles } from "./seed-functions/generate-user-profiles";
import { generateOrders } from "./seed-functions/generate-orders";
import { generateShippingInfo } from "./seed-functions/generate-shippingInfo";
import { generateBillingInfo } from "./seed-functions/generate-billingInfo";
import { generateProducts } from "./seed-functions/generate-products";
import { DropSchema, getAllSchema, numOrders } from "./lib/utils";
import { generateGlassInventory } from "./seed-functions/generate-glass-inventory";
import { generateOrderItems } from "./seed-functions/generate-order-items";

async function main() {
  console.log("------------- Hello World ----");

  // const environment = process.env.NODE_ENV;
  // console.log("Environment: ", process.env.NODE_ENV);

  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."postCategory" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."userPreferences" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."posts" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."category" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."user" CASCADE`);
  // await db.execute(sql`DROP TYPE IF EXISTS "order-handling"."user_role" CASCADE`);
  // await db.execute(sql`DROP SCHEMA IF EXISTS "dev-schema" CASCADE`);
  // await db.execute(sql`DROP SCHEMA IF EXISTS "prod-schema" CASCADE`);
  // await db.execute(
  //   sql`DROP TABLE IF EXISTS "drizzle"."__drizzle_migrations" CASCADE`
  // );

  // CREATE TABLE "order-handling"."user" (name text, lastname text, email text);

  // generateUsers(10);
  // generateUserProfiles(); // 1 profile per user 

  // generateShippingInfo(); // 1 per user 
  // generateBillingInfo(); // 1 per user 

  // generateOrders(); // rand between 1 - 26 orders per user 
  // generateProducts(); // there's few products and they don't depend on other data 
  // each item has a random amount of compatible products 
  // each item has a random existing user id in the updated_by field 
  // generateGlassInventory(); 
  // random number of order items per existing order 
  // generateOrderItems();
  
  // consoleLogLoop();
  // getAllSchema();
  // DropSchema(
  //   process.env.NODE_ENV === "production"
  //     ? process.env.PROD_SCHEMA!
  //     : process.env.DEV_SCHEMA!
  // );
}

main()
  .then(() => {
    console.log("---------------- Done ----");
  })
  .catch((error) => {
    console.error(error);
  });
