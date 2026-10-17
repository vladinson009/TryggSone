import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { bikesTable } from './bikes-schema.js';

export const bikeStatusEventsTable = pgTable('bike_status_events', {
  id: uuid('id').defaultRandom().primaryKey(),
  bikeId: uuid('bike_id')
    .notNull()
    .references(() => bikesTable.id, {
      onDelete: 'cascade',
    }),
  actorId: varchar('actor_id', { length: 50 }).notNull(),

  eventType: varchar('event_type', { length: 50 }).notNull(),
  previousStatus: varchar('previous_status', { length: 30 }).notNull(),
  newStatus: varchar('new_status', { length: 30 }).notNull(),

  details: text('details'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
