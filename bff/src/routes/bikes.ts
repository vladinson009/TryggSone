import { Hono } from 'hono';
import { env } from '../config/env.js';

const app = new Hono();

app.get('/', async (c) => {
  const response = await fetch(env.BIKES_SERVICE_URL);

  return c.text(await response.text());
});
app.post('/', async (c) => {
  const response = await fetch(env.BIKES_SERVICE_URL, {
    method: 'POST',
    body: '',
  });
  return c.text(await response.text());
});

export { app as appBikes };
