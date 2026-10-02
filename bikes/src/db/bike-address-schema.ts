// db/bike-address-schema.ts
import { uuid, varchar, unique, pgTable } from 'drizzle-orm/pg-core';
import { bikesTable } from './bikes-schema.js';
import { createInsertSchema } from 'drizzle-orm/zod';

export const bikeAddressTable = pgTable(
  'bike_address',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    bikeId: uuid('bike_id')
      .notNull()
      .references(() => bikesTable.id, { onDelete: 'cascade' }),
    postCode: varchar('post_code', { length: 10 }).notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    street: varchar('street', { length: 200 }).notNull(),
  },
  (table) => [unique('bike_address_bike_id_unique').on(table.bikeId)],
);
export const BikeAddressInsertSchema = createInsertSchema(bikeAddressTable).omit({
  id: true,
});
