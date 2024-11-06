import {
  Order,
  OrderItem,
  OrderStatus,
  UserProfile,
} from "./schema-definitions";

export type OrderTableData = {
  order: Order;
  ordered_by_first_name: string; //UserProfile.first_name
  ordered_by_last_name: string; //UserProfile.last_name
  invoice_amount: number; //OrderInvoice.amount
  order_items: OrderItem[];
};
