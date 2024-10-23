ALTER TABLE "dev-schema"."glass_inventory_item" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "dev-schema"."invoices" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "dev-schema"."orders" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "dev-schema"."products" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();