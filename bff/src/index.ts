import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { requireAuth } from './middlewares/requireAuth.js';
import { errorHandler } from './middlewares/error-handler.js';
import { connectRedis } from './clients/redis-client.js';

const app = new Hono();
app.onError(errorHandler);

app.get('/api', (c) => {
  return c.text('Hello MR {Placeholder}!');
});

app.get('/api/bikes', requireAuth, async (c) => {
  return await fetch('http://bikes-srv:3000');
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  async (info) => {
    if (!process.env.AUTH_SERVICE_URL) {
      throw new Error('AUTH_SERVICE_URL env is missing');
    }
    if (!process.env.BIKES_SERVICE_URL) {
      throw new Error('BIKES_SERVICE_URL env is missing');
    }
    if (!process.env.REDIS_URL) {
      throw new Error('REDIS_URL env is missing');
    }
    console.log(`BFF Server is running on http://localhost:${info.port}`);
    try {
      await connectRedis();
      console.log('Redis connected successfully...');
    } catch (error) {
      console.error('Redis connection failed');
    }
  },
);
