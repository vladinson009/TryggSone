import { env } from '../config/env.js';
import type { BikeInsert } from '../schemas/bike.js';
import { createHttpClient } from './http-client.js';
import type {  BikeResponse } from './types/responses.js';

const createBikesClient = () => {
  const httpClient = createHttpClient(env.BIKES_SERVICE_URL);
  return {
    getAllBikes: () => {
      const response = httpClient.get<BikeResponse[]>('');
      return response;
    },
    createNewBike: (body: BikeInsert) => {
      const result = httpClient.post<BikeResponse>('', { body });
      return result;
    },
  };
};

export const bikesClient = createBikesClient();
