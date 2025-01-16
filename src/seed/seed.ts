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
import { seedUserInfo } from "../native_id_seeding/user-info-seeding";

// to clean up imports i could create a 'data generate service' object that contains all the functions

export async function seedDatabase() {
  //   -------- GENERATE DATA SEQUENCE --------

  //   -------- USER INFO --------
  const outputDir = process.env.ORDER_PROJECT_PATH;
  //   generateUsers(5, outputDir);
  //   generateUserProfiles(outputDir); // 1 profile per user

  //   generateCustomers(15);
  //   generateShippingInfo(outputDir); // 1-3 per user
  //   generateBillingInfo(outputDir); // 1-3 per user
  //
  //  -------- INVENTORY --------

  //   there's few products and they don't depend on other data
  //   generateProducts(outputDir);

  //   each item has a random amount of compatible products
  //   each item has a random existing user id in the updated_by field
  //   generateInventoryGlass(outputDir);

  //  -------- ORDERS --------

  //   generateOrders(outputDir); // rand between 1 - 26 orders per user
  //   generateOrderItems(outputDir); // rand between 1 - 9 items per order
  //   generateInvoices(outputDir);
  // ---------------------------------------------------

  // ------------ CASCADING SEEDING ------------
  // NOTE: run all seeding function at once, without await
  // NOTE: run all seeding function at once, with await
  // await resetDatabase();
  //   await seedUserInfo();
  // await seedProducts();
  // await seedGlassInventory();
  // await seedOrderInfo();
}
