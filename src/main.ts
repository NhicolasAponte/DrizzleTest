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
import { GetUserIds, GetCustomersByState, getCustomerCountByState } from "./fetch-queries/get-users";
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
import { Order } from "./data-model/schema-types";
import { seedDatabase } from "./seed/seed";
import {
  OrderStatusDefinition,
  runOrderStatusTest,
} from "./lib/enum_playground";

async function main() {
  console.log("------------- Hello World ----");
  console.log("");
  console.log("");

  seedDatabase();

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
  // const orderTable = await fetchOrderTableData();
  // console.log(orderTable.length);
  // consoleLogSpacer();
  // console.log( orderTable[100].order_items);

  // await GetCustomersByState("Minnesota");
  // getCustomerCountByState();

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
