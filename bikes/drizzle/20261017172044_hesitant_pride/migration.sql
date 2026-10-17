CREATE TABLE "bike_status_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"bike_id" uuid NOT NULL,
	"actor_id" uuid NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"previous_status" varchar(30) NOT NULL,
	"new_status" varchar(30) NOT NULL,
	"details" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bike_status_events" ADD CONSTRAINT "bike_status_events_bike_id_bikes_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE CASCADE;