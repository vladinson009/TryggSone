import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/api', (c) => {
  return c.text('Hello MR {Placeholder}!');
});
app.all('/api/auth/*', async (c) => {
  const url = new URL(c.req.url);
  const hasBody = !['GET', 'HEAD'].includes(c.req.method);
  const body = hasBody ? await c.req.text() : undefined;

  const authUrl = `http://auth-srv:3000${url.pathname}${url.search}`;
  return fetch(authUrl, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body,
  });
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
