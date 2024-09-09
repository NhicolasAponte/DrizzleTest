

import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  jsonb,
  pgEnum,
  pgSchema,
  pgTable,
  pgTableCreator,
  primaryKey,
  real,
  serial,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

//export const dbSchema = pgSchema(process.env.DEV_SCHEMA!);

// NOTE: this creates a prefix for all table names, then the table filter 
// param in drizzle.config.ts will only include tables with this prefix 
export const createTable = pgTableCreator((name) => `new-schema-test_${name}`);

export const UserRole = pgEnum("user_role", ["ADMIN", "USER"]);

export const UserTable = createTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  // emailVerified: date('emailVerified'),
  password: varchar("password", { length: 255 }).notNull(),
  role: UserRole("role").default("USER"),
});

// one-to-one with user table
export const UserProfileTable = createTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  company: varchar("company", { length: 255 }),
  accountNum: varchar("accountNum", { length: 255 }),
  phoneNum: varchar("phoneNum", { length: 255 }),
});

// one-to-many with user table
export const ShippingInfoTable = createTable("shipping_info", {
  id: serial("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  address: varchar("address", { length: 255 }).notNull(),
  city: varchar("city", { length: 255 }).notNull(),
  state: varchar("state", { length: 255 }).notNull(),
  zip: varchar("zip", { length: 255 }).notNull(),
  isJobSite: boolean("isJobSite").notNull().default(false),
  note: varchar("note", { length: 255 }),
});
// users can add and delete billing info at any time
// relevant billing info will be serialized and stored in the order table
// one-to-many with user table
export const BillingInfoTable = createTable("billing_info", {
  id: serial("id").primaryKey(),
  userId: uuid("userId")
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
export const OrderTable = createTable("orders", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId")
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
export const OrderItemTable = createTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: uuid("orderId")
    .notNull()
    .references(() => OrderTable.id, { onDelete: "cascade" }),
  product: jsonb("product").notNull(),
  note: varchar("note", { length: 255 }),
  quantity: integer("quantity").notNull(),
});

// export const ProductTable = createTable(
//   "products",
//   {
//     id: serial("id").primaryKey(),
//     name: varchar("name", { length: 255 }).notNull(),
//     description: varchar("description", { length: 255 }),
//     price: real("price").notNull(),
//     quantity: integer("quantity").notNull(),
//   }
// )
