import "dotenv/config";
import { db } from "./drizzle/db";
import {} from "./drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { generateUsers } from "./seed-functions/generate-users";
import { generateUserProfiles } from "./seed-functions/generate-user-profiles";

async function main() {
  console.log("Hello World, watch test");
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."postCategory" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."userPreferences" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."posts" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."category" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."user" CASCADE`);
  // await db.execute(sql`DROP TYPE IF EXISTS "order-handling"."user_role" CASCADE`);
  // await db.execute(sql`DROP SCHEMA IF EXISTS "prod-schema" CASCADE`);
  // await db.execute(
  //   sql`DROP TABLE IF EXISTS "drizzle"."__drizzle_migrations" CASCADE`
  // );
  const environment = process.env.NODE_ENV;
  console.log("Environment: ", process.env.NODE_ENV);

  // CREATE TABLE "order-handling"."user" (name text, lastname text, email text);
  // generateUsers(5);
  generateUserProfiles();
  // NOTE TODO: create profile seed function and let it use existing user ID's
}

main()
  .then(() => {
    console.log("xxxxx Done xxxxx");
  })
  .catch((error) => {
    console.error(error);
  });
