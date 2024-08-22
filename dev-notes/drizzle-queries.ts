import "dotenv/config";
import { db } from "../src/drizzle/db";
import { UserPreferencesTable, UserTable } from "./drizzle-schema";
import { eq, sql } from "drizzle-orm";

async function main() {
  console.log("Hello World, watch test");
  // await db.execute(sql`DROP TABLE IF EXISTS "drizzle"."user" CASCADE`);
  // await db.execute(sql`DROP TYPE IF EXISTS "drizzle"."user_role" CASCADE;`);
  // await db.delete(UserTable);

  // const user = await createUsers();
  // console.log("xxxxxx User created xxxxxx", user);

  const user = await getUsers();
  console.log("xxxxxx fetched Users xxxxxx", user);
}

main()
  .then(() => {
    console.log("xxxxx Done xxxxx");
  })
  .catch((error) => {
    console.error(error);
  });

async function getUsers(){
  const users = await db.select({ id: UserTable.id, age: UserTable.age})
                        .from(UserTable)
                        .where(eq(UserTable.age, 27))
                        .leftJoin(UserPreferencesTable, eq(UserPreferencesTable.userId, UserTable.id))
  return users;
}

async function createUsers() {
  const name = "case sensitive column names";
  const age = 27;
  const role = "user";
  // NOTE: to type your returns, you can use the `returning` method
  // can insert multiple rows, insert returns an array
  const user = await db
    .insert(UserTable)
    .values([
      {
        name: name,
        age: age,
        email: "user@email.com",
        role: role,
      },
      {
        name: name,
        age: age,
        email: "test-2@email.com",
        role: role,
      },
    ])
    .returning({
      // returning returns an array of objects, one for each item inserted
      id: UserTable.id,
      name: UserTable.name,
      age: UserTable.age,
      email: UserTable.email,
      role: UserTable.role,
    })
    .onConflictDoUpdate({
      // this is a postgresql specific function
      // can use onConflict to perform an upsert
      // if target is not unique, it will update instead of insert
      target: UserTable.email,
      // set field is optional
      // NOTE TODO: what happens if it's not provided
      set: {
        name: sql`${sql.raw("excluded.name")}`,
        age: sql`${sql.raw("excluded.age")}`,
        role: sql`${sql.raw('excluded."userRole"')}`,
        // NOTE: 'excluded' is a postgresql keyword that references the entry that caused the conflict
        // NOTE: avoid using capitals in column names; use quotes to tell
        // postgresql to treat them as case sensitive: .userRole => ."userRole"
      },
    });
  //const user = await db.query.UserTable.findMany();
  return user;
}
