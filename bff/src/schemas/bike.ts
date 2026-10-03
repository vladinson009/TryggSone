import { z } from 'zod';

export const BikeInsertSchema = z.object({
  frameNumber: z.string().min(1, 'frameNumber is required. Must be unique as well'),
  brand: z.string().min(1, 'brand is required'),
  model: z.string().min(1, 'model is required'),
  year: z
    .number()
    .int()
    .min(1950, 'earliest year is 1950')
    .max(new Date().getFullYear(), 'year cannot be in the future'),
  color: z.string().min(1, 'color is required'),
  type: z.string().min(1, 'type is required'),
  condition: z
    .enum(['new', 'like_new', 'good', 'fair', 'poor', 'for_parts', 'unknown'])
    .default('unknown'),
  price: z
    .number()
    .nonnegative({ error: 'price must be a positiive number' })
    .min(1, 'price is required'),

  status: z.enum(['active', 'for_sale', 'stolen', 'deleted']).default('active'),
  frameSize: z.string().nullable().optional(),
  wheelSize: z.string().nullable().optional(),
  weight: z.number().int().nullable().optional(),

  isElectric: z.boolean().optional(),

  motorBrand: z.string().nullable().optional(),
  motorPower: z.number().int().nullable().optional(),
  batteryCapacity: z.number().int().nullable().optional(),

  currency: z.string().optional(),

  description: z.string().nullable().optional(),
});

export const BikeInsertAddressSchema = z.object({
  bikeId: z.string().min(1, 'BikeId is required'),
  postCode: z.string().min(1, 'postCode is required').max(10, 'postCode max length is 10'),
  street: z.string().min(1, 'street is required').max(200, 'street max length is 200'),
  city: z.string().min(1, 'city is required').max(100, 'city max length is 100'),
});
export const BikeInsertPhotoSchema = z.object({
  bikeId: z.string().min(1, 'BikeId is required'),
  url: z.url().min(1, 'Bike url is required'),
});
export type BikeInsert = z.infer<typeof BikeInsertSchema>;
export type BikeInsertAddress = z.infer<typeof BikeInsertAddressSchema>;
export type BikeInsertPhoto = z.infer<typeof BikeInsertPhotoSchema>;
