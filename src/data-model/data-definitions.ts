import {
  Order,
  OrderItem,
  OrderStatus,
  UserProfile,
} from "./schema-definitions";

export type OrderTableData = {
  order: Order;
  ordered_by: string; //UserProfile.first_name + UserProfile.last_name 
  invoice_amount: number; //OrderInvoice.amount
  order_items: OrderItem[];
};
