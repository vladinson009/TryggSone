import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/bff', (c) => {
  return c.text('Hello Hono!');
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
    hostname: '0.0.0.0',
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
