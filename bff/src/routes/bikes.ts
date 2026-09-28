import { Hono } from 'hono';
import { bikesClient } from '../clients/bikes-client.js';
import { zValidator } from '@hono/zod-validator';
import { BikeInsertSchema } from '../schemas/bike.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { env } from '../config/env.js';
import { PaginationQuerySchema } from '../schemas/pagination-query.js';

const app = new Hono();

app.get('/', zValidator('query', PaginationQuerySchema), async (c) => {
  const query = c.req.valid('query');

  const bikes = await bikesClient.getAllBikes(query);
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
  const { id: ownerId } = c.get('user');

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
