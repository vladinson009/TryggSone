CREATE TABLE "bike_condition_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"bike_id" uuid NOT NULL,
	"actor_id" varchar(50) NOT NULL,
	"event_type" varchar(50) NOT NULL,
	"previous_condition" varchar(30) NOT NULL,
	"new_condition" varchar(30) NOT NULL,
	"details" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bike_condition_events" ADD CONSTRAINT "bike_condition_events_bike_id_bikes_id_fkey" FOREIGN KEY ("bike_id") REFERENCES "bikes"("id") ON DELETE CASCADE;