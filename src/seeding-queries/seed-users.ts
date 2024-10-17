import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { users } from "../seed-data/users";
import { UserTable } from "../drizzle/schema";
import { profiles } from "../seed-data/user-profiles";
import { getSchemaName } from "../lib/utils";

export async function seedUsers() {
  console.log("seeding users ...");

  try {
    await db.transaction(async (trx) => {
      //await trx.execute(sql`TRUNCATE TABLE users`);

      //trx.insert(UserTable).values(users).execute();

      for (const user of users) {
        const randEmail =
          Math.random().toString(36).substring(7) + "@some-email.com";
        await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".users 
                      (email, 
                      password, 
                      role) 
          VALUES (${randEmail},
                  ${user.password},
                  ${user.role})`
        );
      }
      console.log(`${users.length} Users seeded successfully`);
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SeedUserProfiles() {
  console.log("seeding user profiles ...");
  // let count = 0;
  try {
    await db.transaction(async (trx) => {
      for (const profile of profiles) {
        // console.log("profile: ", profile);
        // count++;
        // console.log(" count ", count);
        await trx.execute(
          sql`INSERT INTO "${sql.raw(getSchemaName())}".user_profiles 
              (id, 
              "user_id", 
              "first_name", 
              "last_name", 
              company, 
              "account_num", 
              "phone_num") 
            VALUES (${profile.id},
                    ${profile.user_id},
                    ${profile.first_name},
                    ${profile.last_name},
                    ${profile.company},
                    ${profile.account_num},
                    ${profile.phone_num})`
        );
      }
      console.log(`${profiles.length} User Profiles seeded successfully`);
    });
  } catch (error) {
    console.error(error);
  }
}

// NOTE TODO: check syntax
// test transaction

// async function insertUsers(users: User[]) {
//     try {
//       await db.transaction(async (trx) => {
//         for (const user of users) {
//           await trx.insertInto('users').values({
//             id: user.id,
//             name: user.name,
//             email: user.email,
//             password: user.password,
//             date_created: user.date_created,
//             date_updated: user.date_updated,
//           }).execute();
//         }
//       });
//       console.log('Users inserted successfully');
//     } catch (err) {
//       console.error('Error inserting users:', err);
//     }
//   }

//   // Call the function to insert users
//   insertUsers(users).catch((err) => console.error('Error in insertUsers:', err));
