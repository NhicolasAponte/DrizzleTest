import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { users } from "../seed-data/users";
import { profiles } from "../seed-data/user-profiles";
import { shippingInfoArray } from "../seed-data/shipping-info";
import { billingInfoArray } from "../seed-data/billing-info";
import { getSchemaName, LogData } from "../lib/utils";
import { PostgresJsTransaction } from "drizzle-orm/postgres-js";

export async function seedUserInfo() {
  console.log("Seeding users...");
  let count = 0;
  try {
    await db.transaction(async (trx) => {
      console.log("-------- TRANSACTION STARTED --------");
      count++;
      for (const user of users) {
        const randEmail =
          Math.random().toString(36).substring(7) + "@some-email.com";

        const result = await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".users 
                      (email, 
                      password, 
                      role) 
          VALUES (${randEmail},
                  ${user.password},
                  ${user.role})
          RETURNING id`
        );

        const newUserId = result[0].id as string;
        console.log(`Inserted user with id: ${newUserId}`);

        // await seedUserProfile(user.id, newUserId, trx);
        // await seedUserShippingInfo(user.id, newUserId, trx);
        // await seedUserBillingInfo(user.id, newUserId, trx);
      }
      console.log(`${users.length} Users seeded successfully`);
    });
    console.log("-------- TRANSACTION COMPLETED --------");
    console.log("--- NUMBER OF EXECUTIONS: ", count);
  } catch (error) {
    console.error("Error seeding users:", error);
  }
}

async function seedUserProfile(seedUserId: string, dbUserId: string, trx) {
  console.log("Seeding user profile...");
  try {
    for (const profile of profiles) {
      if (seedUserId === profile.user_id) {
        await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".user_profiles 
                    ("user_id", 
                    "first_name", 
                    "last_name", 
                    company, 
                    "account_num", 
                    "phone_num") 
                  VALUES (${dbUserId},
                          ${profile.first_name},
                          ${profile.last_name},
                          ${profile.company},
                          ${profile.account_num},
                          ${profile.phone_num})`
        );
        console.log(`Inserted profile for user id: ${dbUserId}`);
      }
    }
    console.log(`${profiles.length} User Profiles seeded successfully`);
  } catch (error) {
    console.error("Error seeding user profiles:", error);
  }
}

async function seedUserShippingInfo(seedUserId: string, dbUserId: string, trx) {
  console.log("Seeding shipping info...");
  try {
    for (const shippingInfo of shippingInfoArray) {
      if (seedUserId === shippingInfo.user_id) {
        await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".shipping_info 
            (user_id, 
            address, 
            city, 
            state, 
            zip, 
            is_job_site, 
            note) 
    VALUES (${dbUserId},
            ${shippingInfo.address},
            ${shippingInfo.city},
            ${shippingInfo.state},
            ${shippingInfo.zip},
            ${shippingInfo.is_job_site},
            ${shippingInfo.note})`
        );
        console.log(`Inserted shipping info for user id: ${dbUserId}`);
      }
    }
    console.log(
      `${shippingInfoArray.length} Shipping Infos seeded successfully`
    );
  } catch (error) {
    console.error("Error seeding shipping info:", error);
  }
}

async function seedUserBillingInfo(seedUserId: string, dbUserId: string, trx) {
  console.log("Seeding billing info...");
  try {
    for (const billingInfo of billingInfoArray) {
      if (seedUserId === billingInfo.user_id) {
        await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".billing_info 
            (user_id, 
            address, 
            city, 
            state, 
            zip, 
            payment_method, 
            purchase_order, 
            primary_contact_name, 
            primary_contact_email, 
            primary_contact_phone, 
            fax_num, 
            is_primary, 
            is_active) 
    VALUES (${dbUserId},
            ${billingInfo.address},
            ${billingInfo.city},
            ${billingInfo.state},
            ${billingInfo.zip},
            ${billingInfo.payment_method},
            ${billingInfo.purchase_order},
            ${billingInfo.primary_contact_name},
            ${billingInfo.primary_contact_email},
            ${billingInfo.primary_contact_phone},
            ${billingInfo.fax_num},
            ${billingInfo.is_primary},
            ${billingInfo.is_active})`
        );
        console.log(`Inserted billing info for user id: ${dbUserId}`);
      }
    }
    console.log(`${billingInfoArray.length} Billing Infos seeded successfully`);
  } catch (error) {
    console.error("Error seeding billing info:", error);
  }
}
