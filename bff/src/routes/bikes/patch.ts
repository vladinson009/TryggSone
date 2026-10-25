import { BIKE_ROUTES } from '@tryggsone/common/configs';
import { Hono } from 'hono';
import { BikeUpdateSchema } from '../../schemas/bike/bike.js';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { validateJson } from '../../lib/validate-zod-json.js';
import { bikesClient } from '../../clients/bikes-client.js';

const app = new Hono();

// !Dynamic Routes =>

// Patch bike by ID
app.patch(BIKE_ROUTES.bikeId, validateJson(BikeUpdateSchema), requireAuth, async (c) => {
  const body = c.req.valid('json');
  const bikeId = c.req.param('bikeId');
  const { id: ownerId } = c.get('user');

  const updatedBike = await bikesClient.updateBikeById(body, bikeId, ownerId);
  return c.json(updatedBike);
});

export { app as appPatchBikes };
