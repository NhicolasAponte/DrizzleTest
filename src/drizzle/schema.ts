import {
  boolean,
  integer,
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

export const drizzleSchema = pgSchema("nhic-dev");

export const UserRole = drizzleSchema.enum("user_role", ["admin", "user"]);

export const UserTable = drizzleSchema.table(
  "user",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    role: UserRole("userRole").default("user").notNull(), //can use .$default for dynamic default values
  },
  (table) => {
    return {
      emailIndex: uniqueIndex("emailIndex").on(table.email),
    };
  }
);

console.log(typeof UserTable.id);

// NOTE: relations
// one-to-one
export const UserPreferencesTable = drizzleSchema.table("userPreferences", {
  id: serial("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id),
  theme: varchar("theme", { length: 255 }).notNull(),
  emailUpdates: boolean("emailUpdates").notNull().default(false),
});

// one-to-many
export const PostsTable = drizzleSchema.table("posts", {
  id: serial("id").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => UserTable.id),
  title: varchar("title", { length: 255 }).notNull(),
  content: varchar("content", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  averageRating: real("averageRating").notNull().default(0),
});

// many-to-many
export const CategoryTable = drizzleSchema.table("category", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

// to link the many-to-many relation, we need a junction table
export const PostCategoryTable = drizzleSchema.table(
  "postCategory",
  {
    postId: serial("postId")
      .notNull()
      .references(() => PostsTable.id),
    // NOTE TODO: check what happens if you put a uuid here
    categoryId: serial("categoryId")
      .notNull()
      .references(() => CategoryTable.id),
  },
  (table) => {
    return {
      // composite primary key: https://www.postgresql.org/docs/9.1/ddl-constraints.html
      pk: primaryKey({ columns: [table.postId, table.categoryId] }),
    };
  }
);
