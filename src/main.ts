import "dotenv/config";
import { db } from "./drizzle/db";
import { eq, sql } from "drizzle-orm";
import { generateUsers } from "./seed-functions/generate-users";
import { generateUserProfiles } from "./seed-functions/generate-user-profiles";
import { generateOrders } from "./seed-functions/generate-orders";
import { generateShippingInfo } from "./seed-functions/generate-shippingInfo";
import { generateBillingInfo } from "./seed-functions/generate-billingInfo";
import { generateProducts } from "./seed-functions/generate-products";
import {
  consoleLogLoop,
  DropSchema,
  FlipCoin,
  getAllSchema,
  numOrders,
} from "./lib/utils";
import { generateGlassInventory } from "./seed-functions/generate-glass-inventory";
import { generateOrderItems } from "./seed-functions/generate-order-items";
import { SeedUserProfiles, seedUsers } from "./seeding-queries/seed-users";
import {
  SeedBillingInfo,
  seedShippingInfo,
} from "./seeding-queries/seed-shipping-billing";
import {
  SeedGlassInventory,
  SeedProducts,
} from "./seeding-queries/seed-product-inventory";
import {
  SeedInvoices,
  SeedOrderItems,
  SeedOrders,
} from "./seeding-queries/seed-orders-items";
import { ordersArray } from "./seed-data/orders";
import { GetUsers, GetUsersByState } from "./fetch-queries/get-users";
import { GetOrdersByUser } from "./fetch-queries/get-orders";
import { generateInvoices } from "./seed-functions/generate-invoices";
import { dbSchema } from "./drizzle/schema";
import { pgSchema } from "drizzle-orm/pg-core";
import { GetInvoiceByAmountWithUser } from "./fetch-queries/get-invoices";
import { invoicesArray } from "./seed-data/invoices";

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

  // -------- GENERATE SEQUENCE --------
  // generateUsers(15);
// generateUserProfiles(); // 1 profile per user

  // generateShippingInfo(); // 1-3 per user
  // generateBillingInfo(); // 1-3 per user

  // generateOrders(); // rand between 1 - 26 orders per user 
  // generateProducts(); // there's few products and they don't depend on other data
  // each item has a random amount of compatible products
  // each item has a random existing user id in the updated_by field
  // generateGlassInventory();
  // random number of order items per existing order
  // generateOrderItems();
  // generateInvoices();

  // -------- SEED SEQUENCE --------
  // seedUsers();
  // SeedUserProfiles();
  // seedShippingInfo();
  // SeedBillingInfo();

  // SeedProducts();
  // SeedGlassInventory();

  // SeedOrders();
  // SeedOrderItems();
  // SeedInvoices();

  // -------------- FETCH QUERIES --------------
  // GetUsers();
  // GetOrdersByUser("2e421058-ee40-4e41-a8fb-3a24cd842e18");
  // GetUsersByState("Minnesota");
  // GetInvoiceByAmountWithUser();
  // -------------------------------------------


  // console.log(dbSchema);
  // const items: number[] = [1, 2, 3, 4, 5, 6];
  // let item = 7 //Math.floor(Math.random() * 1000);
  // // // in operator checks if a property is part of some object
  // // // for an array, it checks if the item you are looking for exists among the indexes of the array instead of the values
  // // console.log(item in items);
  // console.log(items.includes(item));
  // for (let i = 0; i < 1000; i++) {
  //   while (item in items) {
  //     item = Math.floor(Math.random() * 1000);
  //   }

  //   items.push(item);
  // }

  // consoleLogLoop();
  // getAllSchema();
  // DropSchema(
  //   process.env.NODE_ENV === "production"
  //     ? process.env.PROD_SCHEMA!
  //     : process.env.DEV_SCHEMA!
  // );
  // consoleLogLoop();
}

main()
  .then(() => {
    console.log("---------------- Done ----");
  })
  .catch((error) => {
    console.error(error);
  });
