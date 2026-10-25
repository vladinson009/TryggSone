import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import { paginationSchema } from '../zod/pagination.js';
import { bikesForSale } from '../services/query/bikes-for-sale.js';
import { getBikeById } from '../services/query/get-bike-by-id.js';
import { BIKE_ROUTES } from '@tryggsone/common/configs';
import { lookupByFrameNumber } from '../services/query/lookup-frameNumber.js';
import { NotFoundError } from '@tryggsone/common/errors';
import { lookupBikeSchema } from '../zod/lookup-bike-query-schema.js';
import { myBikes } from '../services/query/my-bikes.js';
import { requireOwnerId } from '../middlewares/requireOwnerId.js';

const app = new Hono();

// Query Bikes for sale
app.get(BIKE_ROUTES.forSale, zValidator('query', paginationSchema), async (c) => {
  const query = c.req.valid('query');

  const bikesForSaleResponse = await bikesForSale(query);

  return c.json(bikesForSaleResponse);
});
// Query my bikes
app.get(BIKE_ROUTES.myBikes, zValidator('query', paginationSchema), requireOwnerId, async (c) => {
  const ownerId = c.get('ownerId');
  const query = c.req.valid('query');

  const paginatedMyBikes = await myBikes(query, ownerId);

  return c.json(paginatedMyBikes);
});

// Lookup bike by frameNumber
app.get(BIKE_ROUTES.lookupFrameNumber, zValidator('query', lookupBikeSchema), async (c) => {
  const query = c.req.valid('query');

  if (!query.frameNumber) {
    throw new NotFoundError(`Bike with frameNumber pattern ${query.frameNumber} not found!`);
  }

  const response = await lookupByFrameNumber(query);

  return c.json(response);
});

//  ! Dynamic Routes =>
// Query Bike By Id
app.get(BIKE_ROUTES.bikeId, async (c) => {
  const bikeId = c.req.param('bikeId');

  const response = await getBikeById(bikeId);

  return c.json(response);
});

export { app as getApp };
