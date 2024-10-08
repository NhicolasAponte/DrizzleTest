ALTER TABLE "dev-schema"."glass_inventory_item" ALTER COLUMN "date_created" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "dev-schema"."glass_inventory_item" ALTER COLUMN "date_updated" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "dev-schema"."invoices" ALTER COLUMN "date_created" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" ALTER COLUMN "date_created" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" ALTER COLUMN "date_updated" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" ALTER COLUMN "date_submitted" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "dev-schema"."products" ALTER COLUMN "date_created" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "dev-schema"."products" ALTER COLUMN "date_updated" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "dev-schema"."invoices" DROP COLUMN IF EXISTS "date_created_tz";