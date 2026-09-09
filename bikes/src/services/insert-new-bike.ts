import type z from 'zod';
import { BikeInsertSchema, bikesTable } from '../db/bikes-schema.js';
import { db } from '../db/index.js';

export const insertNewBike = async (userInput: z.infer<typeof BikeInsertSchema>) => {
  const [bike] = await db.insert(bikesTable).values(userInput).returning();
  return bike;
};
