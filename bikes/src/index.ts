import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './config/env.js';
import { insertNewBike } from './services/insert-new-bike.js';
import { errorHandler } from './middlewares/error-handler.js';
import { zValidator } from '@hono/zod-validator';
import { BikeInsertSchema } from './db/bikes-schema.js';
import { DrizzleQueryError } from 'drizzle-orm';

const app = new Hono();
app.onError(errorHandler);

app.get('/', (c) => {
  return c.json({ bikeName: 'asd' });
});
app.post('/', zValidator('json', BikeInsertSchema), async (c) => {
  const { id, ...body } = c.req.valid('json');
  const newBike = await insertNewBike(body);
  return c.json(newBike);
});
serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  (info) => {
    console.log(`Bikes Server is running on http://localhost:${info.port}`);
  },
);
