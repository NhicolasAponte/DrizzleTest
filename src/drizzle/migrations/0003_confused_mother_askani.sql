ALTER TABLE "dev-schema"."invoices" ADD COLUMN "date_created_tz" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" ADD COLUMN "date_shipped" timestamp with time zone;