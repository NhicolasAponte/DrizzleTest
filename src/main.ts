import "dotenv/config";
import { db } from "./drizzle/db";
import { eq, sql } from "drizzle-orm";
import { generateUsers } from "./data-generating-functions/generate-users";
import { generateUserProfiles } from "./data-generating-functions/generate-user-profiles";
import { generateOrders } from "./data-generating-functions/generate-orders";
import { generateShippingInfo } from "./data-generating-functions/generate-shippingInfo";
import { generateBillingInfo } from "./data-generating-functions/generate-billingInfo";
import { generateProducts } from "./data-generating-functions/generate-products";
import {
  consoleLogLoop,
  consoleLogSpacer,
  dateArithmetic,
  DropSchema,
  FlipCoin,
  formatDateStringToLocal,
  formatDateToLocal,
  getAllSchema,
  GetDateArithmetic,
  getMidpointBetweenDates,
  getMidpointBetweenDatesReverse,
  getSystemTimeZone,
  getTimeArithmetic,
  numOrders,
  OneLineDateArithmetic,
} from "./lib/utils";
import { generateInventoryGlass } from "./data-generating-functions/generate-glass-inventory";
import { generateOrderItems } from "./data-generating-functions/generate-order-items";
import { SeedUserProfiles, seedUsers } from "./seeding-queries/seed-users";
import {
  SeedBillingInfo,
  seedShippingInfo,
} from "./seeding-queries/seed-shipping-billing";
import {
  SeedGlassInventory,
  SeedProducts,
} from "./seeding-queries/seed-product-inventory";
import {
  SeedInvoices,
  SeedOrderItems,
  SeedOrders,
} from "./seeding-queries/seed-orders-items";
import { GetUserIds, GetUsersByState } from "./fetch-queries/get-users";
import {
  fetchOrderItemsPerOrderArrayOutput,
  fetchOrderTableData,
  GetOrdersByUser,
} from "./fetch-queries/get-orders";
import { generateInvoices } from "./data-generating-functions/generate-invoices";
import { pgSchema } from "drizzle-orm/pg-core";
import { GetInvoiceByAmountWithUser } from "./fetch-queries/get-invoices";
import { da, faker } from "@faker-js/faker";
import { date } from "drizzle-orm/mysql-core";
import {
  generateData,
  getUserInput,
  testInput,
} from "./data-generating-functions/seed-db";
import { seedUserInfo } from "./native_id_seeding/user-info-seeding";
import { resetDatabase } from "./native_id_seeding/reset-db";
import {
  seedGlassInventory,
  seedProducts,
} from "./native_id_seeding/product-inventory-seeding";
import { seedOrderInfo } from "./native_id_seeding/order-item-invoice-seeding";
import { ordersSeed } from "./seed-data/seed-orders";
import { Order } from "./data-model/schema-definitions";

async function main() {
  console.log("------------- Hello World ----");
  console.log("");
  console.log("");
  const outputDir = process.env.ORDER_PROJECT_PATH; //orderProjDir// undefined; //process.env.LOCAL_OUTPUT_DIR;

  //   -------- GENERATE DATA SEQUENCE --------

  //   -------- USER INFO --------

  // generateUsers(15, outputDir);
  // generateUserProfiles(outputDir); // 1 profile per user

  // generateShippingInfo(outputDir); // 1-3 per user
  // generateBillingInfo(outputDir); // 1-3 per user

  //    -------- INVENTORY --------

  // there's few products and they don't depend on other data
  // generateProducts(outputDir);

  // each item has a random amount of compatible products
  // each item has a random existing user id in the updated_by field
  // generateInventoryGlass(outputDir);

  //    -------- ORDERS --------

  // generateOrders(outputDir); // rand between 1 - 26 orders per user
  // generateOrderItems(outputDir); // rand between 1 - 9 items per order
  // generateInvoices(outputDir);
  // ---------------------------------------------------

  // ------------ CASCADING SEEDING ------------
  // NOTE: run all seeding function at once, without await
  // NOTE: run all seeding function at once, with await
  // await resetDatabase();
  // await seedUserInfo();
  // await seedProducts();
  // await seedGlassInventory();
  // await seedOrderInfo();

  // -------------- FETCH QUERIES --------------

  // GetUsers();
  // GetOrdersByUser("2e421058-ee40-4e41-a8fb-3a24cd842e18");
  // GetUsersByState("Minnesota");
  // GetInvoiceByAmountWithUser();

  // -------------------------------------------

  // console.log(dbSchema);
  // const items: number[] = [1, 2, 3, 4, 5, 6];
  // let item = 7 //Math.floor(Math.random() * 1000);
  // // // in operator checks if a property is part of some object
  // // // for an array, it checks if the item you are looking for exists among the indexes of the array instead of the values
  // // console.log(item in items);
  // console.log(items.includes(item));
  // for (let i = 0; i < 1000; i++) {
  //   while (item in items) {
  //     item = Math.floor(Math.random() * 1000);
  //   }

  //   items.push(item);
  // }
  // const orders = await fetchOrderTableData();
  // consoleLogSpacer();
  // console.log("Number of orders: ", orders.length);
  // consoleLogSpacer();
  // for (let i = 0; i < 2; i++) {
  //   console.log(orders[i]);
  //   consoleLogSpacer();
  // }

  // const ordersWithItems = await fetchOrderItemsPerOrderArrayOutput();
  // consoleLogSpacer();
  // console.log(ordersWithItems);
  // consoleLogSpacer();
  // const orderId = "83da86c5-9660-45cf-82b7-fdd90551515e";
  // console.log(ordersWithItems![0]);
  // consoleLogSpacer();
  // console.log(ordersWithItems![0].orderItems[0]);
  const orderTable = await fetchOrderTableData();
  console.log(orderTable.length);
  consoleLogSpacer();
  console.log( orderTable[100].order_items);
}

main()
  .then(() => {
    console.log("");
    console.log("");
    console.log("---------------- Done ----");
  })
  .catch((error) => {
    console.error(error);
  });
// function generateData() {
//   throw new Error("Function not implemented.");
// }
