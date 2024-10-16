import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { users } from "../seed-data/users";
import { UserTable } from "../drizzle/schema";
import { profiles } from "../seed-data/user-profiles";
import { SchemaName } from "../lib/utils";

export async function seedUserInfo() {
  console.log("seeding users ...");

  try {
    await db.transaction(async (trx) => {

      //trx.insert(UserTable).values(users).execute();

      for (const user of users) {
        const randEmail =
          Math.random().toString(36).substring(7) + "@gmail.com";
        const result = await trx.execute(
          sql`INSERT INTO "${sql.raw(SchemaName())}".users 
                      (email, 
                      password, 
                      role) 
          VALUES (${randEmail},
                  ${user.password},
                  ${user.role})
          RETURNING id`
        );
        console.log("result: ", result);
        // console.log("result.length: ", result.length);
        // console.log("result[0]: ", result[0]);
        // console.log("result[0].id: ", result[0].id);
        SeedUserProfile(user.id, result[0].id as string); // result is an array of object with properties defined in RETURNING clause
      }
      console.log(`${users.length} Users seeded successfully`);
    });
  } catch (error) {
    console.error(error);
  }
}

async function SeedUserProfile(seedUserId: string, dbUserId: string) {
  console.log("seeding user profile ...");
  // let count = 0;
  try {
    for (const profile of profiles) {
      // console.log("profile: ", profile);
      // count++;
      // console.log(" count ", count);
      if (seedUserId === profile.user_id) {
        await db.execute(
          sql`INSERT INTO "${sql.raw(SchemaName())}".user_profiles 
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
      }
    }
    console.log(`${profiles.length} User Profiles seeded successfully`);
  } catch (error) {
    console.error(error);
  }
}
