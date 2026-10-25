import { BIKE_ROUTES } from '@tryggsone/common/configs';
import { Hono } from 'hono';
import { requireAuth } from '../../middlewares/requireAuth.js';
import { bikesClient } from '../../clients/bikes-client.js';

const app = new Hono();

// !Dynamic Routes =>

// Delete bike by ID
app.delete(BIKE_ROUTES.bikeId, requireAuth, async (c) => {
  const bikeId = c.req.param('bikeId');
  const { id: ownerId } = c.get('user');

  const deleteResponse = await bikesClient.deleteBikeById(bikeId, ownerId);
  return c.json(deleteResponse);
});
export { app as appDeleteBikes };
