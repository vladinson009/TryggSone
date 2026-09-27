CREATE TABLE "vehicle_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"vehicle_id" uuid NOT NULL,
	"owner_id" text,
	"event_type" text NOT NULL,
	"event_id" uuid NOT NULL UNIQUE,
	"data" jsonb NOT NULL,
	"correlation_id" text,
	"occurred_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "vehicle_events_vehicle_id_idx" ON "vehicle_events" ("vehicle_id");--> statement-breakpoint
CREATE INDEX "vehicle_events_owner_id_idx" ON "vehicle_events" ("owner_id");--> statement-breakpoint
CREATE INDEX "vehicle_events_event_type_idx" ON "vehicle_events" ("event_type");--> statement-breakpoint
CREATE INDEX "vehicle_events_occurred_at_idx" ON "vehicle_events" ("occurred_at");