import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { bikesForSale } from '../services/bikes-for-sale.js';
import { paginationSchema } from '../zod/pagination.js';

const app = new Hono();

app.get('/for-sale', zValidator('query', paginationSchema), async (c) => {
  const { limit, page } = c.req.valid('query');

  const { data, pagination } = await bikesForSale({ limit, page });

  return c.json({ data, pagination });
});

export { app as getApp };
