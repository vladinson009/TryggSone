import { Hono } from 'hono';
import { bikesClient } from '../clients/bikes-client.js';
import { zValidator } from '@hono/zod-validator';
import { BikeInsertSchema } from '../schemas/bike.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const app = new Hono();

app.get('/', async (c) => {
  const bikes = await bikesClient.getAllBikes();
  return c.json(bikes);
});

app.post('/', zValidator('json', BikeInsertSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');

  const { id: ownerId } = c.get('user');
  const createdBike = await bikesClient.insertNewBike(body, ownerId);
  return c.json(createdBike);
});

export { app as appBikes };
