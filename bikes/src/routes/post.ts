import { Hono } from 'hono';
import { BikeInsertSchema } from '../db/bikes-schema.js';
import { zValidator } from '@hono/zod-validator';
import { insertNewBike } from '../services/insert-new-bike.js';
import { requireOwnerId } from '../middlewares/requireOwnerId.js';

const app = new Hono();

app.post('/', zValidator('json', BikeInsertSchema), requireOwnerId, async (c) => {
  const body = c.req.valid('json');
  const ownerId = c.get('ownerId');

  const newBike = await insertNewBike(body, ownerId);
  return c.json(newBike);
});

export { app as postApp };
