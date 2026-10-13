import { Hono } from 'hono';
import { loggerClient } from '../clients/logger-client.js';

const app = new Hono();

// Get Logs By Query Params
app.get('/', async (c) => {
  const query = c.req.query();

  const logs = await loggerClient.queryLogs(query);

  return c.json(logs);
});

export { app as appLogger };
