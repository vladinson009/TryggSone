import { Hono } from 'hono';
import { bikesClient } from '../clients/bikes-client.js';
import { zValidator } from '@hono/zod-validator';
import {
  BikeInsertAddressSchema,
  BikeInsertPhotoSchema,
  BikeInsertSchema,
} from '../schemas/bike.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { PaginationQuerySchema } from '../schemas/pagination-query.js';
import { validateJson } from '../lib/validate-zod-json.js';
import { BIKE_ROUTES } from '@tryggsone/common/configs';

const app = new Hono();

// Get Bike By ID
app.get(BIKE_ROUTES.bikeId, async (c) => {
  const bikeId = c.req.param('bikeId');

  const response = await bikesClient.getBikeById(bikeId);
  return c.json(response);
});

// Bikes for sale
app.get(BIKE_ROUTES.forSale, zValidator('query', PaginationQuerySchema), async (c) => {
  const query = c.req.valid('query');

  const bikes = await bikesClient.bikesForSale(query);
  return c.json(bikes);
});

// Insert new bike
app.post(BIKE_ROUTES.root, validateJson(BikeInsertSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');

  const { id: ownerId } = c.get('user');

  const createdBike = await bikesClient.insertNewBike(body, ownerId);
  return c.json(createdBike);
});
// Add Bike address
app.post(BIKE_ROUTES.addAddress, validateJson(BikeInsertAddressSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const { id: ownerId } = c.get('user');

  const address = await bikesClient.addAddress(body, ownerId);

  return c.json(address);
});
// Add Bike Photo
app.post(BIKE_ROUTES.addPhoto, validateJson(BikeInsertPhotoSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const { id: ownerId } = c.get('user');

  const photo = await bikesClient.addPhoto(body, ownerId);

  return c.json(photo);
});
// Delete Bike by ID
app.delete(BIKE_ROUTES.bikeId, requireAuth, async (c) => {
  const bikeId = c.req.param('bikeId');

  const { id: ownerId } = c.get('user');
  const res = await bikesClient.deleteBikeById(bikeId, ownerId);

  return c.json(res);
});

export { app as appBikes };
