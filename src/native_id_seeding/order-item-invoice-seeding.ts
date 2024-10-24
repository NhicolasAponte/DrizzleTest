import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ordersArray } from "../seed-data/orders";
import { orderItemsArray } from "../seed-data/order-items";
import { invoicesArray } from "../seed-data/invoices";
import { consoleLogSpacer, getSchemaName } from "../lib/utils";
import { OrderTable, ProductTable } from "../drizzle/schema";
import { GetUserEmails, GetUserIds } from "../fetch-queries/get-users";
import { users as seedUsers } from "../seed-data/users";
import { productsArray as seedProducts } from "../seed-data/products";

function matchUserId(seedId: string, dbUsers: { id: string; email: string }[]) {
  for (const seedUser of seedUsers) {
    if (seedUser.id === seedId) {
      for (const dbUser of dbUsers) {
        if (dbUser.email === seedUser.email) {
          return dbUser.id;
        }
      }
    }
  }

  //   const mappedUserIds = dbUsers.map((dbUser) => {
  //     for (const seedUser of seedUsers) {
  //       if (dbUser.email === seedUser.email) {
  //         return { dbId: dbUser.id, seedId: seedUser.id };
  //       }
  //     }
  //   });
}

function matchProductId(
  seedId: string,
  dbProducts: { id: string; type: string }[]
) {
  for (const seedProduct of seedProducts) {
    if (seedProduct.id === seedId) {
      for (const dbProduct of dbProducts) {
        if (dbProduct.type === seedProduct.type) {
          return dbProduct.id;
        }
      }
    }
  }
}

export async function seedOrderInfo() {
  console.log("seeding orders ...");
  const dbUsers = await GetUserEmails();
  const dbProducts = await db
    .select({
      id: ProductTable.id,
      type: ProductTable.type,
    })
    .from(ProductTable);
  try {
    await db.transaction(async (trx) => {
      console.log("-------- TRANSACTION STARTED --------");
      console.log("");
      for (const order of ordersArray) {
        console.log("xxxxxx NEW ORDER xxxxxx");
        consoleLogSpacer();

        let userID = matchUserId(order.user_id, dbUsers); // userIds[Math.floor(Math.random() * userIds.length)];

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
        };
        const serializedBillingInfo = JSON.stringify(billingInfoData);
        const serializedShippingInfo = JSON.stringify(shippingInfoData);
        const result = await trx.execute(
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
            VALUES (${userID},
                    ${order.order_name},
                    ${serializedBillingInfo},
                    ${serializedShippingInfo},
                    ${order.status},
                    ${order.date_created},
                    ${order.date_updated},
                    ${order.date_submitted ? order.date_submitted : null},
                    ${order.date_shipped ? order.date_shipped : null},
                    ${order.date_delivered ? order.date_delivered : null})
            RETURNING id`
        );

        const orderId = result[0].id;
        console.log(`Inserted order with Order ID: ${orderId}`);
        consoleLogSpacer();
        let itemsCount = 0;
        for (const item of orderItemsArray) {
          if (order.id === item.order_id) {
            console.log("xxx SEEDING ORDER ITEMS xxx");
            itemsCount++;
            let productTypeId = matchProductId(
              item.product_type_id,
              dbProducts
            );

            const serializedProductConfig = JSON.stringify(item.product_config);
            await trx.execute(
              sql`INSERT INTO "${sql.raw(getSchemaName())}".order_items
                                    ("order_id",
                                    "product_type_id",
                                    product_config,
                                    quantity,
                                    note) 
                    VALUES (${orderId},
                            ${productTypeId},
                            ${serializedProductConfig},
                            ${item.quantity},
                            ${item.note})`
            );
          }
        }
        console.log(
          `${itemsCount} Order items seeded for order: ${orderId} successfully`
        );
        consoleLogSpacer();
        let invoiceCount = 0;
        for (const invoice of invoicesArray) {
          if (invoice.order_id === order.id) {
            console.log("xxx SEEDING INVOICE xxx");
            invoiceCount++;
            await trx.execute(
              sql`INSERT INTO "${sql.raw(getSchemaName())}"."invoices"
                            (user_id,
                            order_id,
                            date_created,
                            status,
                            amount)
                    VALUES (${userID},
                            ${orderId},
                            ${invoice.date_created},
                            ${invoice.status},
                            ${invoice.amount})`
            );
          }
        }
        console.log(
          `${invoiceCount} Invoices seeded for order: ${orderId} successfully`
        );
      }
      console.log(`${ordersArray.length} Orders seeded successfully`);
    });
  } catch (error) {
    console.error(error);
  }
}

// export async function seedOrderItems() {
//   console.log("seeding order items ...");
//   try {
//     const orderIds = await db.transaction(async (trx) => {
//       for (const item of orderItemsArray) {
//         const serializedProductConfig = JSON.stringify(item.product_config);
//         await trx.execute(
//           sql`INSERT INTO "${sql.raw(getSchemaName())}".order_items
//                           ("order_id",
//                           "product_type_id",
//                           product_config,
//                           quantity,
//                           note)
//                           VALUES (${item.order_id},
//                                   ${item.product_type_id},
//                                   ${serializedProductConfig},
//                                   ${item.quantity},
//                                   ${item.note})`
//         );
//       }
//       console.log(`${orderItemsArray.length} Order items seeded successfully`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// export async function seedInvoices() {
//   console.log("seeding invoices ...");

//   try {
//     await db.transaction(async (trx) => {
//       for (const invoice of invoicesArray) {
//         await trx.execute(
//           sql`INSERT INTO "${sql.raw(getSchemaName())}"."invoices"
//                           (id,
//                           user_id,
//                           order_id,
//                           date_created,
//                           status,
//                           amount)
//                 VALUES (${invoice.id},
//                         ${invoice.user_id},
//                         ${invoice.order_id},
//                         ${invoice.date_created},
//                         ${invoice.status},
//                         ${invoice.amount})`
//         );
//       }
//       console.log(`${invoicesArray.length} Invoices seeded successfully`);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
