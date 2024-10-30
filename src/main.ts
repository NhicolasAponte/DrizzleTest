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
  dateArithmetic,
  DropSchema,
  FlipCoin,
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
import { GetOrdersByUser } from "./fetch-queries/get-orders";
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

async function main() {
  console.log("------------- Hello World ----");
  console.log("");
  console.log("");
  const outputDir = process.env.ORDER_PROJECT_PATH; //orderProjDir// undefined; //process.env.LOCAL_OUTPUT_DIR;

  //   -------- GENERATE DATA SEQUENCE --------

  //   -------- USER INFO --------

  generateUsers(15, outputDir);
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

  // -------- SEED DATABASE SEQUENCE --------

  // await db.delete(GlassInventoryTable);
  // await db.delete(UserTable);
  // await db.delete(ProductTable);
  // query to reset the primary key sequence
  // await db.execute(sql`
  //   SET session_replication_role = 'replica';
  //   TRUNCATE TABLE "dev-schema".users RESTART IDENTITY CASCADE;
  //   TRUNCATE TABLE "dev-schema".user_profiles RESTART IDENTITY CASCADE;
  //   TRUNCATE TABLE "dev-schema".shipping_info RESTART IDENTITY CASCADE;
  //   TRUNCATE TABLE "dev-schema".billing_info RESTART IDENTITY CASCADE;
  //   TRUNCATE TABLE "dev-schema".products RESTART IDENTITY CASCADE;
  //   TRUNCATE TABLE "dev-schema".glass_inventory_item RESTART IDENTITY CASCADE;
  //   TRUNCATE TABLE "dev-schema".orders RESTART IDENTITY CASCADE;
  //   TRUNCATE TABLE "dev-schema".order_items RESTART IDENTITY CASCADE;
  //   TRUNCATE TABLE "dev-schema".invoices RESTART IDENTITY CASCADE;
  //   SET session_replication_role = 'origin';
  //   `);
  // await seedUsers();
  // seedUsers();
  // SeedUserProfiles();
  //   seedShippingInfo();
  //   SeedBillingInfo();

  //   SeedProducts();
  //   SeedGlassInventory();

  //   SeedOrders();
  //   SeedOrderItems();
  //   SeedInvoices();

  // ---------------------------------------------------

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

  // const dateNow = new Date();
  // // const dateCreated = faker.date.past({ years: 2 });
  // const dateCreated = faker.date.recent({ days: 30 })
  // const x = 30;

  // console.log("    dateNow: ", dateNow);
  // console.log("dateCreated: ", dateCreated);
  // console.log("    dateNow milliseconds: ", dateNow.getTime())
  // console.log("dateCreated milliseconds: ", dateCreated.getTime())
  // // console.log(": ", dateNow - dateCreated);
  // const diff = dateNow.getTime() - dateCreated.getTime();
  // console.log("milliseconds: now - created = ", diff);
  // console.log("milliseconds to days: ", diff/86400000)
  // const midPoint = dateNow.getTime() - (diff/2);
  // console.log("midPoint: ", midPoint);
  // const midDate = new Date(midPoint);
  // console.log("midDate: ", midDate);
  // console.log("        days: now - created = ", dateNow.getDate() - dateCreated.getDate());

  // GetDateArithmetic(dateCreated, x);
  // console.log("----");
  // OneLineDateArithmetic(dateCreated, x);
  // console.log("----");
  // getTimeArithmetic(dateCreated, x);
  // consoleLogLoop();
  // getAllSchema();
  // DropSchema(
  //   process.env.NODE_ENV === "production"
  //     ? process.env.PROD_SCHEMA!
  //     : process.env.DEV_SCHEMA!
  // );
  // consoleLogLoop();
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
