import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './config/env.js';
import { insertNewBike } from './services/insert-new-bike.js';
import { errorHandler } from './middlewares/error-handler.js';
import { zValidator } from '@hono/zod-validator';
import { BikeInsertSchema } from './db/bikes-schema.js';
import { queryBikes } from './services/query-bikes.js';

const app = new Hono();
app.onError(errorHandler);

app.get('/', async (c) => {
  const userBikes = await queryBikes();
  return c.json(userBikes);
});
app.post('/', zValidator('json', BikeInsertSchema), async (c) => {
  const { id, ...userInput } = c.req.valid('json');
  const newBike = await insertNewBike(userInput);
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
