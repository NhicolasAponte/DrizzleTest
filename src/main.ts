import "dotenv/config";
import { db } from "./drizzle/db";
import {  } from "./drizzle/schema";
import { eq, sql } from "drizzle-orm";

async function main() {
  console.log("Hello World, watch test");
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."postCategory" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."userPreferences" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."posts" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."category" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."user" CASCADE`);
  // await db.execute(sql`DROP TYPE IF EXISTS "order-handling"."user_role" CASCADE`);
  // await db.execute(sql`DROP SCHEMA IF EXISTS "order-handling" CASCADE`);
  const environment = process.env.NODE_ENV;
  console.log("Environment: ", process.env.NODE_ENV);
}

main()
  .then(() => {
    console.log("xxxxx Done xxxxx");
  })
  .catch((error) => {
    console.error(error);
  }); 