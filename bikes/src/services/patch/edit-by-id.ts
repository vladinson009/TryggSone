import type z from 'zod';
import { bikeKey } from '@tryggsone/common/keys';

import { db } from '../../db/index.js';
import { BikeInsertSchema, BikePatchSchema, bikesTable } from '../../db/bikes-schema.js';
import { bikePhotosTable } from '../../db/bikePhotos-schema.js';

import { bikeEventBus } from '../../rabbitmq/connection.js';
import { bikePublisher } from '../../rabbitmq/publisher.js';
import { and, eq, sql } from 'drizzle-orm';

export const editBikeById = async (
  body: z.infer<typeof BikePatchSchema>,
  bikeId: string,
  ownerId: string,
) => {
  const [bike] = await db
    .update(bikesTable)
    .set({
      ...body,
      updatedAt: new Date(),
      version: sql`${bikesTable.version} + 1`,
    })
    .where(and(eq(bikesTable.id, bikeId), eq(bikesTable.ownerId, ownerId)))
    .returning();

  if (!bike) {
    throw new Error('Bike not found or you are not the owner');
  }

  const channel = await bikeEventBus.getChannel();
  await bikePublisher.publish(channel, bikeKey('updated'), bike);

  return bike;
};
