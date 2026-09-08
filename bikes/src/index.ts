import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './config/env.js';

const app = new Hono();

app.get('/', (c) => {
  return c.json({ bikeName: 'asd' });
});
app.post('/', async (c) => {
  return c.json({ body: await c.req.json() });
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
