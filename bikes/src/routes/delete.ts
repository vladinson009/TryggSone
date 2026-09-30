import { Hono } from 'hono';
import { bikesTable } from '../db/bikes-schema.js';
import { db } from '../db/index.js';
import { and, eq } from 'drizzle-orm';
import { bikePublisher } from '../lib/rabbitmq/publisher.js';
import { bikeEventBus } from '../lib/rabbitmq/connection.js';
import { bikeKey } from '@tryggsone/common/keys';
import { requireOwnerId } from '../middlewares/requireOwnerId.js';

const app = new Hono();

app.delete('/:bikeId', requireOwnerId, async (c) => {
  const bikeId = c.req.param('bikeId');
  const ownerId = c.get('ownerId');

  const [bike] = await db
    .delete(bikesTable)
    .where(and(eq(bikesTable.id, bikeId), eq(bikesTable.ownerId, ownerId)))
    .returning();

  const channel = await bikeEventBus.getChannel();
  await bikePublisher.publish(channel, bikeKey('deleted'), {
    ownerId,
    id: bike.id,
  });
  return c.json({ succes: true });
});

export { app as deleteApp };
