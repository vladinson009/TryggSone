import { bikesTable } from '../db/bikes-schema.js';

export const sortKeys = ['id', 'price', 'createdAt', 'brand'] as const;

export const sortableColumns = {
  id: bikesTable.id,
  price: bikesTable.price,
  createdAt: bikesTable.createdAt,
  brand: bikesTable.brand,
} as const;
