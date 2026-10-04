import { Hono } from 'hono';
import { bikesClient } from '../clients/bikes-client.js';
import { zValidator } from '@hono/zod-validator';
import {
  BikeInsertAddressSchema,
  BikeInsertPhotoSchema,
  BikeInsertSchema,
  BikeUpdateSchema,
} from '../schemas/bike.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { PaginationQuerySchema } from '../schemas/pagination-query.js';
import { validateJson } from '../lib/validate-zod-json.js';
import { BIKE_ROUTES } from '@tryggsone/common/configs';

const app = new Hono();

// Get Bike By ID
app.get(BIKE_ROUTES.bikeId, async (c) => {
  const bikeId = c.req.param('bikeId');

  const bike = await bikesClient.getBikeById(bikeId);
  return c.json(bike);
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

  const insertedBike = await bikesClient.insertNewBike(body, ownerId);
  return c.json(insertedBike);
});

// Add Bike address
app.post(BIKE_ROUTES.addAddress, validateJson(BikeInsertAddressSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const { id: ownerId } = c.get('user');

  const bikeAddress = await bikesClient.addAddress(body, ownerId);
  return c.json(bikeAddress);
});

// Add Bike Photo
app.post(BIKE_ROUTES.addPhoto, validateJson(BikeInsertPhotoSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const { id: ownerId } = c.get('user');

  const bikePhoto = await bikesClient.addPhoto(body, ownerId);
  return c.json(bikePhoto);
});

// Patch Bike By ID
app.patch(BIKE_ROUTES.bikeId, validateJson(BikeUpdateSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const bikeId = c.req.param('bikeId');
  const { id: ownerId } = c.get('user');

  const updatedBike = await bikesClient.updateBikeById(body, bikeId, ownerId);
  return c.json(updatedBike);
});

// Delete Bike by ID
app.delete(BIKE_ROUTES.bikeId, requireAuth, async (c) => {
  const bikeId = c.req.param('bikeId');
  const { id: ownerId } = c.get('user');

  const res = await bikesClient.deleteBikeById(bikeId, ownerId);
  return c.json(res);
});

export { app as appBikes };
