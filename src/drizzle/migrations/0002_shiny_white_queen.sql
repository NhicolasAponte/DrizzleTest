ALTER TABLE "dev-schema"."invoices" ADD COLUMN "amount" numeric(10, 2) NOT NULL;--> statement-breakpoint
ALTER TABLE "dev-schema"."invoices" DROP COLUMN IF EXISTS "total";