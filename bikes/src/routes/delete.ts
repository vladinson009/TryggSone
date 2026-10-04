import { Hono } from 'hono';
import { requireOwnerId } from '../middlewares/requireOwnerId.js';
import { deleteBikeById } from '../services/delete/delete-by-id.js';
import { BIKE_ROUTES } from '@tryggsone/common/configs';

const app = new Hono();

// Delete Bike By ID
app.delete(BIKE_ROUTES.bikeId, requireOwnerId, async (c) => {
  const bikeId = c.req.param('bikeId');
  const ownerId = c.get('ownerId');

  const response = await deleteBikeById(bikeId, ownerId);

  return c.json(response);
});

export { app as deleteApp };
