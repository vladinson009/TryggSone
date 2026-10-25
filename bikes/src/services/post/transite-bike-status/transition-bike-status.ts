// services/bike-status-service.ts
import type { Bike } from '@tryggsone/common/types';

import { and, eq, sql } from 'drizzle-orm';
import { bikeKey } from '@tryggsone/common/keys';
import { NotFoundError, ForbiddenError, BadRequestError } from '@tryggsone/common/errors';

import { db } from '../../../db/index.js';
import { bikeStatusEventsTable, bikesTable } from '../../../db/schema.js';
import { bikeEventBus } from '../../../events/connection.js';
import { bikePublisher } from '../../../events/publisher.js';

type TransitionOptions = {
  bikeId: string;
  actorId: string;
  allowedStatuses: Bike['status'][];
  newStatus: Bike['status'];
  eventType: string;
  details?: string;
};

export async function transitionBikeStatus(options: TransitionOptions) {
  const bikeTransaction = await db.transaction(async (tx) => {
    // Lock the row to prevent concurrent status changes.
    const [bike] = await tx
      .select()
      .from(bikesTable)
      .where(eq(bikesTable.id, options.bikeId))
      .for('update');

    if (!bike) {
      throw new NotFoundError('BIKE_NOT_FOUND');
    }

    // The authenticated user must own the bike.
    if (bike.ownerId !== options.actorId) {
      throw new ForbiddenError('FORBIDDEN');
    }

    const currentStatus = bike.status;

    if (!options.allowedStatuses.includes(currentStatus)) {
      throw new BadRequestError('INVALID_STATUS_TRANSITION');
    }

    const [updatedBike] = await tx
      .update(bikesTable)
      .set({
        status: options.newStatus,
        updatedAt: new Date(),
        version: sql`${bikesTable.version} + 1`,
      })
      .where(and(eq(bikesTable.id, options.bikeId), eq(bikesTable.ownerId, options.actorId)))
      .returning();

    if (!updatedBike) {
      throw new BadRequestError('No bike to update');
    }

    await tx.insert(bikeStatusEventsTable).values({
      bikeId: options.bikeId,
      actorId: options.actorId,
      eventType: options.eventType,
      previousStatus: currentStatus,
      newStatus: options.newStatus,
      details: options.details ?? null,
    });

    return updatedBike;
  });

  const channel = await bikeEventBus.getChannel();
  await bikePublisher.publish(channel, bikeKey('updated'), bikeTransaction);

  const { version, ...bikeResponse } = bikeTransaction;

  return bikeResponse;
}
