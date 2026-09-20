import { count } from 'drizzle-orm';
import { bikesTable, type BikeSelectSchema } from '../db/bikes-schema.js';
import { db } from '../db/index.js';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export const queryBikes = async ({
  page = 1,
  limit = 20,
}: PaginationParams = {}): Promise<
  PaginatedResult<typeof bikesTable.$inferSelect>
> => {
  const offset = (page - 1) * limit;

  const [data, totalResult] = await Promise.all([
    db.query.bikesTable.findMany({ limit, offset }),
    db.select({ count: count() }).from(bikesTable),
  ]);

  const total = totalResult[0]?.count ?? 0;

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
