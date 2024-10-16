import * as readline from "readline";
import { generateUsers } from "./generate-users";
import { generateUserProfiles } from "./generate-user-profiles";
import {
  SeedOrders,
  SeedOrderItems,
  SeedInvoices,
} from "../seeding-queries/seed-orders-items";
import {
  SeedProducts,
  SeedGlassInventory,
} from "../seeding-queries/seed-product-inventory";
import {
  seedShippingInfo,
  SeedBillingInfo,
} from "../seeding-queries/seed-shipping-billing";
import { seedUsers, SeedUserProfiles } from "../seeding-queries/seed-users";
import { generateBillingInfo } from "./generate-billingInfo";
import { generateGlassInventory } from "./generate-glass-inventory";
import { generateInvoices } from "./generate-invoices";
import { generateOrderItems } from "./generate-order-items";
import { generateOrders } from "./generate-orders";
import { generateProducts } from "./generate-products";
import { generateShippingInfo } from "./generate-shippingInfo";
import { db } from "../drizzle/db";
import {
  GlassInventoryTable,
  UserTable,
  ProductTable,
} from "../drizzle/schema";
import { setTimeout } from "timers/promises";

// NOTE TODO: get user input to work for interactive data generation and db seeding 
export function getUserInput(question: string): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    console.log("getUserInput: ---- reading input ---- ");
    rl.question(question, () => {
      rl.close();
      resolve();
    });
  });
}

export async function testInput() {
  console.log("testInput: Testing input");
  console.log("");
  const userInput = await getUserInput("Press enter to continue");
  console.log("User input: ", userInput);
  console.log("typeof userInput: ", typeof userInput);
  console.log("");
}

export async function generateData(outputDir?: string) {
  //   try {
  //     console.log("Starting data generation...");
  //     generateUsers(15, outputDir);
  //     // await getUserInput("Press Enter to continue to the next step...");
  //     generateUserProfiles();
  //     await setTimeout(5000);
  //     console.log("---- 5 sec passed ---- ");
  //     try {
  //       generateUserProfiles(); // 1 profile per user
  //     //   await getUserInput("Press Enter to continue to the next step...");
  //     } catch (error) {
  //       console.error("Error generating user profiles:", error);
  //       return;
  //     }
  //     try {
  //         generateShippingInfo(); // 1-3 per user
  //         generateBillingInfo(); // 1-3 per user
  //         await setTimeout(5000);
  //     console.log("---- 5 sec passed ---- ");
  //     //   await getUserInput("Press Enter to continue to the next step...");
  //     } catch (error) {
  //       console.error("Error generating shipping or billing info:", error);
  //       return;
  //     }
  //     try {
  //       generateOrders(); // rand between 1 - 26 orders per user
  //       generateProducts(); // there's few products and they don't depend on other data
  //       await setTimeout(5000);
  //       console.log("---- 5 sec passed ---- ");
  //       //   await getUserInput("Press Enter to continue to the next step...");
  //     } catch (error) {
  //       console.error("Error generating orders or products:", error);
  //       return;
  //     }
  //     try {
  //       generateGlassInventory();
  //       generateOrderItems();
  //   generateInvoices();
  //     //   await getUserInput("Press Enter to continue to the next step...");
  //     } catch (error) {
  //       console.error(
  //         "Error generating glass inventory, order items, or invoices:",
  //         error
  //       );
  //       return;
  //     }
  //   } catch (error) {
  //     console.error("Error during data generation:", error);
  //   }
  //   return "Data generation completed.";
}

// export async function seedDatabase() {
//   console.log("Starting data seeding...");

//   try {
//     seedUsers();
//     SeedUserProfiles();
//     await getUserInput("Press Enter to continue to the next step...");
//   } catch (error) {
//     console.error("Error seeding users or user profiles:", error);
//     return;
//   }

//   try {
//     seedShippingInfo();
//     SeedBillingInfo();
//     await getUserInput("Press Enter to continue to the next step...");
//   } catch (error) {
//     console.error("Error seeding shipping or billing info:", error);
//     return;
//   }

//   try {
//     SeedProducts();
//     SeedGlassInventory();
//     await getUserInput("Press Enter to continue to the next step...");
//   } catch (error) {
//     console.error("Error seeding products or glass inventory:", error);
//     return;
//   }

//   try {
//     SeedOrders();
//     SeedOrderItems();
//     SeedInvoices();
//     await getUserInput("Press Enter to finish...");
//   } catch (error) {
//     console.error("Error seeding orders, order items, or invoices:", error);
//     return;
//   }

//   console.log("Database seeding completed.");
// }

// export async function seedNewDatabase(deleteData: boolean) {
//   if (deleteData) {
//     await db.delete(GlassInventoryTable);
//     await db.delete(UserTable);
//     await db.delete(ProductTable);
//   }

//   // -------- GENERATE SEQUENCE --------
//   generateUsers(15);
//   generateUserProfiles(); // 1 profile per user

//   generateShippingInfo(); // 1-3 per user
//   generateBillingInfo(); // 1-3 per user

//   generateOrders(); // rand between 1 - 26 orders per user
//   generateProducts(); // there's few products and they don't depend on other data
//   // each item has a random amount of compatible products
//   // each item has a random existing user id in the updated_by field
//   generateGlassInventory();
//   // random number of order items per existing order
//   generateOrderItems();
//   generateInvoices();

//   // -------- SEED SEQUENCE --------
//   seedUsers();
//   SeedUserProfiles();
//   seedShippingInfo();
//   SeedBillingInfo();

//   SeedProducts();
//   SeedGlassInventory();

//   SeedOrders();
//   SeedOrderItems();
//   SeedInvoices();
// }
