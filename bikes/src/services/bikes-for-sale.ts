import type { PaginationParams } from '../zod/pagination.js';
import type { BikesForSaleResponse, PaginatedResult } from '@tryggsone/common/types';

import { and, count, eq } from 'drizzle-orm';

import { bikesTable } from '../db/bikes-schema.js';
import { bikePhotosTable } from '../db/bikePhotos-schema.js';
import { db } from '../db/index.js';

export const bikesForSale = async ({
  page = 1,
  limit = 20,
}: PaginationParams): Promise<PaginatedResult<BikesForSaleResponse>> => {
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
      .leftJoin(
        bikePhotosTable,
        and(
          eq(bikePhotosTable.bikeId, bikesTable.id),
          eq(bikePhotosTable.sortOrder, 0),
        ),
      )
      .limit(limit)
      .offset(offset),
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
