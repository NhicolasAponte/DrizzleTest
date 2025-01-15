import { generateCustomers } from "../data-generating-functions/generate-customers";
import { generateUserProfiles } from "../data-generating-functions/generate-user-profiles";
import { generateUsers } from "../data-generating-functions/generate-users";
import { seedUserInfo } from "../native_id_seeding/user-info-seeding";

export async function seedDatabase() {
      //   -------- GENERATE DATA SEQUENCE --------

  //   -------- USER INFO --------
  const outputDir = process.env.ORDER_PROJECT_PATH;
//   generateCustomers(15);
//   generateUsers(5, outputDir); 
  generateUserProfiles(outputDir); // 1 profile per user

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
//   await seedUserInfo();
  // await seedProducts();
  // await seedGlassInventory();
  // await seedOrderInfo();
}