import "dotenv/config";
import { db } from "./drizzle/db";
import { UserTable } from "./drizzle/schema";

async function main() {
  console.log("Hello World, watch test");
  await db.insert(UserTable).values({
    name: "Nhic",
  });
  const user = await db.query.UserTable.findMany();
  console.log(user);
}

main()
  .then(() => {
    console.log("xxxxx Done xxxxx");
  })
  .catch((error) => {
    console.error(error);
  });
