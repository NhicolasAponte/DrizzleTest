import postgres from "postgres";
// for migrations
export const migrationClient = postgres(process.env.DOCKER_POSTGRES_URL as string, {
    max: 1,
  });

// NOTE TODO: migration error 
  //getting the following error when running npm run db:migrate 

  /*
  > drizzletest@1.0.0 db:migrate
> tsx src/drizzle/migrate.ts

C:\Users\nflores\Desktop\dev\Test\DrizzleTest\node_modules\src\migrator.ts:41
                throw new Error(`Can't find meta/_journal.json file`);
                      ^


Error: Can't find meta/_journal.json file
    at readMigrationFiles (C:\Users\nflores\Desktop\dev\Test\DrizzleTest\node_modules\src\migrator.ts:41:9)
    at migrate (C:\Users\nflores\Desktop\dev\Test\DrizzleTest\node_modules\src\postgres-js\migrator.ts:9:21)
    at main (C:\Users\nflores\Desktop\dev\Test\DrizzleTest\src\drizzle\migrate.ts:7:9)
    at <anonymous> (C:\Users\nflores\Desktop\dev\Test\DrizzleTest\src\drizzle\migrate.ts:14:1)
    at Object.<anonymous> (C:\Users\nflores\Desktop\dev\Test\DrizzleTest\src\drizzle\migrate.ts:14:6)
    at Module._compile (node:internal/modules/cjs/loader:1546:14)
    at Object.transformer (C:\Users\nflores\Desktop\dev\Test\DrizzleTest\node_modules\tsx\dist\register-C1urN2EO.cjs:2:1122)
    at Module.load (node:internal/modules/cjs/loader:1317:32)
    at Module._load (node:internal/modules/cjs/loader:1127:12)
    at TracingChannel.traceSync (node:diagnostics_channel:315:14)

Node.js v22.6.0
*/

// in the following post i found a possible solution: separating the migration client and the 
// database initialization into different files migration-client.ts and migrate.ts 
// https://github.com/drizzle-team/drizzle-orm/issues/680 
// however, this fix did not work 