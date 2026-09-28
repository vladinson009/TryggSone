import type z from 'zod';
import { db } from '../db/index.js';
import { BikeInsertSchema, bikesTable } from '../db/bikes-schema.js';
import { bikeEventBus } from '../lib/rabbitmq/connection.js';
import { bikePublisher } from '../lib/rabbitmq/publisher.js';
import { bikeKey } from '@tryggsone/common';

export const insertNewBike = async (
  body: z.infer<typeof BikeInsertSchema>,
  ownerId: string,
) => {
  const [bike] = await db
    .insert(bikesTable)
    .values({ ...body, ownerId })
    .returning();

  const channel = await bikeEventBus.getChannel();
  await bikePublisher.publish(channel, bikeKey('created'), bike);

  return bike;
};
