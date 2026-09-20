import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { errorHandler } from './middlewares/error-handler.js';
import { connectRedis } from './clients/redis-client.js';
import { env } from './config/env.js';
import { appBikes } from './routes/bikes.js';
import { bikesEventBus } from './rabbitmq/connection.js';
import { registerBikeListeners } from './rabbitmq/listeners/bikes-listener.js';

const app = new Hono();
app.onError(errorHandler);

app.route('/api/bikes', appBikes);

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  async (info) => {
    console.log(`BFF Server is running on http://localhost:${info.port}`);
    process.on('SIGINT', bikesEventBus.close);
    process.on('SIGTERM', bikesEventBus.close);
    try {
      await connectRedis();
      console.log('Redis connected successfully...');
    } catch (error) {
      console.error('Redis connection failed');
    }
    registerBikeListeners().catch((err) => {
      console.log('Failed to register bike listeners', err);
    });
  },
);
