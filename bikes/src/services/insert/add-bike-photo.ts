import type z from 'zod';
import { and, eq, max } from 'drizzle-orm';

import { bikeKey } from '@tryggsone/common/keys';
import { ServiceError } from '@tryggsone/common/errors';

import { bikeEventBus } from '../../rabbitmq/connection.js';
import { bikePublisher } from '../../rabbitmq/publisher.js';

import { BikePhotoInsertSchema, bikePhotosTable } from '../../db/bikePhotos-schema.js';
import { db } from '../../db/index.js';
import { bikesTable } from '../../db/bikes-schema.js';

export const addBikePhoto = async (
  body: z.infer<typeof BikePhotoInsertSchema>,
  ownerId: string,
) => {
  const bikePhoto = await db.transaction(async (tx) => {
    const [bike] = await db
      .select()
      .from(bikesTable)
      .where(and(eq(bikesTable.id, body.bikeId), eq(bikesTable.ownerId, ownerId)))
      .limit(1)
      .leftJoin(bikePhotosTable, eq(bikePhotosTable.id, body.bikeId));

    if (!bike) {
      throw new ServiceError('NOT_FOUND', 404, 'Bike not found');
    }

    const [result] = await tx
      .select({
        maxSortOrder: max(bikePhotosTable.sortOrder),
      })
      .from(bikePhotosTable)
      .where(eq(bikePhotosTable.bikeId, body.bikeId));

    const nextSortOrder = (result.maxSortOrder ?? -1) + 1;

    const [photo] = await tx
      .insert(bikePhotosTable)
      .values({
        bikeId: body.bikeId,
        url: body.url,
        sortOrder: nextSortOrder,
      })
      .returning();

    return photo;
  });

  const channel = await bikeEventBus.getChannel();
  await bikePublisher.publish(channel, bikeKey('updated'), bikePhoto);

  return bikePhoto;
};
