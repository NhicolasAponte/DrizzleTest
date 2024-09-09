import { relations } from "drizzle-orm";
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
    // NOTE: $type<> can override the default type
    // .$type<22 | 26>()
    // could use it to define a json type 
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    role: UserRole("userRole").default("user").notNull(), 
    // "userRole" is the column name in the database
    // role is the property name in the object
    //  NOTE: can use .$default for dynamic default values 
    // can pass a function that returns a value
    // $default(() => Math.random() > 0.5 ? "admin" : "user"),
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
    .references(() => UserTable.id, { onDelete: "cascade" }), // behavior on Delete, on Update
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

// many-to-many - need linking table 
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

// can add relationship mapping so that drizzle knows about the relations
// the above table relationships are defined at the database level 
// export const TempUserTableRelations = relations( UserTable, ({ one, many }) => ({
//   preferences: one(UserPreferencesTable, {
//     fields: [UserTable.id],
//     references: [UserPreferencesTable.userId],
//   }),
//   posts: many(PostsTable, {
//     fields: [UserTable.id],
//     references: [PostsTable.userId],
//   }),
// }));
// these relations help with type inference and query building with the .query() method 
export const UserTableRelations = relations(UserTable, ({ one, many}) => ({
  preferences: one(UserPreferencesTable),
  posts: many(PostsTable),
}))

export const UserPreferencesTableRelations = relations(UserPreferencesTable, ({ one }) => ({
  user: one(UserTable, {// for one-to-one mappings, table with FK must be specified 
    // NOTE: the table containing the foreign key and the corresponding field 
    fields: [UserPreferencesTable.userId],// foreign key
    references: [UserTable.id],// the field FK references
  }),
}));

export const PostTableRelations = relations(PostsTable, ({ one, many}) => ({
  user: one(UserTable, {
    fields: [PostsTable.userId],
    references: [UserTable.id],
  }),
  postCategories: many(PostCategoryTable)
}))

export const CategoryTableRelations = relations(CategoryTable, ({ many}) => ({
  postCategories: many(PostCategoryTable)
}))

export const PostCategoryRelations = relations(PostCategoryTable, ({ one}) => ({
  post: one(PostsTable, {
    fields: [PostCategoryTable.postId],
    references: [PostsTable.id],
  }),
  category: one(CategoryTable, {
    fields: [PostCategoryTable.categoryId],
    references: [CategoryTable.id],
  })

}))