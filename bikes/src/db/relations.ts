import { defineRelations } from 'drizzle-orm';
import { bikePhotosTable } from './bikePhotos-schema.js';
import { bikesTable } from './bikes-schema.js';
import { bikeAddressTable } from './bike-address-schema.js';

export const relations = defineRelations(
  {
    bikesTable,
    bikePhotosTable,
    bikeAddressTable,
  },
  (r) => ({
    bikes: {
      photos: r.many.bikePhotosTable({
        from: r.bikesTable.id,
        to: r.bikePhotosTable.bikeId,
      }),
      address: r.one.bikeAddressTable({
        from: r.bikesTable.id,
        to: r.bikeAddressTable.bikeId,
      }),
    },
    bikePhotosTable: {
      bike: r.one.bikesTable({
        from: r.bikePhotosTable.bikeId,
        to: r.bikesTable.id,
      }),
    },
    bikeAddressTable: {
      bike: r.one.bikesTable({
        from: r.bikeAddressTable.bikeId,
        to: r.bikesTable.id,
      }),
    },
  }),
);
