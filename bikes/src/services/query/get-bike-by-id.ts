import { eq } from 'drizzle-orm';

import { bikesTable } from '../../db/bikes-schema.js';
import { db } from '../../db/index.js';
import { bikeAddressTable } from '../../db/bike-address-schema.js';
import { bikePhotosTable } from '../../db/bikePhotos-schema.js';
import type { BikeGetByIdResponse } from '@tryggsone/common/types';

export const getBikeById = async (bikeId: string): Promise<BikeGetByIdResponse> => {
  const [bikeResult, photos] = await Promise.all([
    db
      .select({
        bike: bikesTable,
        address: {
          postCode: bikeAddressTable.postCode,
          city: bikeAddressTable.city,
          street: bikeAddressTable.street,
        },
      })
      .from(bikesTable)
      .leftJoin(bikeAddressTable, eq(bikeAddressTable.bikeId, bikesTable.id))
      .where(eq(bikesTable.id, bikeId))
      .limit(1),

    db
      .select({
        id: bikePhotosTable.id,
        url: bikePhotosTable.url,
        sortOrder: bikePhotosTable.sortOrder,
        createdAt: bikePhotosTable.createdAt,
      })
      .from(bikePhotosTable)
      .where(eq(bikePhotosTable.bikeId, bikeId)),
  ]);

  if (!bikeResult[0]) {
    throw new Error('Bike not found');
  }

  const address = bikeResult[0].address;
  const bike = bikeResult[0].bike;

  return {
    bike,
    address,
    photos,
  };
};
