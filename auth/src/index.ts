import 'dotenv/config';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { auth } from './lib/auth.js';
import { parseErrorResponse } from './lib/parse-error-response.js';

const app = new Hono();
//TODO: Global error handler

app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw));

app.get('/internal/session', async (c) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  if (!session) {
    return c.json(parseErrorResponse('SESSION_NOT_FOUND', 'No active session'), 401);
  }
  return c.json({
    user: session.user,
    session: session.session,
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Auth Server is running on http://localhost:${info.port}`);
  },
);
