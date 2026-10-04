import { Hono } from 'hono';
import { BikeInsertSchema } from '../db/bikes-schema.js';
import { insertNewBike } from '../services/insert/insert-new-bike.js';
import { requireOwnerId } from '../middlewares/requireOwnerId.js';
import { BikeAddressInsertSchema } from '../db/bike-address-schema.js';
import { addBikeAddress } from '../services/insert/add-bike-address.js';
import { BikePhotoInsertSchema } from '../db/bikePhotos-schema.js';
import { addBikePhoto } from '../services/insert/add-bike-photo.js';
import { BIKE_ROUTES } from '@tryggsone/common/configs';
import { validateJson } from '../lib/validate-zod-json.js';

const app = new Hono();

app.post(BIKE_ROUTES.root, validateJson(BikeInsertSchema), requireOwnerId, async (c) => {
  const body = c.req.valid('json');
  const ownerId = c.get('ownerId');

  const newBike = await insertNewBike(body, ownerId);
  return c.json(newBike);
});

//TODO: get bikeId from dynamic query params instead of body
app.post(
  BIKE_ROUTES.addAddress,
  validateJson(BikeAddressInsertSchema),
  requireOwnerId,
  async (c) => {
    const body = c.req.valid('json');
    const ownerId = c.get('ownerId');

    const bikeAddress = await addBikeAddress(body, ownerId);
    return c.json(bikeAddress);
  },
);
app.post(BIKE_ROUTES.addPhoto, validateJson(BikePhotoInsertSchema), requireOwnerId, async (c) => {
  const body = c.req.valid('json');
  const ownerId = c.get('ownerId');

  const bikePhoto = await addBikePhoto(body, ownerId);
  return c.json(bikePhoto);
});

export { app as postApp };
