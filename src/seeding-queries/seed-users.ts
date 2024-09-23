import { sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { users } from "../seed-data/users";
import { UserTable } from "../drizzle/schema";
import { profiles } from "../seed-data/user-profiles";

export async function seedUsers() {
  console.log("seeding users ...");

  try {
    await db.transaction(async (trx) => {
      //await trx.execute(sql`TRUNCATE TABLE users`);

      //trx.insert(UserTable).values(users).execute();

      for (const user of users) {
        await trx.execute(
          sql`INSERT INTO "dev-schema".users (id, email, password, role) VALUES (${user.id},${user.email},${user.password},${user.role})`
          //[user.id, user.email, user.password, user.role]
        );
      }
    });
  } catch (error) {
    console.error(error);
  }
}

export async function SeedUserProfiles() {
  console.log("seeding user profiles ...");

  try {
    await db.transaction(async (trx) => {
      for (const profile of profiles) {
        await trx.execute(
          sql`INSERT INTO "dev-schema".user_profiles (id, "userId", "firstName", "lastName", company, "accountNum", "phoneNum") VALUES (${profile.id},${profile.userId},${profile.firstName},${profile.lastName},${profile.company},${profile.accountNum},${profile.phoneNum})`
        );
      }
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
