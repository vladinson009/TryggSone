import type {
  BikeInsert,
  BikeInsertAddress,
  BikeInsertPhoto,
  BikeUpdate,
} from '../schemas/bike.js';
import type { PaginationQuery } from '../schemas/pagination-query.js';

import { env } from '../config/env.js';

import { createHttpClient } from './http-client.js';
import { HEADER_CONST, BIKE_ROUTES } from '@tryggsone/common/configs';
import type {
  Bike,
  BikeAddress,
  BikeForSale,
  BikeGetByIdResponse,
  BikePhoto,
  PaginatedResult,
} from '@tryggsone/common/types';
import { toQueryString } from '@tryggsone/common/libs';
import type {
  ReportListForSaleSchema,
  ReportRecoveredSchema,
  ReportStolenSchema,
} from '../schemas/bike-status-schema.js';

const createBikesClient = (baseUrl: string) => {
  const httpClient = createHttpClient(baseUrl);
  return {
    getBikeById: (bikeId: string) => httpClient.get<BikeGetByIdResponse>(`/${bikeId}`),
    bikesForSale: (query: PaginationQuery) =>
      httpClient.get<PaginatedResult<BikeForSale>>(BIKE_ROUTES.forSale + toQueryString(query)),

    insertNewBike: (body: BikeInsert, ownerId: string) =>
      httpClient.post<Bike>(BIKE_ROUTES.root, {
        body,
        headers: {
          [HEADER_CONST.xUserId]: ownerId,
        },
      }),
    addAddress: (body: BikeInsertAddress, ownerId: string) =>
      httpClient.post<BikeAddress>(BIKE_ROUTES.addAddress, {
        body,
        headers: {
          [HEADER_CONST.xUserId]: ownerId,
        },
      }),
    addPhoto: (body: BikeInsertPhoto, ownerId: string) =>
      httpClient.post<BikePhoto>(BIKE_ROUTES.addPhoto, {
        body,
        headers: {
          [HEADER_CONST.xUserId]: ownerId,
        },
      }),

    deleteBikeById: (bikeId: string, ownerId: string) =>
      httpClient.delete<{ success: boolean }>(`/${bikeId}`, {
        headers: {
          [HEADER_CONST.xUserId]: ownerId,
        },
      }),
    updateBikeById: (body: BikeUpdate, bikeId: string, ownerId: string) =>
      httpClient.patch<Bike>(`/${bikeId}`, {
        body,
        headers: {
          [HEADER_CONST.xUserId]: ownerId,
        },
      }),
    reportStolen: (body: ReportStolenSchema, bikeId: string, ownerId: string) =>
      httpClient.post<{ success: boolean }>(`/${bikeId}/report-stolen`, {
        body,
        headers: {
          [HEADER_CONST.xUserId]: ownerId,
        },
      }),
    reportRecovered: (body: ReportRecoveredSchema, bikeId: string, ownerId: string) =>
      httpClient.post<{ success: boolean }>(`/${bikeId}/report-recovered`, {
        body,
        headers: {
          [HEADER_CONST.xUserId]: ownerId,
        },
      }),
    reportListForSale: (body: ReportListForSaleSchema, bikeId: string, ownerId: string) =>
      httpClient.post<{ success: boolean }>(`/${bikeId}/list-for-sale`, {
        body,
        headers: {
          [HEADER_CONST.xUserId]: ownerId,
        },
      }),
  };
};

export const bikesClient = createBikesClient(env.BIKES_SERVICE_URL);
