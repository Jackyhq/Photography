CREATE TABLE "reactions" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"ref_key" text NOT NULL,
	"reaction" varchar(20) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "views" (
	"id" text PRIMARY KEY NOT NULL,
	"views" integer DEFAULT 0 NOT NULL,
	"ref_key" text NOT NULL,
	CONSTRAINT "views_ref_key_unique" UNIQUE("ref_key")
);
--> statement-breakpoint
CREATE INDEX "reaction_ref_key_idx" ON "reactions" USING btree ("ref_key");--> statement-breakpoint
CREATE INDEX "view_ref_key_idx" ON "views" USING btree ("ref_key");