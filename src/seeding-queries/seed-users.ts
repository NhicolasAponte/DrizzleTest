import { db } from "../drizzle/db";
import { users } from "../seed-data/users";

export async function seedUsers() {
    console.log("seeding users ...");

    try{
        await db.transaction(async (trx) => {
            await trx.execute(`TRUNCATE TABLE users`);

            for (const user of users) {
                await trx.execute(
                    `INSERT INTO users (id, email, password, role) VALUES (?, ?, ?, ?)`,
                    [user.id, user.email, user.password, user.role]
                );
            }
        })
    } catch(error){
        console.error(error);
    }
}

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