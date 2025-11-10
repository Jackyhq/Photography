CREATE TABLE "system_setting" (
	"id" text PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"value" jsonb DEFAULT 'null'::jsonb,
	"is_sensitive" boolean DEFAULT false NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "uq_system_setting_key" UNIQUE("key")
);
--> statement-breakpoint
ALTER TABLE "photo_asset" ALTER COLUMN "conflict_payload" SET DEFAULT 'null'::jsonb;