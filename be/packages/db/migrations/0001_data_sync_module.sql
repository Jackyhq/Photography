CREATE TYPE "public"."photo_sync_status" AS ENUM('pending', 'synced', 'conflict');
--> statement-breakpoint
CREATE TABLE "photo_asset" (
	"id" text PRIMARY KEY NOT NULL,
	"tenant_id" text NOT NULL,
	"photo_id" text NOT NULL,
	"storage_key" text NOT NULL,
	"storage_provider" text NOT NULL,
	"size" bigint,
	"etag" text,
	"last_modified" timestamp,
	"metadata_hash" text,
	"manifest_version" text DEFAULT 'v7' NOT NULL,
	"manifest" jsonb NOT NULL,
	"sync_status" "photo_sync_status" DEFAULT 'pending' NOT NULL,
	"conflict_reason" text,
	"conflict_payload" jsonb,
	"synced_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "uq_photo_asset_tenant_storage_key" UNIQUE("tenant_id","storage_key"),
	CONSTRAINT "uq_photo_asset_tenant_photo_id" UNIQUE("tenant_id","photo_id")
);
--> statement-breakpoint
ALTER TABLE "photo_asset" ADD CONSTRAINT "photo_asset_tenant_id_tenant_id_fk" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenant"("id") ON DELETE cascade ON UPDATE no action;
