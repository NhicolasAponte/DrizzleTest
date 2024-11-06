import { Order, OrderItem } from "../data-model/schema-definitions";
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
      .select({ id: OrderTable.order_id, user_id: OrderTable.user_id })
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
        order_id: OrderTable.order_id,
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
        order_items: OrderItemTable,
      })
      .from(OrderTable)
      .leftJoin(
        UserProfileTable,
        eq(OrderTable.user_id, UserProfileTable.user_id)
      )
      .leftJoin(
        OrderInvoiceTable,
        eq(OrderTable.order_id, OrderInvoiceTable.order_id)
      )
      .leftJoin(
        OrderItemTable,
        eq(OrderTable.order_id, OrderItemTable.order_id)
      );
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

export async function fetchOrderItemsPerOrderArrayOutput() {
  try {
    const result = await db
      .select({
        order: OrderTable,
        orderItems: OrderItemTable,
      })
      .from(OrderTable)
      .leftJoin(
        OrderItemTable,
        eq(OrderTable.order_id, OrderItemTable.order_id)
      );

    const reducedResult = result.reduce<
      {
        order: Order;
        orderItems: OrderItem[];
      }[]
    >((acc, row) => {
      const order = row.order as Order;
      const orderItem = row.orderItems as OrderItem;

      let existingOrder = acc.find((o) => o.order.order_id === order.order_id);

      if (!existingOrder) {
        existingOrder = { order, orderItems: [] };
        acc.push(existingOrder);
      }

      if (orderItem) {
        existingOrder.orderItems.push(orderItem);
      }

      return acc;
    }, []);
    return reducedResult;
    //return result;
  } catch (error) {
    console.log("failed to get orders and order items", error);
  }
}

export async function fetchOrderItemsPerOrderObjectOutput() {
  try {
    const result = await db
      .select({
        order: OrderTable,
        orderItems: OrderItemTable,
      })
      .from(OrderTable)
      .leftJoin(
        OrderItemTable,
        eq(OrderTable.order_id, OrderItemTable.order_id)
      );

    const reducedResult = result.reduce<
      Record<string, { order: Order; orderItems: OrderItem[] }>
    >((acc, row) => {
      const order = row.order as Order;
      const orderItem = row.orderItems as OrderItem;

      // const billingData = JSON.parse(order.billing_data);
      // console.log(typeof order.billing_data);

      if (!acc[order.order_id]) {
        acc[order.order_id] = { order, orderItems: [] };
      }

      if (orderItem) {
        acc[order.order_id].orderItems.push(orderItem);
      }

      return acc;
    }, {});
    return reducedResult;
    //return result;
  } catch (error) {
    console.log("failed to get orders and order items", error);
  }
}
