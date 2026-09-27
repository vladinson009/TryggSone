import { Hono } from 'hono';
import { bikesTable } from '../db/bikes-schema.js';
import { db } from '../db/index.js';
import { and, eq } from 'drizzle-orm';
import { bikePublisher } from '../lib/rabbitmq/publisher.js';
import { bikeEventBus } from '../lib/rabbitmq/connection.js';
import { bikeKey } from '@tryggsone/common';

const app = new Hono();

app.delete('/:bikeId', async (c) => {
  const bikeId = c.req.param('bikeId');
  const ownerId = c.req.header('x-user-id');
  console.log('Bikes headers:', c.req.header());
  console.log('Bikes x-user-id:', c.req.header('x-user-id'));

  if (!ownerId) {
    return c.json({ message: 'Missing user identity' }, 401);
  }

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
