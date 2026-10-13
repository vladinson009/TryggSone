import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { loggerQuerySchema } from '../zod/logger-query-schema.js';
import { queryLogs } from '../services/query-logs.js';

const app = new Hono();

app.get('/', zValidator('query', loggerQuerySchema), async (c) => {
  const query = c.req.valid('query');

  const result = await queryLogs(query);

  return c.json(result);
});

export { app as getApp };
