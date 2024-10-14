import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ordersArray } from "../seed-data/orders";
import { orderItemsArray } from "../seed-data/order-items";
import { invoicesArray } from "../seed-data/invoices";
import { SchemaName } from "../lib/utils";
import { OrderTable } from "../drizzle/schema";

export async function SeedOrders() {
  console.log("seeding orders ...");

  try {
    await db.delete(OrderTable);
    await db.transaction(async (trx) => {
      for (const order of ordersArray) {
        const serializedBillingInfo = JSON.stringify(order.billing_info);
        const serializedShippingInfo = JSON.stringify(order.shipping_info);
        await trx.execute(
          sql`INSERT INTO "${sql.raw(SchemaName())}".orders 
                      (id,
                      "user_id",
                      "order_name",
                      "billing_info",
                      "shipping_info",
                      status,
                      "date_created",
                      "date_updated",
                      "date_submitted",
                      "date_shipped",
                      "date_delivered")
            VALUES (${order.id},
                    ${order.user_id},
                    ${order.order_name},
                    ${serializedBillingInfo},
                    ${serializedShippingInfo},
                    ${order.status},
                    ${order.date_created},
                    ${order.date_updated},
                    ${order.date_submitted ? order.date_submitted : null},
                    ${order.date_shipped ? order.date_shipped : null},
                    ${order.date_delivered ? order.date_delivered : null})`
        );
      }
      console.log(`${ordersArray.length} Orders seeded successfully`);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SeedOrderItems() {
  console.log("seeding order items ...");
  try {
    await db.transaction(async (trx) => {
      for (const item of orderItemsArray) {
        const serializedProductConfig = JSON.stringify(item.product_config);
        await trx.execute(
          sql`INSERT INTO "${sql.raw(SchemaName())}".order_items
                        (id,
                        "order_id",
                        "product_type_id",
                        product_config,
                        quantity,
                        note) 
                        VALUES (${item.id},
                                ${item.order_id},
                                ${item.product_type_id},
                                ${serializedProductConfig},
                                ${item.quantity},
                                ${item.note})`
        );
      }
      console.log(`${orderItemsArray.length} Order items seeded successfully`);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SeedInvoices() {
  console.log("seeding invoices ...");

  try {
    await db.transaction(async (trx) => {
      for (const invoice of invoicesArray) {
        await trx.execute(
          sql`INSERT INTO "${sql.raw(SchemaName())}"."invoices"
                        (id,
                        user_id,
                        order_id,
                        date_created,
                        status,
                        amount)
              VALUES (${invoice.id},
                      ${invoice.user_id},
                      ${invoice.order_id},
                      ${invoice.date_created},
                      ${invoice.status},
                      ${invoice.amount})`
        );
      }
      console.log(`${invoicesArray.length} Invoices seeded successfully`);
    });
  } catch (error) {
    console.error(error);
  }
}
