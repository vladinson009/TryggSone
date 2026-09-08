import { defineRelations } from 'drizzle-orm';
import { bikePhotosTable } from './bikePhotos-schema.js';
import { bikesTable } from './bikes-schema.js';

export const relations = defineRelations(
  {
    bikesTable,
    bikePhotosTable,
  },
  (r) => ({
    bikes: {
      photos: r.many.bikePhotosTable({
        from: r.bikesTable.id,
        to: r.bikePhotosTable.bikeId,
      }),
    },
    bikePhotosTable: {
      bike: r.one.bikesTable({
        from: r.bikePhotosTable.bikeId,
        to: r.bikesTable.id,
      }),
    },
  }),
);
