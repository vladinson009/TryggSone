import { Hono } from 'hono';
import { bikesClient } from '../clients/bikes-client.js';
import { zValidator } from '@hono/zod-validator';
import { BikeInsertSchema } from '../schemas/bike.js';

const app = new Hono();

app.get('/', async (c) => {
  const bikes = await bikesClient.getAllBikes();
  return c.json(bikes);
});

app.post('/', zValidator('json', BikeInsertSchema), async (c) => {
  const body = c.req.valid('json');
  const createdBike = await bikesClient.createNewBike(body);
  return c.json(createdBike);
});

export { app as appBikes };
