import { z } from 'zod';

export const BikeInsertSchema = z.object({
  frameNumber: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number().int(),
  color: z.string(),
  type: z.string(),
  condition: z
    .enum(['new', 'like_new', 'good', 'fair', 'poor', 'for_parts', 'unknown'])
    .default('unknown'),
  price: z.number().int(),

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
  postCode: z
    .string()
    .min(1, 'postCode is required')
    .max(10, 'postCode max length is 10'),
  street: z
    .string()
    .min(1, 'street is required')
    .max(200, 'street max length is 200'),
  city: z.string().min(1, 'city is required').max(100, 'city max length is 100'),
});
export const BikeInsertPhotoSchema = z.object({
  bikeId: z.string().min(1, 'BikeId is required'),
  url: z.url().min(1, 'Bike url is required')
});
export type BikeInsert = z.infer<typeof BikeInsertSchema>;
export type BikeInsertAddress = z.infer<typeof BikeInsertAddressSchema>;
export type BikeInsertPhoto = z.infer<typeof BikeInsertPhotoSchema>
