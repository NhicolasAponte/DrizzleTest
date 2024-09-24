ALTER TABLE "dev-schema"."order_items" RENAME COLUMN "product_id" TO "product_type_id";--> statement-breakpoint
ALTER TABLE "dev-schema"."order_items" DROP CONSTRAINT "order_items_product_id_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dev-schema"."order_items" ADD CONSTRAINT "order_items_product_type_id_products_id_fk" FOREIGN KEY ("product_type_id") REFERENCES "dev-schema"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
