export enum OrderStatusDEPRECATED {
  /** Saved by the user but not yet submitted. */
  Draft = "DRAFT",
  /** Submitted but not yet viewed by admin. */
  Pending = "PENDING",
  /** Submitted as a quote. */
  Quote = "QUOTE",
  /** Viewed by admin but not yet shipped. */
  Processing = "PROCESSING",
  /** Shipped but not yet received. */
  Shipped = "SHIPPED",
  /** Received by customer. */
  Delivered = "DELIVERED",
  /** Cancelled by user or admin. */
  Cancelled = "CANCELLED",
}
// TODO NOTE: revise statuses to be more descriptive
// - NEW, AWAITING CONFIRMATION, CONFIRMED, IN PRODUCTION, SHIPPED, DELIVERED
// TODO NOTE: try iterable union type
export const OrderStatusDefinition = {
  /** Saved by the user but not yet submitted. */
  Draft: "DRAFT",
  /** Submitted but not yet viewed by admin. */
  Pending: "PENDING",
  /** Submitted for a quote. */
  Quote: "QUOTE",
  /** Viewed by admin but not yet approved */
  Processing: "PROCESSING",
  /** Shipped but not yet received. */
  Shipped: "SHIPPED",
  /** Received by customer. */
  Delivered: "DELIVERED",
  /** Cancelled by user or admin. */
  Cancelled: "CANCELLED",
} as const;

export type OrderStatusKeys = keyof typeof OrderStatusDefinition;
export type OrderStatusValues =
  (typeof OrderStatusDefinition)[keyof typeof OrderStatusDefinition];
export const OrderStatusArray = Object.values(OrderStatusDefinition);

export type OrderStatusObject = {
  enumStatus: OrderStatusDEPRECATED;
  constStatus: OrderStatusKeys;
  statusValue: OrderStatusValues;
};

const orderStatusTest: OrderStatusObject = {
  // "new" is not a valid OrderStatus but generates no error.
  enumStatus: "New" as OrderStatusDEPRECATED,
  constStatus: "Draft",
  statusValue: "DRAFT",
};

export function runOrderStatusTest() {
  console.log("Order Status Test");
  // console.log("New" in OrderStatuses);
  //   for (const status in OrderStatus) {
  //     console.log("status", status);
  //     const statusValue = OrderStatus.Draft;
  //     // console.log("", statusValue);
  //     const value = OrderStatus["Cancelled"];
  //     // console.log(value);
  //   }

  const temp = "Draft";

  console.log(temp in OrderStatusDefinition);

  if (temp in OrderStatusDefinition) {
  }
}
