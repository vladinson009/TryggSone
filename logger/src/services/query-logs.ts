import type z from 'zod';
import type { loggerQuerySchema } from '../zod/logger-query-schema.js';
import { vehicleEventsTable } from '../db/vehicle-events-schema.js';
import { and, count, desc, eq, gte, lte, SQL } from 'drizzle-orm';
import { db } from '../db/index.js';
import type { Log, PaginatedResult } from '@tryggsone/common/types';

export async function queryLogs(
  query: z.infer<typeof loggerQuerySchema>,
): Promise<PaginatedResult<Log>> {
  const { limit, page, correlationId, eventId, eventType, from, to } = query;
  const offset = (page - 1) * limit;

  const filters: SQL<unknown>[] = [];

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

  return {
    data: rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
