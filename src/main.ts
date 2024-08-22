import "dotenv/config";
import { db } from "./drizzle/db";
import {  } from "./drizzle/schema";
import { eq, sql } from "drizzle-orm";

async function main() {
  console.log("Hello World, watch test");
  // await db.execute(sql`DROP TABLE IF EXISTS "nhic-dev"."postCategory" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "nhic-dev"."userPreferences" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "nhic-dev"."posts" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "nhic-dev"."category" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "nhic-dev"."user" CASCADE`);
  // await db.execute(sql`DROP TYPE IF EXISTS "nhic-dev"."user_role" CASCADE`);
  // await db.execute(sql`DROP SCHEMA IF EXISTS "nhic-dev" CASCADE`);
}

main()
  .then(() => {
    console.log("xxxxx Done xxxxx");
  })
  .catch((error) => {
    console.error(error);
  });

