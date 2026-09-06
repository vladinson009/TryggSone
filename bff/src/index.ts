import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { requireAuth } from './middlewares/requireAuth.js';
import { errorHandler } from './middlewares/error-handler.js';
import { connectRedis } from './clients/redis-client.js';

const app = new Hono();
app.onError(errorHandler);

await connectRedis();

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
  (info) => {
    console.log(`BFF Server is running on http://localhost:${info.port}`);
  },
);
