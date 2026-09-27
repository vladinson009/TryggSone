CREATE TYPE "bike_status" AS ENUM('active', 'for_sale', 'stolen', 'deleted');--> statement-breakpoint
CREATE TABLE "bikes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"owner_id" text NOT NULL,
	"frame_number" text NOT NULL UNIQUE,
	"status" "bike_status" DEFAULT 'active'::"bike_status" NOT NULL,
	"brand" text NOT NULL,
	"model" text NOT NULL,
	"year" integer NOT NULL,
	"color" text NOT NULL,
	"type" text NOT NULL,
	"frame_size" text,
	"wheel_size" text,
	"weight" integer,
	"is_electric" boolean DEFAULT false NOT NULL,
	"motor_brand" text,
	"motor_power" integer,
	"battery_capacity" integer,
	"condition" text NOT NULL,
	"price" integer NOT NULL,
	"currency" text DEFAULT 'NOK' NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_approved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bike_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"bike_id" uuid NOT NULL,
	"url" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bike_photos" ADD CONSTRAINT "bike_photos_bike_id_bikes_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE CASCADE;