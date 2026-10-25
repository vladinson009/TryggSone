import { zValidator } from '@hono/zod-validator';
import { BIKE_ROUTES } from '@tryggsone/common/configs';
import { Hono } from 'hono';
import { bikesClient } from '../../clients/bikes-client.js';
import { lookupFrameSchema } from '../../schemas/bike/lookup-frame-schema.js';
import { paginationQuerySchema } from '../../schemas/pagination-query.js';
import { requireAuth } from '../../middlewares/requireAuth.js';

const app = new Hono();

// Lookup by frameNumber
app.get(BIKE_ROUTES.lookupFrameNumber, zValidator('query', lookupFrameSchema), async (c) => {
  const query = c.req.valid('query');

  const paginatedBikesMatch = await bikesClient.lookupFrameNumber(query);

  return c.json(paginatedBikesMatch);
});
// Get my bikes
app.get(BIKE_ROUTES.myBikes, zValidator('query', paginationQuerySchema), requireAuth, async (c) => {
  const query = c.req.valid('query');
  const { id: ownerId } = c.get('user');

  const paginatedMyBikes = await bikesClient.getMyBikes(query, ownerId);

  return c.json(paginatedMyBikes);
});

// Bikes for sale
app.get(BIKE_ROUTES.forSale, zValidator('query', paginationQuerySchema), async (c) => {
  const query = c.req.valid('query');
  const paginatedBikes = await bikesClient.bikesForSale(query);
  return c.json(paginatedBikes);
});

// !Dynamic Routes =>

// Get bike by ID
app.get(BIKE_ROUTES.bikeId, async (c) => {
  const bikeId = c.req.param('bikeId');

  const bike = await bikesClient.getBikeById(bikeId);
  return c.json(bike);
});

export { app as appGetBikes };
