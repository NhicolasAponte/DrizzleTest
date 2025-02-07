import { db } from "../drizzle/db";
import {
  CustomerShippingInformationTable,
  UserTable,
  CustomerTable,
} from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";

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
    const users = await db
      .select({ id: UserTable.id, email: UserTable.email })
      .from(UserTable);
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

type CustomerByState = {
  customer_id: string;
  name: string;
  type: string;
  account_num: string;
  city: string;
  state: string;
};

export async function GetCustomersByState(
  state: string
): Promise<CustomerByState[]> {
  console.log("---- fetching users by state ----");

  try {
    const result = await db
      .select({
        customer_id: CustomerTable.customer_id,
        name: CustomerTable.name,
        type: CustomerTable.type,
        account_num: CustomerTable.account_num,
        city: CustomerShippingInformationTable.city,
        state: CustomerShippingInformationTable.state,
        // count: sql<number>
      })
      .from(CustomerTable)
      .innerJoin(
        CustomerShippingInformationTable,
        eq(
          CustomerTable.customer_id,
          CustomerShippingInformationTable.customer_id
        )
      )
      // .orderBy(CustomerShippingInformationTable.state)
      .where(eq(CustomerShippingInformationTable.state, state));

    console.log(result);
    console.log("COUNT: ", result.length);
    console.log("Customers fetched successfully");

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }
}
// TODO: finish implementing this function 
export async function getCustomerCountByState() {
  console.log("---- fetching customer count by state ----");

  try {
    const result = await db
      .select({
        state: CustomerShippingInformationTable.state,
        count: sql<number>`cast count(*) as int`,
      })
      .from(CustomerShippingInformationTable)
      .groupBy(CustomerShippingInformationTable.state);

    console.log(result);
    console.log("COUNT: ", result.length);
    console.log("Customers fetched successfully");

    return result;
  } catch (error) {
    console.error(error);
    return [];
  }  
}
