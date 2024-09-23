import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { shippingInfoArray } from "../seed-data/shipping-info";
import { billingInfoArray } from "../seed-data/billing-info";


export const seedShippingInfo = async () => {
  console.log("seeding shipping info ...");

  try {
    await db.transaction(async (trx) => {
      for (const shippingInfo of shippingInfoArray) {
        await trx.execute(
          sql`INSERT INTO "dev-schema".shipping_info (id, "userId", address, city, state, zip, "isJobSite", note) 
          VALUES (${shippingInfo.id},
                  ${shippingInfo.userId},
                  ${shippingInfo.address},
                  ${shippingInfo.city},
                  ${shippingInfo.state},
                  ${shippingInfo.zip},
                  ${shippingInfo.isJobSite},
                  ${shippingInfo.note})`
        );
      }
      console.log("Shipping info seeded successfully");
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SeedBillingInfo() {
    console.log("seeding billing info ...");
    
    try {
        await db.transaction(async (trx) => {
        for (const billingInfo of billingInfoArray) {
          await trx.execute(
            sql`INSERT INTO "dev-schema".billing_info (id, "userId", address, city, state, zip, "paymentMethod", "purchaseOrder", "primaryContactName", "primaryContactEmail", "primaryContactPhone", "faxNum", "isPrimary", "isActive") 
            VALUES (${billingInfo.id},
                    ${billingInfo.userId},
                    ${billingInfo.address},
                    ${billingInfo.city},
                    ${billingInfo.state},
                    ${billingInfo.zip},
                    ${billingInfo.paymentMethod},
                    ${billingInfo.purchaseOrder},
                    ${billingInfo.primaryContactName},
                    ${billingInfo.primaryContactEmail},
                    ${billingInfo.primaryContactPhone},
                    ${billingInfo.faxNum},
                    ${billingInfo.isPrimary},
                    ${billingInfo.isActive})`
          );
        }
        console.log("Billing info seeded successfully");
        });
    } catch (error) {
        console.error(error);
    }
}