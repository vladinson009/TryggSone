import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error-handler.js';
import { queryBikes } from './services/query-bikes.js';
import { postApp } from './routes/post.js';
import { bikeEventBus } from './lib/rabbitmq/connection.js';
import { zValidator } from '@hono/zod-validator';
import { paginationSchema } from './zod/pagination.js';

const app = new Hono();

app.onError(errorHandler);

app.get('/', zValidator('query', paginationSchema), async (c) => {
  const { limit, page } = c.req.valid('query');

  const { data, pagination } = await queryBikes({ limit, page });

  return c.json({ data, pagination });
});

app.route('', postApp);

serve(
  {
    fetch: app.fetch,
    port: env.PORT,
  },
  async (info) => {
    console.log(`Bikes Server is running on http://localhost:${info.port}`);

    process.on('SIGINT', bikeEventBus.close);
    process.on('SIGTERM', bikeEventBus.close);
  },
);
