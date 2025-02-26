import { generateBillingInfo } from "../data-generating-functions/generate-billingInfo";
import { generateCustomers } from "../data-generating-functions/generate-customers";
import { generateInventoryGlass } from "../data-generating-functions/generate-glass-inventory";
import { generateInvoices } from "../data-generating-functions/generate-invoices";
import { generateOrderItems } from "../data-generating-functions/generate-order-items";
import { generateOrders } from "../data-generating-functions/generate-orders";
import { generateProducts } from "../data-generating-functions/generate-products";
import { generateShippingInfo } from "../data-generating-functions/generate-shippingInfo";
import { generateUserProfiles } from "../data-generating-functions/generate-user-profiles";
import { generateUsers } from "../data-generating-functions/generate-users";
import { seedUserInfo } from "./insert-queries/user-info-seeding";
import { seedCustomerInfo } from "./insert-queries/customer-seeding";
import {
  seedGlassInventory,
  seedProducts,
} from "./insert-queries/product-inventory-seeding";
import { seedOrderInfo } from "./insert-queries/order-item-invoice-seeding";

// to clean up imports i could create a 'data generate service' object that contains all the functions

export async function seedDatabase() {
  const outputDir = process.env.ORDER_PROJECT_PATH;
  //   -------- GENERATE DATA SEQUENCE --------
  // update this project to connect to db and query tables for data 
  //   -------- USER INFO --------
  
    // generateUsers(5, outputDir);
    // generateUserProfiles(outputDir); // 1 profile per user

  //    -------- CUSTOMERS --------

    // generateCustomers(15);
    // generateShippingInfo(outputDir); // 1-3 per customer 
    // generateBillingInfo(outputDir); // 1-3 per customer 
  //
  //  -------- INVENTORY --------

  //   there's few products and they don't depend on other data
    // generateProducts(outputDir);

  //   each item has a random amount of compatible products
  //   each item has a random existing user id in the updated_by field
    // generateInventoryGlass(outputDir);

  //  -------- ORDERS --------

    // generateOrders(outputDir); // rand between 1 - 26 orders per customer 
    // generateOrderItems(outputDir); // rand between 1 - 9 items per order
    // generateInvoices(outputDir);
  // ---------------------------------------------------

  // ------------ CASCADING SEEDING ------------
  // NOTE: run all seeding function at once, without await
  // NOTE: run all seeding function at once, with await
  console.log("seeding database");
  //   await resetDatabase();
  // await seedUserInfo();
  // await seedCustomerInfo(); 
    // await seedProducts();
    // await seedGlassInventory();
    await seedOrderInfo();
}
