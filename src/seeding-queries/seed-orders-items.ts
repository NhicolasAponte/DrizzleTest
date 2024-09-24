import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ordersArray } from "../seed-data/orders";
import { orderItemsArray } from "../seed-data/order-items";

export async function SeedOrders() {
  console.log("seeding orders ...");

  try {
    await db.transaction(async (trx) => {
      for (const order of ordersArray) {
        const serializedBillingInfo = JSON.stringify(order.billingInfo);
        const serializedShippingInfo = JSON.stringify(order.shippingInfo);
        await trx.execute(
          sql`INSERT INTO "dev-schema".orders 
                      (id,
                      "userId",
                      "orderName",
                      "billingInfo",
                      "shippingInfo",
                      status,
                      "dateCreated",
                      "dateUpdated",
                      "dateSubmitted")
            VALUES (${order.id},
                    ${order.userId},
                    ${order.orderName},
                    ${serializedBillingInfo},
                    ${serializedShippingInfo},
                    ${order.status},
                    ${order.dateCreated},
                    ${order.dateUpdated},
                    ${order.dateSubmitted ? order.dateSubmitted : null})`
        );
      }
      console.log("Orders seeded successfully");
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SeedOrderItems() {
    console.log("seeding order items ..."); 

    try {
        await db.transaction(async (trx) =>{
            for (const item of orderItemsArray) {
                const serializedProductConfig = JSON.stringify(item.product_config);
                await trx.execute(
                    sql`INSERT INTO "dev-schema".order_items
                        (id,
                        "orderId",
                        "product_type_id",
                        product_config,
                        quantity,
                        note) 
                        VALUES (${item.id},
                                ${item.orderId},
                                ${item.product_type_id},
                                ${serializedProductConfig},
                                ${item.quantity},
                                ${item.note})`
                )
            }
            console.log("Order items seeded successfully");
        })
    } catch (error) {
        console.error(error);
    }
}
