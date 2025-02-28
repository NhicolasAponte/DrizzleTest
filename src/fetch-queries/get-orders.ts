import {
  isValidOrderStatus,
  OrderStatus,
  OrderStatusOptions,
} from "../data-model/enum-types";
import {
  CustomerBillingInformation,
  CustomerShippingInformation,
  Order,
  OrderItem,
} from "../data-model/schema-types";
import { db } from "../drizzle/db";
import {
  OrderInvoiceTable,
  OrderItemTable,
  OrderTable,
  UserProfileTable,
} from "../drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { OrderTableRow } from "../lib/fetch-data-type-playground";

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

// same version as function in order project
export async function fetchOrderTableData(): Promise<OrderTableRow[]> {
  try {
    const result = await db
      .select({
        order_id: OrderTable.order_id,
        userId: OrderTable.user_id,
        customer_id: OrderTable.customer_id,
        order_name: OrderTable.order_name,
        order_number: OrderTable.order_number,
        shipping_data: OrderTable.shipping_data,
        billing_data: OrderTable.billing_data,
        status: OrderTable.status,
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
        order_item: OrderItemTable,
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

    const reducedResult = result.reduce<OrderTableRow[]>((acc, row) => {
      const orderDetails = {
        order_id: row.order_id,
        user_id: row.userId,
        customer_id: row.customer_id,
        order_name: row.order_name,
        order_number: row.order_number,
        shipping_data: row.shipping_data as CustomerShippingInformation,
        billing_data: row.billing_data as CustomerBillingInformation,
        status: isValidOrderStatus(row.status)
          ? row.status
          : OrderStatusOptions.Draft,
        date_updated: row.date_updated,
        date_submitted: row.date_submitted ? row.date_submitted : null,
        date_shipped: row.date_shipped ? row.date_shipped : null,
        date_delivered: row.date_delivered ? row.date_delivered : null,
        amount: row.invoice_amount ?? 0,
        order_invoice_id: row.order_invoice_id ? row.order_invoice_id : "",
        ordered_by: row.ordered_by as string,
        order_items: [],
      };
      const orderItem = row.order_item as OrderItem;

      let existingOrderInfo = acc.find(
        (o) => o.order_id === orderDetails.order_id
      );

      if (!existingOrderInfo) {
        existingOrderInfo = orderDetails;
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

type OrderWithOrderItems = { order: Order; orderItems: OrderItem[] };

export async function fetchOrderItemsPerOrderArrayOutput(): Promise<
  OrderWithOrderItems[]
> {
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

    const reducedResult = result.reduce<OrderWithOrderItems[]>((acc, row) => {
      const order: Order = {
        ...row.order,
        status: row.order.status as OrderStatus,
        amount: row.order.amount ?? 0,
      };
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
  } catch (error) {
    console.log("failed to get orders and order items", error);
    throw new Error("Database Error: Failed to fetch draft orders");
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
      const order = {
        ...row.order,
        status: isValidOrderStatus(row.order.status)
          ? row.order.status
          : OrderStatusOptions.Draft,
        amount: row.order.amount ?? 0,
      };
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
