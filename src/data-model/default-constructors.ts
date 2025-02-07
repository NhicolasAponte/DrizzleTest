import { OrderStatusOptions } from "./enum-types";
import { NewOrder, NewOrderItem, ShippingFields } from "./schema-types";

/**
 * getDefaultShippingFields returns the default values for the Shipping Form
 * @returns ShippingFields
 */
export const getDefaultShippingValues = (): ShippingFields => ({
  street: "",
  apt_num: "",
  city: "",
  state: "",
  zip: "",
  is_job_site: false,
  note: "",
});

/**
 *
 * @returns NewOrder object initialized with default values
 */
export const getDefaultOrderValues = (): NewOrder => ({
  created_by: "", // RESEARCH NOTE: where should the user id be set - server or client side?
  customer_id: "",
  order_name: "",
  shipping_data: {
    street: "",
    apt_num: "",
    city: "",
    state: "",
    zip: "",
    is_job_site: false,
    note: "",
  },
  billing_data: {
    street: "",
    apt_num: "",
    city: "",
    state: "",
    zip: "",
    payment_method: "",
    purchase_order: "",
    primary_contact_name: "",
    primary_contact_email: "",
    primary_contact_phone: "",
    fax_num: "",
    is_primary: false,
    is_active: false,
  },
  status: OrderStatusOptions.Draft,
  date_drafted: new Date(),
  date_updated: new Date(),
  date_submitted: null,
  date_shipped: null,
  date_delivered: null,
});

/**
 * getDefaultOrderItemValues returns the default values for the Order Item Form
 * @returns NewOrderItem
 */
export const getDefaultOrderItemValues = (): NewOrderItem => ({
    product_type_id: "",
    product_config: {},
    quantity: 1,
    note: "",
  })