import {
  OrderDetails,
  OrderDetailsWithItems,
} from "../data-model/data-definitions";
import {
  BillingInfoWithoutIds,
  Order,
  OrderItem,
  OrderStatus,
  ShippingInfoWithoutIds,
} from "../data-model/schema-definitions";
import { db } from "../drizzle/db";
import {
  OrderInvoiceTable,
  OrderItemTable,
  OrderTable,
  UserProfileTable,
  UserTable,
} from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";

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

export async function fetchOrderTableData(): Promise<OrderDetailsWithItems[]> {
  try {
    const result = await db
      .select({
        order_id: OrderTable.order_id,
        user_id: OrderTable.user_id,
        order_name: OrderTable.order_name,
        shipping_data: OrderTable.shipping_data,
        billing_data: OrderTable.billing_data,
        status: OrderTable.status,
        date_created: OrderTable.date_created,
        date_updated: OrderTable.date_updated,
        date_submitted: OrderTable.date_submitted,
        date_shipped: OrderTable.date_shipped,
        date_delivered: OrderTable.date_delivered,
        invoice_amount: OrderInvoiceTable.amount,
        order_invoice_id: OrderInvoiceTable.order_invoice_id,
        ordered_by:
          sql`${UserProfileTable.first_name} || ' ' || ${UserProfileTable.last_name}`.as(
            "ordered_by"
          ),
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

    const reducedResult = result.reduce<
      {
        order_details: OrderDetails;
        order_items: OrderItem[];
      }[]
    >((acc, row) => {
      const orderDetails: OrderDetails = {
        order_id: row.order_id,
        user_id: row.user_id,
        order_name: row.order_name,
        shipping_data: row.shipping_data as ShippingInfoWithoutIds,
        billing_data: row.billing_data as BillingInfoWithoutIds,
        status: row.status as OrderStatus,
        date_created: row.date_created,
        date_updated: row.date_updated,
        date_submitted: row.date_submitted,
        date_shipped: row.date_shipped,
        date_delivered: row.date_delivered,
        amount: row.invoice_amount ? parseFloat(row.invoice_amount) : 0,
        order_invoice_id: row.order_invoice_id ? row.order_invoice_id : "",
        ordered_by: row.ordered_by as string,
      };
      const orderItem = row.order_items as OrderItem;

      let existingOrderInfo = acc.find(
        (o) => o.order_details.order_id === orderDetails.order_id
      );

      if (!existingOrderInfo) {
        existingOrderInfo = { order_details: orderDetails, order_items: [] };
        acc.push(existingOrderInfo);
      }

      if (orderItem) {
        existingOrderInfo.order_items.push(orderItem);
      }

      return acc;
    }, []);

    return reducedResult;
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
