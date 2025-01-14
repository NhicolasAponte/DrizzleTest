import { OrderStatus } from "./data-definitions";

export type Customer = {
  customer_id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: string; // type: individual, business, non-profit  
  credit_status: string; // 
  credit_limit: number; //
  date_created: Date;
  date_updated: Date;
}

export type User = {
  id: string;
  email: string;
  password: string;
  role: UserRole;
};

export enum UserRole {
  Admin = "ADMIN",
  User = "USER",
}

export type UserProfile = {
  profile_id: number;
  user_id: string;
  first_name: string;
  last_name: string;
  account_num?: string;
  phone_num?: string;
  customer_id?: string; 
};

export type UserShippingInformation = {
  shipping_info_id: number;
  user_id: string;
  street: string;
  apt_num?: string | null;
  city: string;
  state: string;
  zip: string;
  is_job_site: boolean;
  note: string;
};

export type ShippingInfoWithoutIds = Omit<
  UserShippingInformation,
  "shipping_info_id" | "user_id"
>;

export type ShippingInfo = UserShippingInformation | ShippingInfoWithoutIds;

export type UserBillingInformation = {
  billing_info_id: number;
  user_id: string;
  street: string;
  apt_num?: string | null;
  city: string;
  state: string;
  zip: string;
  payment_method: string;
  // payment_info: string; // stringified json object
  purchase_order: string;
  primary_contact_name: string;
  primary_contact_email: string;
  primary_contact_phone: string;
  fax_num: string;
  is_primary: boolean;
  is_active: boolean;
};

export type BillingInfoWithoutIds = Omit<
  UserBillingInformation,
  "billing_info_id" | "user_id"
>;

export type BillingInfo = UserBillingInformation | BillingInfoWithoutIds;

// used when generating billing info for orders
export const payment_method_codes = [
  "CREDIT",
  "DEBIT",
  "PURCHASE ORDER",
  "CASH",
  "CHECK",
];
// NOTE: could turn this into payment info object
// in schema, this would be a column in billing info table
// with jsonb type
// export type PaymentMethod = {
//   type: string;
// };

export type InventoryProduct = {
  product_id: string;
  type: string;
  image_url: string;
  alt: string;
  description: string;
  config_options: any;
  // unit price, eventually need to work in unit of measure
  // price: number;
  // unit:
  date_created: Date;
  date_updated: Date;
  updated_by: string;
};

export type InventoryGlassItem = {
  glass_id: string;
  name: string;
  description: string;
  thickness: string[];
  shapes: string[];
  tint: string[];
  compatible_products: string[];
  quantity_available: number;
  // supplier_id: string;
  quantity_incoming: quantityIncoming; // jsonb
  date_created: Date;
  date_updated: Date;
  updated_by: string;
};

// IMPLEMENTATION NOTE:
// shape, stock sheets, and different processes may have different min and max values
// for length and width so check each part of config, and offer user option based on
// the largest min smallest max across all parts of configuration

interface quantityIncoming {
  quantity_incoming: number;
  restock_order_id: string;
  supplier_id: string;
  expected_arrival_date: Date;
}

export type Order = {
  order_id: string;
  created_by: string;
  customer: string; 
  order_name: string;
  order_number: string;
  shipping_data: ShippingInfoWithoutIds;
  billing_data: BillingInfoWithoutIds;
  status: OrderStatus;
  amount: number;
  date_created: Date;
  date_updated: Date;
  date_submitted?: Date | null;
  date_shipped?: Date | null;
  date_delivered?: Date | null;
};

// front-end only
export type NewOrder = Omit<Order, "order_id">;

export type OrderItem = {
  order_item_id: number;
  order_id: string;
  product_type_id: string; // uuid
  product_config: any; // jsonb
  quantity: number;
  note: string;
};

export type NewOrderItem = Omit<OrderItem, "order_item_id" | "order_id">;

export type OrderInvoice = {
  order_invoice_id: string; 
  // user_id of the user that entered the order 
  created_by: string; 
  order_id: string;
  customer_id: string;
  invoice_number: string;
  status: string;
  amount: number;
  date_created: Date;
};
