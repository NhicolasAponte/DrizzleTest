import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ordersArray } from "../seed-data/orders";
import { orderItemsArray } from "../seed-data/order-items";
import { invoicesArray } from "../seed-data/invoices";
import { getSchemaName } from "../lib/utils";
import { OrderTable } from "../drizzle/schema";
import { GetUserIds } from "../fetch-queries/get-users";

export async function seedOrders() {
  console.log("seeding orders ...");
  const userIds = await GetUserIds();
  try {
    // await db.delete(OrderTable);
    await db.transaction(async (trx) => {
      for (const order of ordersArray) {
        const userID = userIds[Math.floor(Math.random() * userIds.length)];
        const { shipping_info, billing_info } = order;
        const billingInfoData = {
          address: billing_info.address,
          city: billing_info.city,
          state: billing_info.state,
          zip: billing_info.zip,
          payment_method: billing_info.payment_method,
          purchase_order: billing_info.purchase_order,
          primary_contact_name: billing_info.primary_contact_name,
          primary_contact_email: billing_info.primary_contact_email,
          primary_contact_phone: billing_info.primary_contact_phone,
          fax_num: billing_info.fax_num,
        };
        const shippingInfoData = {
            address: shipping_info.address,
            city: shipping_info.city,
            state: shipping_info.state,
            zip: shipping_info.zip, 
            is_job_site: shipping_info.is_job_site,
            note: shipping_info.note,
        }
        const serializedBillingInfo = JSON.stringify(billingInfoData);
        const serializedShippingInfo = JSON.stringify(shippingInfoData);
        await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".orders 
                      ("user_id",
                      "order_name",
                      "billing_info",
                      "shipping_info",
                      status,
                      "date_created",
                      "date_updated",
                      "date_submitted",
                      "date_shipped",
                      "date_delivered")
            VALUES (${userID.id},
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
