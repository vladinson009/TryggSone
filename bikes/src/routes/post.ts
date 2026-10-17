import { Hono } from 'hono';
import { BikePhotoInsertSchema, BikeAddressInsertSchema, BikeInsertSchema } from '../db/schema.js';
import { requireOwnerId } from '../middlewares/requireOwnerId.js';
import { BIKE_ROUTES } from '@tryggsone/common/configs';
import { validateJson } from '../lib/validate-zod-json.js';
import {
  listForSaleSchema,
  recoveredSchema,
  reportStolenSchema,
} from '../zod/bike-status-schema.js';
import { reportRecoveredBike } from '../services/post/report-recovered.js';
import { listBikeForSale } from '../services/post/list-for-sale.js';
import { reportStolenBike } from '../services/post/report-stolen.js';
import { insertNewBike } from '../services/post/insert-new-bike.js';
import { addBikePhoto } from '../services/post/add-bike-photo.js';
import { addBikeAddress } from '../services/post/add-bike-address.js';

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

//TODO: ADD routes from common / Body as BikeReportStolen
app.post('/:bikeId/report-stolen', validateJson(reportStolenSchema), requireOwnerId, async (c) => {
  const body = c.req.valid('json');
  const ownerId = c.get('ownerId');
  const { bikeId } = c.req.param();

  await reportStolenBike({ body, ownerId, bikeId });

  return c.json({ success: true });
});
//TODO: ADD routes from common / Body as BikeReportRecovered
app.post('/:bikeId/report-recovered', validateJson(recoveredSchema), requireOwnerId, async (c) => {
  const body = c.req.valid('json');
  const ownerId = c.get('ownerId');
  const { bikeId } = c.req.param();

  await reportRecoveredBike({ body, ownerId, bikeId });

  return c.json({ success: true });
});
//TODO: ADD routes from common / Body as BikeListForSale
app.post('/:bikeId/list-for-sale', validateJson(listForSaleSchema), requireOwnerId, async (c) => {
  const body = c.req.valid('json');
  const ownerId = c.get('ownerId');
  const { bikeId } = c.req.param();

  await listBikeForSale({ bikeId, ownerId, body });

  return c.json({ success: true });
});
export { app as postApp };
