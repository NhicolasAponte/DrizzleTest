import {
  Order,
  OrderItem,
} from "../data-generating-functions/type-definitions";
import { db } from "../drizzle/db";
import {
  OrderInvoiceTable,
  OrderItemTable,
  OrderTable,
  UserProfileTable,
  UserTable,
} from "../drizzle/schema";
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

export async function fetchOrderTableData() {
  try {
    const result = await db
      .select({
        id: OrderTable.id,
        user_id: OrderTable.user_id,
        order_name: OrderTable.order_name,
        status: OrderTable.status,
        shipping_data: OrderTable.shipping_data,
        billing_data: OrderTable.billing_data,
        date_created: OrderTable.date_created,
        date_updated: OrderTable.date_updated,
        date_submitted: OrderTable.date_submitted,
        date_shipped: OrderTable.date_shipped,
        date_delivered: OrderTable.date_delivered,
        ordered_by_first_name: UserProfileTable.first_name,
        ordered_by_last_name: UserProfileTable.last_name,
        invoice_amount: OrderInvoiceTable.amount,
      })
      .from(OrderTable)
      .leftJoin(
        UserProfileTable,
        eq(OrderTable.user_id, UserProfileTable.user_id)
      )
      .leftJoin(
        OrderInvoiceTable,
        eq(OrderTable.id, OrderInvoiceTable.order_id)
      )
      .leftJoin(OrderItemTable, eq(OrderTable.id, OrderItemTable.order_id));
    //2024-07-09T05:00:00.000Z
    //2024-05-01T05:00:00.000Z
    // console.log(data.rows);
    // return data.rowCount && data.rowCount > 0 ? data.rows : [];
    return result;
  } catch (error) {
    // return [];
    throw new Error("Database Error: Failed to fetch draft orders");
  }
}

export async function fetchOrderItemsPerOrder() {
  try {
    const result = await db
      .select({
        order: OrderTable,
        orderItems: OrderItemTable,
      })
      .from(OrderTable)
      .leftJoin(OrderItemTable, eq(OrderTable.id, OrderItemTable.order_id));

    const reducedResult = result.reduce<
      Record<string, { order: Order; orderItems: OrderItem[] }>
    >((acc, row) => {
      const order = row.order;
      const orderItem = row.orderItems;

      if (!acc[order.id]) {
        acc[order.id] = { order, orderItems: [] };
      }

      if (orderItem) {
        acc[order.id].orderItems.push(orderItem);
      }

      return acc;
    }, {});
    return reducedResult;
    //return result;
  } catch (error) {
    console.log("failed to get orders and order items", error);
  }
}
