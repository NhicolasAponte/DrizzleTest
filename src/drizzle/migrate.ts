import "dotenv/config"; // NOTE: when is this step necessary
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { migrationClient } from "./migration-client";

async function main() {
  //NOTE TODO: check env variables here 
  let migrationsFolder = process.env.MIGRATIONS_OUT!;
  let schemaPath = process.env.SCHEMA_PATH!;
  let migrationsTable = process.env.MIGRATIONS_TABLE!;
  let currSchema = process.env.PROD_SCHEMA as string;
  console.log("xxxx Environment: ", process.env.NODE_ENV);
  console.log("xxxxxxxxxxx drizzle config xxxxxxxxxxx")
  console.log("xxxx schema.ts Path: ", schemaPath);
  console.log("xxxx migrations out folder: ", migrationsFolder);
  console.log("xxxx migrations db table: ", migrationsTable);
  console.log("xxxx migrations schema name: ", currSchema);
  await migrate(drizzle(migrationClient), {
    migrationsFolder: process.env.MIGRATIONS_OUT!,
  });

  await migrationClient.end();
}

main();
