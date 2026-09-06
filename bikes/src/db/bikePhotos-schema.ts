import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { bikes } from './bikes-schema.js';

export const bikePhotos = pgTable('bike_photos', {
  id: uuid('id').defaultRandom().primaryKey(),

  bikeId: uuid('bike_id')
    .notNull()
    .references(() => bikes.id, {
      onDelete: 'cascade',
    }),

  url: text('url').notNull(),

  sortOrder: integer('sort_order').default(0).notNull(),

  createdAt: timestamp('created_at').defaultNow().notNull(),
});
