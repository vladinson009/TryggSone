import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './config/env.js';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello BIKES!');
});
app.post('/', (c) => {
  return c.text('asd eno dve tri');
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
