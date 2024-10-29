CREATE TABLE IF NOT EXISTS "dev-schema"."inventory_glass_item" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"thickness" jsonb NOT NULL,
	"shapes" jsonb NOT NULL,
	"tint" jsonb NOT NULL,
	"compatible_products" text[] DEFAULT ARRAY[]::text[] NOT NULL,
	"quantity_available" integer NOT NULL,
	"quantity_incoming" jsonb,
	"date_created" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL,
	"updated_by" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dev-schema"."order_invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"order_id" uuid NOT NULL,
	"date_created" timestamp with time zone NOT NULL,
	"status" varchar(255) NOT NULL,
	"amount" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
DROP TABLE "dev-schema"."glass_inventory_item";--> statement-breakpoint
DROP TABLE "dev-schema"."invoices";--> statement-breakpoint
ALTER TABLE "dev-schema"."products" RENAME TO "inventory_products";--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" DROP CONSTRAINT "STATUS_CHECK";--> statement-breakpoint
ALTER TABLE "dev-schema"."users" DROP CONSTRAINT "ROLE_CHECK";--> statement-breakpoint
ALTER TABLE "dev-schema"."order_items" DROP CONSTRAINT "order_items_product_type_id_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."inventory_glass_item" ADD CONSTRAINT "inventory_glass_item_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "dev-schema"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_invoices" ADD CONSTRAINT "order_invoices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "dev-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_invoices" ADD CONSTRAINT "order_invoices_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "dev-schema"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_items" ADD CONSTRAINT "order_items_product_type_id_inventory_products_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "dev-schema"."inventory_products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" ADD CONSTRAINT "STATUS_CHECK" CHECK ("orders"."status" = $1 OR "orders"."status" = $2 OR "orders"."status" = $3 OR "orders"."status" = $4 OR "orders"."status" = $5 OR "orders"."status" = $6 OR "orders"."status" = $7);--> statement-breakpoint
ALTER TABLE "dev-schema"."users" ADD CONSTRAINT "USER_ROLE_CHECK" CHECK ("users"."role" = 'ADMIN' OR "users"."role" = 'USER');