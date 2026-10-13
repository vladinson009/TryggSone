import { db } from '../../db/index.js';
import { bikeEventBus } from '../../rabbitmq/connection.js';
import { bikePublisher } from '../../rabbitmq/publisher.js';
import { bikeKey } from '@tryggsone/common/keys';
import { BikeAddressInsertSchema, bikeAddressTable } from '../../db/bike-address-schema.js';
import { ForbiddenError, NotFoundError } from '@tryggsone/common/errors';
import type z from 'zod';

export const addBikeAddress = async (
  body: z.infer<typeof BikeAddressInsertSchema>,
  ownerId: string,
) => {
  const bikeAddress = await db.transaction(async (tx) => {
    const bike = await tx.query.bikesTable.findFirst({
      where: {
        id: body.bikeId,
      },
    });

    if (!bike) {
      throw new NotFoundError('Bike with that ID is not found');
    }
    if (bike.ownerId !== ownerId) {
      throw new ForbiddenError('You do not own this bike');
    }
    const [inserted] = await tx
      .insert(bikeAddressTable)
      .values({
        bikeId: body.bikeId,
        city: body.city,
        postCode: body.postCode,
        street: body.street,
      })
      .returning();
    return inserted;
  });

  const channel = await bikeEventBus.getChannel();
  await bikePublisher.publish(channel, bikeKey('updated'), bikeAddress);

  return bikeAddress;
};
