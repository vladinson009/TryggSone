import type z from 'zod';
import { bikeKey } from '@tryggsone/common/keys';

import { db } from '../../db/index.js';
import { BikeInsertSchema, bikesTable } from '../../db/bikes-schema.js';
import { bikePhotosTable } from '../../db/bikePhotos-schema.js';

import { bikeEventBus } from '../../rabbitmq/connection.js';
import { bikePublisher } from '../../rabbitmq/publisher.js';

export const insertNewBike = async (body: z.infer<typeof BikeInsertSchema>, ownerId: string) => {
  const bike = await db.transaction(async (tx) => {
    const [bike] = await tx
      .insert(bikesTable)
      .values({ ...body, ownerId })
      .returning();

    await tx
      .insert(bikePhotosTable)
      .values({
        bikeId: bike.id,
        url: 'https://plus.unsplash.com/premium_photo-1678718713393-2b88cde9605b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        sortOrder: 0,
      })
      .returning();

    return bike;
  });

  const channel = await bikeEventBus.getChannel();
  await bikePublisher.publish(channel, bikeKey('created'), bike);

  return bike;
};
