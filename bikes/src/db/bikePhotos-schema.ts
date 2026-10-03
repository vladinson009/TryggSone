import { integer, pgTable, text, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { bikesTable } from './bikes-schema.js';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const bikePhotosTable = pgTable(
  'bike_photos',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    bikeId: uuid('bike_id')
      .notNull()
      .references(() => bikesTable.id, {
        onDelete: 'cascade',
      }),

    url: text('url').notNull(),

    sortOrder: integer('sort_order').default(0).notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [unique('bike_photos_bike_id_sort_order_unique').on(table.bikeId, table.sortOrder)],
);
export const BikePhotoInsertSchema = createInsertSchema(bikePhotosTable).omit({
  id: true,
  sortOrder: true,
  createdAt: true,
});
export const BikePhotoQuerySchema = createSelectSchema(bikePhotosTable).omit({
  bikeId: true,
});
