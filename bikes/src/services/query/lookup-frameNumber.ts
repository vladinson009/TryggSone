import { count, ilike } from 'drizzle-orm';
import type { Bike, PaginatedResult } from '@tryggsone/common/types';

import { bikesTable } from '../../db/schema.js';
import { db } from '../../db/index.js';
import type { LookupBikeParams } from '../../zod/lookup-bike-query-schema.js';

export const lookupByFrameNumber = async (
  query: LookupBikeParams,
): Promise<PaginatedResult<Bike>> => {
  const { frameNumber, page, limit } = query;
  const offset = (page - 1) * limit;

  const whereCondition = ilike(bikesTable.frameNumber, `%${frameNumber}%`);

  const [data, countResult] = await Promise.all([
    db
      .select()
      .from(bikesTable)
      .where(whereCondition)
      .limit(limit)
      .offset(offset)
      .orderBy(bikesTable.frameNumber),
    db.select({ total: count() }).from(bikesTable).where(whereCondition),
  ]);

  const total = countResult[0].total;
  const totalPages = Math.ceil(total / limit);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};
