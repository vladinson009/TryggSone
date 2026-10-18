import type { PaginationParams } from '../../zod/pagination.js';
import type { BikeCard, PaginatedResult } from '@tryggsone/common/types';

import { and, count, eq } from 'drizzle-orm';

import { bikesTable } from '../../db/bikes-schema.js';
import { bikePhotosTable } from '../../db/bikePhotos-schema.js';
import { db } from '../../db/index.js';

export const myBikes = async (
  { page = 1, limit = 20 }: PaginationParams,
  ownerId: string,
): Promise<PaginatedResult<BikeCard>> => {
  const offset = (page - 1) * limit;

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
      .where(eq(bikesTable.ownerId, ownerId))
      .orderBy(bikesTable.createdAt)
      .limit(limit)
      .offset(offset)
      .leftJoin(
        bikePhotosTable,
        and(eq(bikePhotosTable.bikeId, bikesTable.id), eq(bikePhotosTable.sortOrder, 0)),
      ),
    db.select({ count: count() }).from(bikesTable).where(eq(bikesTable.ownerId, ownerId)),
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
