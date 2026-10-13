import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { registerBikeListeners } from './rabbitmq/listeners/bike-listener.js';
import { db } from './db/index.js';
import { vehicleEventsTable } from './db/vehicle-events-schema.js';
import { and, count, desc, eq, gte, lte } from 'drizzle-orm';
import { zValidator } from '@hono/zod-validator';
import { loggerQuerySchema } from './zod/logger-query-schema.js';

const app = new Hono();

app.get('/api/logger', zValidator('query', loggerQuerySchema), async (c) => {
  const { limit, page, correlationId, eventId, eventType, from, to } = c.req.valid('query');
  const offset = (page - 1) * limit;

  const filters = [];
  if (correlationId) {
    filters.push(eq(vehicleEventsTable.correlationId, correlationId));
  }
  if (eventId) {
    filters.push(eq(vehicleEventsTable.eventId, eventId));
  }
  if (eventType) {
    filters.push(eq(vehicleEventsTable.eventType, eventType));
  }
  if (from) {
    filters.push(gte(vehicleEventsTable.occurredAt, from));
  }
  if (to) {
    filters.push(lte(vehicleEventsTable.occurredAt, to));
  }

  const where = and(...filters);

  const [rows, totalCount] = await Promise.all([
    db
      .select()
      .from(vehicleEventsTable)
      .where(where)
      .orderBy(desc(vehicleEventsTable.occurredAt), desc(vehicleEventsTable.id))
      .limit(limit)
      .offset(offset),
    db.select({ total: count() }).from(vehicleEventsTable).where(where),
  ]);

  const total = totalCount[0].total;

  return c.json({
    data: rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Logger Server is running on http://localhost:${info.port}`);
    registerBikeListeners().catch((err) => {
      console.log('Failed to register bike listeners', err);
    });
  },
);
