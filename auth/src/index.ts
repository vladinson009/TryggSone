import 'dotenv/config';

import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { auth } from './lib/auth.js';
import { parseErrorResponse } from './lib/parse-error-response.js';

const app = new Hono();
//TODO: Global error handler

app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw));

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Auth Server is running on http://localhost:${info.port}`);
  },
);
