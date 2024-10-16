import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { users } from "../seed-data/users";
import { UserTable } from "../drizzle/schema";
import { profiles } from "../seed-data/user-profiles";
import { SchemaName } from "../lib/utils";

export async function resetDatabase() {
  console.log("resetting database ...");

  try {
    await db.execute(sql`SET session_replication_role = replica;`);

    const result = await db.execute(
      sql`TRUNCATE TABLE "${sql.raw(SchemaName())}".billing_info RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(SchemaName())}".glass_inventory_item RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(SchemaName())}".invoices RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(SchemaName())}".order_items RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(SchemaName())}".orders RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(SchemaName())}".products RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(SchemaName())}".shipping_info RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(SchemaName())}".user_profiles RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(SchemaName())}".users RESTART IDENTITY CASCADE;`
    );

    await db.execute(sql`SET session_replication_role = origin;`);

    console.log("database reset successfully");
  } catch (error) {
    console.log("error resetting database ");
    console.error(error);
  }
}
