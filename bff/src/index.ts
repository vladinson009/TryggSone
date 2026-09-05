import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/api', (c) => {
  return c.text('Hello MR {Placeholder}!');
});
app.get('/api/auth', async (c) => {
  return await fetch('http://auth-srv:3000');
});
app.get('/api/bikes', async (c) => {
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
