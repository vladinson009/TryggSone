import { pgTable, text, timestamp, uuid, jsonb, index } from 'drizzle-orm/pg-core';

export const vehicleEventsTable = pgTable(
  'vehicle_events',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    // The vehicle that generated/relates to this event
    vehicleId: uuid('vehicle_id').notNull(),

    // Owner at the time of the event
    ownerId: text('owner_id'),

    // e.g. "bike.created", "bike.updated", "bike.stolen"
    eventType: text('event_type').notNull(),

    // RabbitMQ event ID
    eventId: uuid('event_id').notNull().unique(),

    // The actual event payload
    data: jsonb('data').notNull(),

    // Useful for tracing distributed events
    correlationId: text('correlation_id'),

    // When the event actually happened
    occurredAt: timestamp('occurred_at').notNull(),

    // When your logger received/stored it
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    index('vehicle_events_vehicle_id_idx').on(table.vehicleId),
    index('vehicle_events_owner_id_idx').on(table.ownerId),
    index('vehicle_events_event_type_idx').on(table.eventType),
    index('vehicle_events_occurred_at_idx').on(table.occurredAt),
  ],
);
