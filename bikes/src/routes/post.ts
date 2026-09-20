import { Hono } from 'hono';
import { BikeInsertSchema } from '../db/bikes-schema.js';
import { zValidator } from '@hono/zod-validator';
import { insertNewBike } from '../services/insert-new-bike.js';
import { bikeEventBus } from '../lib/rabbitmq/connection.js';
import { bikePublisher } from '../lib/rabbitmq/publisher.js';
import { bikeKey } from '@tryggsone/common';

const app = new Hono();

app.post('/', zValidator('json', BikeInsertSchema), async (c) => {
  const { id, ...userInput } = c.req.valid('json');
  const newBike = await insertNewBike(userInput);

  const channel = await bikeEventBus.getChannel();
  await bikePublisher.publish(channel, bikeKey('created'), newBike);
  return c.json(newBike);
});

export { app as postApp };
