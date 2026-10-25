import type { PaginationParams } from '../../zod/pagination.js';
import type { BikeCard, PaginatedResult } from '@tryggsone/common/types';

import { and, asc, count, desc, eq } from 'drizzle-orm';

import { bikesTable } from '../../db/bikes-schema.js';
import { bikePhotosTable } from '../../db/bikePhotos-schema.js';
import { db } from '../../db/index.js';
import { sortableColumns } from '../../helpers/sortable-columns.js';

export const myBikes = async (
  { page = 1, limit = 20, sortBy, sortDir }: PaginationParams,
  ownerId: string,
): Promise<PaginatedResult<BikeCard>> => {
  const offset = (page - 1) * limit;

  const column = sortableColumns[sortBy] ?? bikesTable.id;
  const direction = sortDir === 'desc' ? desc : asc;

  const whereClause = eq(bikesTable.ownerId, ownerId);

  const [data, totalResult] = await Promise.all([
    await db
      .select({
        id: bikesTable.id,
        ownerId: bikesTable.ownerId,
        description: bikesTable.description,
        status: bikesTable.status,
        brand: bikesTable.brand,
        model: bikesTable.model,
        isElectric: bikesTable.isElectric,
        condition: bikesTable.condition,
        price: bikesTable.price,
        updatedAt: bikesTable.updatedAt,
        photo: bikePhotosTable.url,
      })
      .from(bikesTable)
      .leftJoin(
        bikePhotosTable,
        and(eq(bikePhotosTable.bikeId, bikesTable.id), eq(bikePhotosTable.sortOrder, 0)),
      )
      .where(whereClause)
      .orderBy(direction(column), bikesTable.id)
      .limit(limit)
      .offset(offset),
    db.select({ count: count() }).from(bikesTable).where(whereClause),
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
