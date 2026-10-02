import type { BikeInsert, BikeInsertAddress } from '../schemas/bike.js';
import type { BikesForSale, PaginatedResult } from './types/responses.js';
import type { PaginationQuery } from '../schemas/pagination-query.js';
import type { AddBikeAddressResponse, BikeResponse } from '@tryggsone/common/types';

import { env } from '../config/env.js';

import { createHttpClient } from './http-client.js';
import { toQueryString } from '../lib/to-query-string.js';
import { headers } from '@tryggsone/common/configs';

const createBikesClient = (baseUrl: string) => {
  const httpClient = createHttpClient(baseUrl);
  return {
    bikesForSale: (query: PaginationQuery) =>
      httpClient.get<PaginatedResult<BikesForSale>>(
        `/for-sale${toQueryString(query)}`,
        {},
      ),

    insertNewBike: (body: BikeInsert, ownerId: string) =>
      httpClient.post<BikeResponse>('/', {
        body,
        headers: {
          [headers.xUserId]: ownerId,
        },
      }),
    addAddress: (body: BikeInsertAddress, ownerId: string) =>
      httpClient.post<AddBikeAddressResponse>('/add-address', {
        body,
        headers: {
          [headers.xUserId]: ownerId,
        },
      }),
  };
};

export const bikesClient = createBikesClient(env.BIKES_SERVICE_URL);
