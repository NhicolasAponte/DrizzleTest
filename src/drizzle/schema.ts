import {
  boolean,
  date,
  integer,
  jsonb,
  pgEnum,
  pgSchema,
  pgTable,
  primaryKey,
  real,
  serial,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
//NOTE TODO: debug: process.env.NODE_ENV === 'development' ? process.env.DEV_SCHEMA! : process.env.PROD_SCHEMA!
export const dbSchema = pgSchema(
  process.env.NODE_ENV === "production"
    ? process.env.PROD_SCHEMA!
    : process.env.DEV_SCHEMA!
);

export const UserRole = dbSchema.enum("user_role", ["ADMIN", "USER"]);

export const UserTable = dbSchema.table("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  // emailVerified: date('emailVerified'),
  password: varchar("password", { length: 255 }).notNull(),
  role: UserRole("role").default("USER"),
});

// one-to-one with user table
export const UserProfileTable = dbSchema.table("user_profiles", {
  id: serial("id").primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  account_num: varchar("account_num", { length: 255 }),
  phone_num: varchar("phone_num", { length: 255 }),
});

// one-to-many with user table
export const ShippingInfoTable = dbSchema.table("shipping_info", {
  id: serial("id").primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  zip: varchar("zip", { length: 255 }).notNull(),
  is_job_site: boolean("is_job_site").notNull().default(false),
  note: varchar("note", { length: 255 }),
});

// users can add and delete billing info at any time
// relevant billing info will be serialized and stored in the order table
// one-to-many with user table
// NOTE TODO: change field names and change definitions in generating functions to match 
export const BillingInfoTable = dbSchema.table("billing_info", {
  id: serial("id").primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  zip: varchar("zip", { length: 255 }).notNull(),
  paymentMethod: varchar("paymentMethod", { length: 255 }).notNull(),
  purchaseOrder: varchar("purchaseOrder", { length: 255 }),
  primaryContactName: varchar("primaryContactName", { length: 255 }),
  primaryContactEmail: varchar("primaryContactEmail", { length: 255 }),
  primaryContactPhone: varchar("primaryContactPhone", { length: 255 }),
  faxNum: varchar("faxNum", { length: 255 }),
  isPrimary: boolean("isPrimary").notNull().default(false),
  isActive: boolean("isActive").notNull().default(true),
});

// one-to-many with user table
export const OrderTable = dbSchema.table("orders", {
  id: uuid("id").primaryKey(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  orderName: varchar("orderName", { length: 255 }).notNull(),
  billingInfo: jsonb("billingInfo").notNull(),
  shippingInfo: jsonb("shippingInfo").notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  dateCreated: timestamp("dateCreated").notNull(),
  dateUpdated: timestamp("dateUpdated").notNull(),
  dateSubmitted: timestamp("dateSubmitted"),
});
// one-to-many with order table
export const OrderItemTable = dbSchema.table("order_items", {
  id: serial("id").primaryKey(),
  orderId: uuid("orderId")
    .notNull()
    .references(() => OrderTable.id, { onDelete: "cascade" }),
  product_type_id: uuid("product_type_id")
    .notNull()
    .references(() => ProductTable.id, { onDelete: "cascade" }),
  product_config: jsonb("product_config").notNull(),
  quantity: integer("quantity").notNull(),
  note: varchar("note", { length: 255 }),
});

export const ProductTable = dbSchema.table("products", {
  id: uuid("id").primaryKey(),
  // name: "Tempered Glass", "Laminated Glass", "Insulated Glass", "Mirror", "Shower Door"
  type: varchar("type", { length: 255 }).notNull(),
  image_url: varchar("image_url", { length: 255 }),
  alt: varchar("alt", { length: 255 }),
  description: varchar("description", { length: 255 }),
  config_options: jsonb("config_options"),
  date_created: timestamp("date_created").notNull(),
  date_updated: timestamp("date_updated").notNull(),
});

export const GlassInventoryTable = dbSchema.table("glass_inventory_item", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  // list of product for which this glass can be used
  description: varchar("description", { length: 255 }),
  thickness: jsonb("thickness").notNull(), // List of thicknesses
  shapes: jsonb("shapes").notNull(), // list of shape IDs
  tint: jsonb("tint").notNull(), // list of available tints
  // list of products this glass can be used for
  compatible_products: jsonb("compatible_products").notNull(),
  quantity_available: integer("quantity_available").notNull(),
  // quantity_on_premise: integer("quantity"),
  // quantity_on_order: integer("quantity"),
  // supplier_id: uuid("supplier_id").notNull(), // not necessary as a standalone field since it'll be part of supply orders
  quantity_incoming: jsonb("quantity_incoming"),
  date_created: timestamp("date_created").notNull(),
  date_updated: timestamp("date_updated").notNull(),
  updated_by: uuid("updated_by")
    .notNull()
    .references(() => UserTable.id),
});

// tags need a user_id, since each user creates tags that are only
// useful to them
// an id for the item that was tagged
// and a category so we know what table to search for the item
// export const Tags = dbSchema.table("tags", {
//   id: serial("id").primaryKey(),
//   name: varchar("name", { length: 255 }).notNull(),
//   description: varchar("description", { length: 255 }),
//   category: varchar("category", { length: 255 }),
//   user_id: uuid("user_id").notNull().references(() => UserTable.id, { onDelete: "cascade" }),
//   tagged_item_id: integer("tagged_item_id").notNull(),
// })
