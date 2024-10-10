import "dotenv/config";
import { db } from "./drizzle/db";
import { eq, sql } from "drizzle-orm";
import { generateUsers } from "./seed-functions/generate-users";
import { generateUserProfiles } from "./seed-functions/generate-user-profiles";
import { generateOrders } from "./seed-functions/generate-orders";
import { generateShippingInfo } from "./seed-functions/generate-shippingInfo";
import { generateBillingInfo } from "./seed-functions/generate-billingInfo";
import { generateProducts } from "./seed-functions/generate-products";
import {
  consoleLogLoop,
  DropSchema,
  FlipCoin,
  getAllSchema,
  numOrders,
} from "./lib/utils";
import { generateGlassInventory } from "./seed-functions/generate-glass-inventory";
import { generateOrderItems } from "./seed-functions/generate-order-items";
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
import { ordersArray } from "./seed-data/orders";
import { GetUsers, GetUsersByState } from "./fetch-queries/get-users";
import { GetOrdersByUser } from "./fetch-queries/get-orders";
import { generateInvoices } from "./seed-functions/generate-invoices";
import { dbSchema } from "./drizzle/schema";
import { pgSchema } from "drizzle-orm/pg-core";
import { GetInvoiceByAmountWithUser } from "./fetch-queries/get-invoices";
import { invoicesArray } from "./seed-data/invoices";
import { faker } from "@faker-js/faker";
import { date } from "drizzle-orm/mysql-core";

async function main() {
  console.log("------------- Hello World ----");
  console.log("");
  console.log("");
  // const environment = process.env.NODE_ENV;
  // console.log("Environment: ", process.env.NODE_ENV);

  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."postCategory" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."userPreferences" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."posts" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."category" CASCADE`);
  // await db.execute(sql`DROP TABLE IF EXISTS "order-handling"."user" CASCADE`);
  // await db.execute(sql`DROP TYPE IF EXISTS "order-handling"."user_role" CASCADE`);
  // await db.execute(sql`DROP SCHEMA IF EXISTS "dev-schema" CASCADE`);
  // await db.execute(sql`DROP SCHEMA IF EXISTS "prod-schema" CASCADE`);
  // await db.execute(
  //   sql`DROP TABLE IF EXISTS "drizzle"."__drizzle_migrations" CASCADE`
  // );

  // CREATE TABLE "order-handling"."user" (name text, lastname text, email text);

  // -------- GENERATE SEQUENCE --------
  // generateUsers(15);
  // generateUserProfiles(); // 1 profile per user

  // generateShippingInfo(); // 1-3 per user
  // generateBillingInfo(); // 1-3 per user

  // generateOrders(); // rand between 1 - 26 orders per user
  // generateProducts(); // there's few products and they don't depend on other data
  // each item has a random amount of compatible products
  // each item has a random existing user id in the updated_by field
  // generateGlassInventory();
  // random number of order items per existing order
  // generateOrderItems();
  // generateInvoices();

  // -------- SEED SEQUENCE --------
  // seedUsers();
  // SeedUserProfiles();
  // seedShippingInfo();
  // SeedBillingInfo();

  // SeedProducts();
  // SeedGlassInventory();

  // SeedOrders();
  // SeedOrderItems();
  // SeedInvoices();

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
  // dateArithmetic();

  // const dateNow = new Date();
  // console.log("dateNow:", dateNow);
  // console.log("dateNow type:", typeof dateNow);
  // console.log("dateNow.getTime() =>", dateNow.getTime());
  // // console.log("date timezone", dateNow.getTimezoneOffset());
  // // console.log("dateNow as num", dateNow as Number)
  // console.log("----");

  let dateCreated = faker.date.past({ years: 2 }); //.toLocaleString();
  console.log("dateCreated:", dateCreated);
  // console.log("dateCreated type:", typeof dateCreated);
  console.log("dateCreated.getTime() =>", dateCreated.getTime());
  console.log("dateCreate.getDate() =>", dateCreated.getDate());
  console.log("----");

  const x= 45;
  console.log("x:", x);
  console.log("----");

  let dateCreatedPlusX = dateCreated.setDate(dateCreated.getDate() + x);
  console.log("dateCreatedPlusX: getDate() =>:", dateCreatedPlusX);
  // console.log("dateCreatedPlusX type:", typeof dateCreatedPlusX);
  // console.log("----"); 

  
  let dateCreatedPlusXAsDate = new Date(dateCreatedPlusX);
  console.log("dateCreatedPlusXAsDate:", dateCreatedPlusXAsDate);

  console.log("----"); 
  let datePlusXSetTIme = dateCreated.setTime(dateCreated.getTime() + x);
  console.log("datePlusXSetTIme: getTime() =>:", datePlusXSetTIme);
  let datePlusXSetTImeAsDate = new Date(datePlusXSetTIme);
  console.log("datePlusXSetTImeAsDate:", datePlusXSetTImeAsDate);
  // console.log("dateCreatedPlusXAsDate type:", typeof dateCreatedPlusXAsDate);
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

function dateArithmetic() {
  let dateCreated = faker.date.past({ years: 2 }); //.toLocaleString();
  const dateNow = new Date();
  const maxDate = new Date(dateCreated.setDate(dateCreated.getDate() + 205));
  console.log("maxDate type:", typeof maxDate);
  while (maxDate > dateNow) {
    console.log("dateCreated", dateCreated);
    dateCreated = faker.date.past({ years: 2 });
  }

  let dateUpdated = undefined;
  let dateSubmitted = undefined;
  let dateShipped = undefined;
  let dateDelivered = undefined;
  let count = 0;
  for (let i = 0; i < 100; i++) {
    dateUpdated = faker.date.soon({ days: 65, refDate: dateCreated });
    dateSubmitted = dateUpdated;
    dateShipped = faker.date.soon({ days: 120, refDate: dateSubmitted });
    dateDelivered = faker.date.soon({ days: 20, refDate: dateShipped });

    if (
      dateUpdated > dateNow ||
      dateSubmitted > dateNow ||
      dateShipped > dateNow ||
      dateDelivered > dateNow
    ) {
      console.log("--------------------------------------------");
      console.log("date is in the future");
      console.log("dateCreated:", dateCreated);
      console.log("dateUpdated:", dateUpdated);
      console.log("dateSubmitted:", dateSubmitted);
      console.log("dateShipped:", dateShipped);
      console.log("dateDelivered:", dateDelivered);
      count++;
      console.log("--------------------------------------------");
    }
  }
  console.log("dates in future:", count);
}
