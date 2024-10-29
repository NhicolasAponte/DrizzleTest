CREATE TABLE IF NOT EXISTS "dev-schema"."user_billing_information" (
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
CREATE TABLE IF NOT EXISTS "dev-schema"."user_shipping_information" (
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
DROP TABLE "dev-schema"."billing_info";--> statement-breakpoint
DROP TABLE "dev-schema"."shipping_info";--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" ADD COLUMN "billing_data" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" ADD COLUMN "shipping_data" jsonb NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."user_billing_information" ADD CONSTRAINT "user_billing_information_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "dev-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."user_shipping_information" ADD CONSTRAINT "user_shipping_information_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "dev-schema"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" DROP COLUMN IF EXISTS "billing_info";--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" DROP COLUMN IF EXISTS "shipping_info";--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" ADD CONSTRAINT "STATUS_CHECK" CHECK ("orders"."status" = 'DRAFT' OR "orders"."status" = 'PENDING' OR "orders"."status" = 'QUOTE' OR "orders"."status" = 'PROCESSING' OR "orders"."status" = 'SHIPPED' OR "orders"."status" = 'DELIVERED' OR "orders"."status" = 'CANCELLED');