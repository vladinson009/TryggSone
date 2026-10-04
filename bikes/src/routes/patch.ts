import { Hono } from 'hono';
import { requireOwnerId } from '../middlewares/requireOwnerId.js';
import { deleteBikeById } from '../services/delete/delete-by-id.js';
import { BIKE_ROUTES } from '@tryggsone/common/configs';
import { validateJson } from '../lib/validate-zod-json.js';
import { BikeInsertSchema, BikePatchSchema } from '../db/bikes-schema.js';
import { editBikeById } from '../services/patch/edit-by-id.js';

const app = new Hono();

// Delete Bike By ID
app.patch(BIKE_ROUTES.bikeId, validateJson(BikePatchSchema), requireOwnerId, async (c) => {
  const bikeId = c.req.param('bikeId');
  const ownerId = c.get('ownerId');
  const body = c.req.valid('json');

  const response = await editBikeById(body, bikeId, ownerId);

  return c.json(response);
});

export { app as patchApp };
