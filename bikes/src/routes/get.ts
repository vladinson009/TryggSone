import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { paginationSchema } from '../zod/pagination.js';
import { bikesForSale } from '../services/query/bikes-for-sale.js';
import { getBikeById } from '../services/query/get-bike-by-id.js';

const app = new Hono();

app.get('/for-sale', zValidator('query', paginationSchema), async (c) => {
  const { limit, page } = c.req.valid('query');

  const { data, pagination } = await bikesForSale({ limit, page });

  return c.json({ data, pagination });
});

app.get('/:bikeId', async (c) => {
  const bikeId = c.req.param('bikeId');

  const response = await getBikeById(bikeId);

  return c.json(response);
});

export { app as getApp };
