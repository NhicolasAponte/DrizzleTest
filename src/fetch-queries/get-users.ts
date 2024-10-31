import { User } from "../data-generating-functions/type-definitions";
import { db } from "../drizzle/db";
import {
  OrderInvoiceTable,
  OrderTable,
  UserShippingInformationTable,
  UserProfileTable,
  UserTable,
} from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function GetUserIds() {
  console.log("---- fetching users ----");

  try {
    const users = await db.select({ id: UserTable.id }).from(UserTable);
    // console.log(users);
    // const user = users[0] as User;
    // console.log("USER:", user);
    // console.log(typeof user);
    // console.log("COUNT: ", users.length);
    // for (const user of users) {
    //   console.log("----");
    //   console.log(user);
    // }
    console.log("Users fetched successfully");
    return users;
  } catch (error) {
    console.error(error);
    return [];
    // initially i thought the return type needed to be specified as Promise<{id: string}[]>,
    // but the actual cause of my user id arrays potentially being
    // undefined where this function was called was due to the missing return
    // in a possible branch of code
  }
}

export async function GetUserEmails() {
  console.log("---- fetching users ----");

  try {
    const users = await db.select({ id: UserTable.id, email: UserTable.email }).from(UserTable);
    // console.log(users);
    // const user = users[0] as User;
    // console.log("USER:", user);
    // console.log(typeof user);
    console.log("COUNT: ", users.length);
    for (const user of users) {
      console.log("----");
      console.log(user);
    }
    console.log("Users fetched successfully");
    return users;
  } catch (error) {
    console.error(error);
    return [];
    // initially i thought the return type needed to be specified as Promise<{id: string}[]>,
    // but the actual cause of my user id arrays potentially being
    // undefined where this function was called was due to the missing return
    // in a possible branch of code
  }
}

export async function GetUsersByState(state: string) {
  console.log("---- fetching users by state ----");

  try {
    const users = await db
      .select({
        id: UserTable.id,
        email: UserTable.email,
        role: UserTable.role,
        first_name: UserProfileTable.first_name,
        last_name: UserProfileTable.last_name,
        company: UserProfileTable.company,
        city: UserShippingInformationTable.city,
        state: UserShippingInformationTable.state,
      })
      .from(UserTable)
      .innerJoin(UserProfileTable, eq(UserTable.id, UserProfileTable.user_id))
      .innerJoin(UserShippingInformationTable, eq(UserTable.id, UserShippingInformationTable.user_id))
      .where(eq(UserShippingInformationTable.state, state));
    console.log(users);
    console.log("Users fetched successfully");
  } catch (error) {
    console.error(error);
    return [];
  }
}
