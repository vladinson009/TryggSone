import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { registerBikeListeners } from './rabbitmq/listeners/bike-listener.js';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Logger Server is running on http://localhost:${info.port}`);
    registerBikeListeners().catch((err) => {
      console.log('Failed to register bike listeners', err);
    });
  },
);
