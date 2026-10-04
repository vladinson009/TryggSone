import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { env } from './config/env.js';
import { errorHandler } from './middlewares/error-handler.js';
import { postApp } from './routes/post.js';
import { bikeEventBus } from './rabbitmq/connection.js';
import { deleteApp } from './routes/delete.js';
import { getApp } from './routes/get.js';
import { patchApp } from './routes/patch.js';

const app = new Hono();

app.onError(errorHandler);

app.route('', getApp);
app.route('', postApp);
app.route('', deleteApp);
app.route('', patchApp);

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
