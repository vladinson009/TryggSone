import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { BIKE_ROUTES } from '@tryggsone/common/configs';

import { env } from './config/env.js';
import { errorHandler } from './middlewares/error-handler.js';

import { connectRedis } from './clients/redis-client.js';
import { appBikes } from './routes/bikes.js';

const app = new Hono({});
app.onError(errorHandler);

app.route(BIKE_ROUTES.apiBikes, appBikes);

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  async (info) => {
    console.log(`BFF Server is running on http://localhost:${info.port}`);
    try {
      await connectRedis();
      console.log('Redis connected successfully...');
    } catch (error) {
      console.error('Redis connection failed');
    }
  },
);
