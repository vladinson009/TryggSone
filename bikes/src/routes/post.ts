import { Hono } from 'hono';
import { BikeInsertSchema } from '../db/bikes-schema.js';
import { zValidator } from '@hono/zod-validator';
import { insertNewBike } from '../services/insert-new-bike.js';

const app = new Hono();

app.post('/', zValidator('json', BikeInsertSchema), async (c) => {
  const { id, ...userInput } = c.req.valid('json');
  const newBike = await insertNewBike(userInput);
  return c.json(newBike);
});

export { app as postApp };
