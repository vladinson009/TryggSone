import { env } from '../config/env.js';
import { xUserId } from '../config/constants.js';
import { createHttpClient } from './http-client.js';

import type { BikeInsert } from '../schemas/bike.js';
import type { BikeResponse, PaginatedResult } from './types/responses.js';
import type { PaginationQuery } from '../schemas/pagination-query.js';
import { toQueryString } from '../lib/to-query-string.js';

const createBikesClient = (baseUrl: string) => {
  const httpClient = createHttpClient(baseUrl);
  return {
    getAllBikes: (query: PaginationQuery) =>
      httpClient.get<PaginatedResult<BikeResponse>>(`/${toQueryString(query)}`, {}),

    insertNewBike: (body: BikeInsert, ownerId: string) =>
      httpClient.post<BikeResponse>('/', {
        body,
        headers: {
          [xUserId]: ownerId,
        },
      }),
  };
};

export const bikesClient = createBikesClient(env.BIKES_SERVICE_URL);
