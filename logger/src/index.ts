import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { registerBikeListeners } from './rabbitmq/listeners/bike-listener.js';
import { getApp } from './routes/get.js';

const app = new Hono();

app.route('', getApp);

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
