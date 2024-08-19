import "dotenv/config"; // NOTE: when is this step necessary
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { migrationClient } from "./migration-client";

async function main() {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: ".src/drizzle/migrations",
  });

  await migrationClient.end();
}

main();
