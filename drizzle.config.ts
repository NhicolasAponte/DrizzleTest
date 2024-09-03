// drizzle.config.ts is used by drizzle kit to configure the CLI 
import { defineConfig } from "drizzle-kit";
// https://orm.drizzle.team/kit-docs/config-reference
export default defineConfig({
  dialect: "postgresql", //dialect is required
  schema: process.env.SCHEMA_PATH,// path for local schema.ts file 
  out: process.env.MIGRATIONS_OUT,// path for local migrations folder
  // driver: "" drive is not required because Drizzle has
  // native support for PostgreSQL with pg, postgres,
  // vercel-postgres, and neon drivers
  dbCredentials: {
    url: process.env.DOCKER_POSTGRES_URL as string,
  },
  migrations: { // config for where the migrations are stored in db 
    table: process.env.MIGRATIONS_TABLE,
    schema: process.env.DEV_SCHEMA,
  },
  //schemaFilter: ["new-schema-test_"],
  verbose: true, //when running the migration, it will print out the SQL queries that are being executed
  strict: true, //
});
