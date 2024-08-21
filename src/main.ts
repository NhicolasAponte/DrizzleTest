import "dotenv/config";
import { db } from "./drizzle/db";
import { UserTable } from "./drizzle/schema";
import { sql } from "drizzle-orm";

async function main() {
  console.log("Hello World, watch test");
  await db.execute(sql`DROP TABLE IF EXISTS "drizzle"."user" CASCADE`);
  await db.execute(sql`DROP TYPE IF EXISTS "drizzle"."user_role" CASCADE;`);
  // await db.delete(UserTable);
  // await db.insert(UserTable).values({
  //   name: "Nhic",
  // });
  // const user = await db.query.UserTable.findMany();
  // console.log(user);
}

main()
  .then(() => {
    console.log("xxxxx Done xxxxx");
  })
  .catch((error) => {
    console.error(error);
  });
