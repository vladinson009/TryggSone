import type { BikeInsert, BikeInsertAddress, BikeInsertPhoto } from '../schemas/bike.js';
import type { PaginationQuery } from '../schemas/pagination-query.js';

import { env } from '../config/env.js';

import { createHttpClient } from './http-client.js';
import { headers } from '@tryggsone/common/configs';
import type {
  Bike,
  BikeAddress,
  BikeForSale,
  BikeGetByIdResponse,
  BikePhoto,
  PaginatedResult,
} from '@tryggsone/common/types';
import { toQueryString } from '@tryggsone/common/libs';

const createBikesClient = (baseUrl: string) => {
  const httpClient = createHttpClient(baseUrl);
  return {
    bikesForSale: (query: PaginationQuery) =>
      httpClient.get<PaginatedResult<BikeForSale>>(`/for-sale${toQueryString(query)}`, {}),

    insertNewBike: (body: BikeInsert, ownerId: string) =>
      httpClient.post<Bike>('/', {
        body,
        headers: {
          [headers.xUserId]: ownerId,
        },
      }),
    addAddress: (body: BikeInsertAddress, ownerId: string) =>
      httpClient.post<BikeAddress>('/add-address', {
        body,
        headers: {
          [headers.xUserId]: ownerId,
        },
      }),
    addPhoto: (body: BikeInsertPhoto, ownerId: string) =>
      httpClient.post<BikePhoto>('/add-photo', {
        body,
        headers: {
          [headers.xUserId]: ownerId,
        },
      }),
    getBikeById: (bikeId: string) => httpClient.get<BikeGetByIdResponse>(`/${bikeId}`),

    deleteBikeById: (bikeId: string, ownerId: string) =>
      httpClient.delete<{ success: boolean }>(`/${bikeId}`, {
        headers: {
          [headers.xUserId]: ownerId,
        },
      }),
  };
};

export const bikesClient = createBikesClient(env.BIKES_SERVICE_URL);
