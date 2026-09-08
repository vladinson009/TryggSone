import type z from 'zod';
import { BikeInsertSchema, bikesTable } from '../db/bikes-schema.js';
import { db } from '../db/index.js';

export const insertNewBike = async (body: z.infer<typeof BikeInsertSchema>) => {
  const [bike] = await db.insert(bikesTable).values(body).returning();
  return bike;
};
