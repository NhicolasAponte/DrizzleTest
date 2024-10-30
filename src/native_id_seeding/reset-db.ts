import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { getSchemaName } from "../lib/utils";

export async function resetDatabase() {
  console.log("resetting database ...");

  try {
    await db.execute(sql`SET session_replication_role = replica;`);

    const result = await db.execute(
      sql`TRUNCATE TABLE "${sql.raw(
        getSchemaName()
      )}".user_billing_information RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(
        getSchemaName()
      )}".inventory_glass_item RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(
        getSchemaName()
      )}".order_invoices RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(
        getSchemaName()
      )}".order_items RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(
        getSchemaName()
      )}".orders RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(
        getSchemaName()
      )}".inventory_products RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(
        getSchemaName()
      )}".user_shipping_information RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(
        getSchemaName()
      )}".user_profiles RESTART IDENTITY CASCADE;
      TRUNCATE TABLE "${sql.raw(
        getSchemaName()
      )}".users RESTART IDENTITY CASCADE;`
    );

    await db.execute(sql`SET session_replication_role = origin;`);

    console.log("database reset successfully");
  } catch (error) {
    console.log("error resetting database ");
    console.error(error);
  }
}
