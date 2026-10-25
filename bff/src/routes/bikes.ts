import { Hono } from 'hono';
import { bikesClient } from '../clients/bikes-client.js';
import { zValidator } from '@hono/zod-validator';
import {
  BikeInsertAddressSchema,
  BikeInsertPhotoSchema,
  BikeInsertSchema,
  BikeUpdateSchema,
} from '../schemas/bike/bike.js';
import { requireAuth } from '../middlewares/requireAuth.js';
import { paginationQuerySchema } from '../schemas/pagination-query.js';
import { validateJson } from '../lib/validate-zod-json.js';
import { BIKE_ROUTES } from '@tryggsone/common/configs';
import {
  listForSaleSchema,
  recoveredSchema,
  reportStolenSchema,
} from '../schemas/bike/bike-status-schema.js';
import { lookupFrameSchema } from '../schemas/bike/lookup-frame-schema.js';

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

// Insert new bike
app.post(BIKE_ROUTES.root, validateJson(BikeInsertSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const { id: ownerId } = c.get('user');

  const insertedBike = await bikesClient.insertNewBike(body, ownerId);
  return c.json(insertedBike);
});

// Add bike address
app.post(BIKE_ROUTES.addAddress, validateJson(BikeInsertAddressSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const { id: ownerId } = c.get('user');

  const bikeAddress = await bikesClient.addAddress(body, ownerId);
  return c.json(bikeAddress);
});

// Add bike photo
app.post(BIKE_ROUTES.addPhoto, validateJson(BikeInsertPhotoSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const { id: ownerId } = c.get('user');

  const bikePhoto = await bikesClient.addPhoto(body, ownerId);
  return c.json(bikePhoto);
});

// !Dynamic Routes =>

// Get bike by ID
app.get(BIKE_ROUTES.bikeId, async (c) => {
  const bikeId = c.req.param('bikeId');

  const bike = await bikesClient.getBikeById(bikeId);
  return c.json(bike);
});

// Report "stolen" bike
app.post(BIKE_ROUTES.reportStolen, validateJson(reportStolenSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const { id: ownerId } = c.get('user');
  const bikeId = c.req.param('bikeId');

  const report = await bikesClient.reportStolen(body, bikeId, ownerId);

  return c.json(report);
});

// Report "recovered" bike
app.post(BIKE_ROUTES.reportRecovered, validateJson(recoveredSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const { id: ownerId } = c.get('user');
  const bikeId = c.req.param('bikeId');

  const report = await bikesClient.reportRecovered(body, bikeId, ownerId);

  return c.json(report);
});
// Report "list for sale" bike
app.post(BIKE_ROUTES.listForSale, validateJson(listForSaleSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const { id: ownerId } = c.get('user');
  const bikeId = c.req.param('bikeId');

  const report = await bikesClient.reportListForSale(body, bikeId, ownerId);

  return c.json(report);
});

// Patch bike by ID
app.patch(BIKE_ROUTES.bikeId, validateJson(BikeUpdateSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const bikeId = c.req.param('bikeId');
  const { id: ownerId } = c.get('user');

  const updatedBike = await bikesClient.updateBikeById(body, bikeId, ownerId);
  return c.json(updatedBike);
});
// Delete bike by ID
app.delete(BIKE_ROUTES.bikeId, requireAuth, async (c) => {
  const bikeId = c.req.param('bikeId');
  const { id: ownerId } = c.get('user');

  const deleteResponse = await bikesClient.deleteBikeById(bikeId, ownerId);
  return c.json(deleteResponse);
});
export { app as appBikes };
