import { Hono } from 'hono';
import { bikesClient } from '../clients/bikes-client.js';
import { zValidator } from '@hono/zod-validator';
import { BikeInsertSchema } from '../schemas/bike.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { env } from '../config/env.js';

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
app.delete('/:bikeId', requireAuth, async (c) => {
  const bikeId = c.req.param('bikeId');
  const user = c.get('user');
  const ownerId = user.id;
  console.log('BFF ownerId:', ownerId);
  console.log('BFF headers:', {
    'x-user-id': ownerId,
  });
  const response = await fetch(env.BIKES_SERVICE_URL + '/' + bikeId, {
    method: 'DELETE',
    headers: {
      'x-user-id': ownerId,
    },
  });
  const data = await response.json();
  return c.json(data);
});

export { app as appBikes };
