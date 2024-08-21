CREATE SCHEMA "nhic-dev";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "nhic-dev"."user_role" AS ENUM('admin', 'user');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nhic-dev"."category" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nhic-dev"."postCategory" (
	"postId" serial NOT NULL,
	"categoryId" serial NOT NULL,
	CONSTRAINT "postCategory_postId_categoryId_pk" PRIMARY KEY("postId","categoryId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nhic-dev"."posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"averageRating" real DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nhic-dev"."userPreferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" uuid NOT NULL,
	"theme" varchar(255) NOT NULL,
	"emailUpdates" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nhic-dev"."user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"userRole" "nhic-dev"."user_role" DEFAULT 'user' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nhic-dev"."postCategory" ADD CONSTRAINT "postCategory_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "nhic-dev"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nhic-dev"."postCategory" ADD CONSTRAINT "postCategory_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "nhic-dev"."category"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nhic-dev"."posts" ADD CONSTRAINT "posts_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "nhic-dev"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nhic-dev"."userPreferences" ADD CONSTRAINT "userPreferences_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "nhic-dev"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailIndex" ON "nhic-dev"."user" USING btree ("email");