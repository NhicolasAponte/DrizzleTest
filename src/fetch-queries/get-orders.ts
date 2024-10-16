import { db } from "../drizzle/db";
import { OrderTable, UserTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function GetOrdersByUser(userId: string) {
  console.log("---- fetching orders by user ----");

  try {
    const orders = await db
      .select({ id: OrderTable.id, user_id: OrderTable.user_id })
      .from(OrderTable)
      .where(eq(OrderTable.user_id, userId));
    console.log(orders);
    console.log("Orders fetched successfully");
    // const orderByState = await db
  } catch (error) {
    console.error(error);
  }
}
