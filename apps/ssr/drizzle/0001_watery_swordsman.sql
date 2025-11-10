ALTER TABLE "reactions" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "reactions" ALTER COLUMN "ref_key" SET DATA TYPE varchar(120);--> statement-breakpoint
ALTER TABLE "views" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "views" ALTER COLUMN "ref_key" SET DATA TYPE varchar(120);