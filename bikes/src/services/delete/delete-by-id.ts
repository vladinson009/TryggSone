import { and, eq } from 'drizzle-orm';
import { bikesTable } from '../../db/bikes-schema.js';
import { db } from '../../db/index.js';
import { bikeEventBus } from '../../rabbitmq/connection.js';
import { bikePublisher } from '../../rabbitmq/publisher.js';
import { bikeKey } from '@tryggsone/common/keys';
import { ServiceError } from '@tryggsone/common/errors';

export const deleteBikeById = async (
  bikeId: string,
  ownerId: string,
): Promise<{ success: true }> => {
  const [bike] = await db
    .delete(bikesTable)
    .where(and(eq(bikesTable.id, bikeId), eq(bikesTable.ownerId, ownerId)))
    .returning();

  if (!bike) {
    throw new ServiceError('NOT_FOUND', 404, 'Cannot find bike to delete');
  }

  const channel = await bikeEventBus.getChannel();
  await bikePublisher.publish(channel, bikeKey('deleted'), bike);

  return {
    success: true,
  };
};
