// drizzle.config.ts is used by drizzle kit to configure the CLI
import { defineConfig } from "drizzle-kit";
import "dotenv/config";
// https://orm.drizzle.team/kit-docs/config-reference
// function getVariables() {
//   let migrationsFolder = process.env.MIGRATIONS_OUT!;
//   let schemaPath = process.env.SCHEMA_PATH!;
//   let migrationsTable = process.env.MIGRATIONS_TABLE!;
//   let currSchema =
//     process.env.NODE_ENV === "production"
//       ? (process.env.PROD_SCHEMA as string)
//       : (process.env.DEV_SCHEMA as string);
//   let devSchema = process.env.DEV_SCHEMA!;
//   // let envFile = process.env.development.DEV_SCHEMA!;
//   // console.log("xxxx Environment: ", envFile);
//   console.log("xxxx Environment: ", process.env.NODE_ENV);
//   console.log("xxxxxxxxxxx drizzle config xxxxxxxxxxx");
//   console.log("xxxx schema.ts Path: ", schemaPath);
//   console.log("xxxx migrations out folder: ", migrationsFolder);
//   console.log("xxxx migrations db table: ", migrationsTable);
//   console.log("xxxx migrations schema name: ", currSchema);
//   console.log("xxxx DEV_SCHEMA: ", devSchema);
//   return schemaPath;
// }
// function getSchema(){
//   const env = process.env.NODE_ENV;
//   if(env === 'production'){
//     return process.env.PROD_SCHEMA!;
//   }
//   const currSchema = process.env.NODE_ENV === 'production' ? process.env.PROD_SCHEMA! : process.env.DEV_SCHEMA!;
//   console.log("xxxx Environment: ", env);
//   console.log("xxxx DEV_SCHEMA: ", process.env.DEV_SCHEMA!);
//   console.log("xxxx PROD_SCHEMA: ", process.env.PROD_SCHEMA!);
//   console.log("xxxx Current Schema: ", currSchema);
//   return currSchema;
// }
export default defineConfig({
  dialect: "postgresql", //dialect is required
  schema: process.env.SCHEMA_PATH!, // path for local schema.ts file
  out:
    process.env.NODE_ENV === "production"
      ? (process.env.PROD_MIGRATIONS_OUT as string)
      : (process.env.MIGRATIONS_OUT as string), // path for local migrations folder
  // driver: "" drive is not required because Drizzle has
  // native support for PostgreSQL with pg, postgres,
  // vercel-postgres, and neon drivers
  dbCredentials: {
    url: process.env.DOCKER_POSTGRES_URL as string,
  },
  migrations: {
    // config for where the migrations are stored in db
    table: process.env.MIGRATIONS_TABLE as string,
    schema:
      process.env.NODE_ENV === "production"
        ? process.env.PROD_SCHEMA!
        : process.env.DEV_SCHEMA!,
  }, // process.env.NODE_ENV === 'production' ? process.env.PROD_SCHEMA! : process.env.DEV_SCHEMA!
  // schemaFilter: ["new-schema-test_"],
  verbose: true, // when running the migration, it will print out the SQL queries that are being executed
  strict: true, // it asks for confirmation before running the migration
});
