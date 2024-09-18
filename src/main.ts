import "dotenv/config";
import { db } from "./drizzle/db";
import { eq, sql } from "drizzle-orm";
import { generateUsers } from "./seed-functions/generate-users";
import { generateUserProfiles } from "./seed-functions/generate-user-profiles";
import { generateOrders } from "./seed-functions/generate-orders";
import { generateShippingInfo } from "./seed-functions/generate-shippingInfo";
import { generateBillingInfo } from "./seed-functions/generate-billingInfo";
import { generateProducts } from "./seed-functions/generate-products";
import { DropSchema, getAllSchema } from "./lib/utils";

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

  // generateUsers(5);
  // generateUserProfiles();

  // generateShippingInfo();
  // generateBillingInfo();

  // generateOrders();
  // generateProducts();

  // consoleLogLoop();
  // getAllSchema();
  DropSchema(
    process.env.NODE_ENV === "production"
      ? process.env.PROD_SCHEMA!
      : process.env.DEV_SCHEMA!
  );
}

main()
  .then(() => {
    console.log("---------------- Done ----");
  })
  .catch((error) => {
    console.error(error);
  });

function consoleLogLoop() {
  for (let i = 0; i < 1000; i++) {
    let num = Math.random() * 1000;
    num = num > 99 ? num : num + 100;
    console.log("num:", num);
  }
}
