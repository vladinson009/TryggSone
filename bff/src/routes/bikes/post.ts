import { BIKE_ROUTES } from '@tryggsone/common/configs';
import { Hono } from 'hono';
import {
  BikeInsertAddressSchema,
  BikeInsertPhotoSchema,
  BikeInsertSchema,
} from '../../schemas/bike/bike.js';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { validateJson } from '../../lib/validate-zod-json.js';
import { bikesClient } from '../../clients/bikes-client.js';
import {
  listForSaleSchema,
  recoveredSchema,
  reportStolenSchema,
} from '../../schemas/bike/bike-status-schema.js';

const app = new Hono();

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

export { app as appPostBikes };
