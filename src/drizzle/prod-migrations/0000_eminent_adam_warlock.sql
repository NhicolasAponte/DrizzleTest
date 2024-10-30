CREATE SCHEMA IF NOT EXISTS "prod-schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-schema"."inventory_glass_item" (
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
CREATE TABLE IF NOT EXISTS "prod-schema"."inventory_products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" varchar(255) NOT NULL,
	"image_url" varchar(255),
	"alt" varchar(255),
	"description" varchar(255),
	"config_options" jsonb,
	"date_created" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-schema"."order_invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"order_id" uuid NOT NULL,
	"date_created" timestamp with time zone NOT NULL,
	"status" varchar(255) NOT NULL,
	"amount" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-schema"."order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" uuid NOT NULL,
	"product_type_id" uuid NOT NULL,
	"product_config" jsonb NOT NULL,
	"quantity" integer NOT NULL,
	"note" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-schema"."orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"order_name" varchar(255) NOT NULL,
	"shipping_data" jsonb NOT NULL,
	"billing_data" jsonb NOT NULL,
	"status" varchar(255) NOT NULL,
	"date_created" timestamp with time zone NOT NULL,
	"date_updated" timestamp with time zone NOT NULL,
	"date_submitted" timestamp with time zone,
	"date_shipped" timestamp with time zone,
	"date_delivered" timestamp with time zone,
	CONSTRAINT "ORDER_STATUS_CHECK" CHECK ("orders"."status" = 'DRAFT' OR "orders"."status" = 'PENDING' OR "orders"."status" = 'QUOTE' OR "orders"."status" = 'PROCESSING' OR "orders"."status" = 'SHIPPED' OR "orders"."status" = 'DELIVERED' OR "orders"."status" = 'CANCELLED')
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-schema"."user_billing_information" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"street" varchar(255) NOT NULL,
	"apt_num" varchar(255),
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" varchar(255) NOT NULL,
	"payment_method" varchar(255) NOT NULL,
	"purchase_order" varchar(255),
	"primary_contact_name" varchar(255),
	"primary_contact_email" varchar(255),
	"primary_contact_phone" varchar(255),
	"fax_num" varchar(255),
	"is_primary" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-schema"."user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"company" varchar(255),
	"account_num" varchar(255),
	"phone_num" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-schema"."user_shipping_information" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"street" varchar(255) NOT NULL,
	"apt_num" varchar(255),
	"city" varchar(255) NOT NULL,
	"state" varchar(255) NOT NULL,
	"zip" varchar(255) NOT NULL,
	"is_job_site" boolean DEFAULT false NOT NULL,
	"note" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prod-schema"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"role" varchar(255) DEFAULT 'USER',
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "USER_ROLE_CHECK" CHECK ("users"."role" = 'ADMIN' OR "users"."role" = 'USER')
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-schema"."inventory_glass_item" ADD CONSTRAINT "inventory_glass_item_updated_by_users_id_fk" FOREIGN KEY ("updated_by") REFERENCES "prod-schema"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-schema"."order_invoices" ADD CONSTRAINT "order_invoices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "prod-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-schema"."order_invoices" ADD CONSTRAINT "order_invoices_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "prod-schema"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-schema"."order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "prod-schema"."orders"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-schema"."order_items" ADD CONSTRAINT "order_items_product_type_id_inventory_products_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "prod-schema"."inventory_products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-schema"."orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "prod-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-schema"."user_billing_information" ADD CONSTRAINT "user_billing_information_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "prod-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-schema"."user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "prod-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prod-schema"."user_shipping_information" ADD CONSTRAINT "user_shipping_information_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "prod-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
