import { defineRelations } from 'drizzle-orm';
import { bikePhotos } from './bikePhotos-schema.js';
import { bikes } from './bikes-schema.js';

export const relations = defineRelations(
  {
    bikes,
    bikePhotos,
  },
  (r) => ({
    bikes: {
      photos: r.many.bikePhotos({
        from: r.bikes.id,
        to: r.bikePhotos.bikeId,
      }),
    },
    bikePhotos: {
      bike: r.one.bikes({
        from: r.bikePhotos.bikeId,
        to: r.bikes.id,
      }),
    },
  }),
);
