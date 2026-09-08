import { z } from 'zod';

export const BikeInsertSchema = z.object({
  frameNumber: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number().int(),
  color: z.string(),
  type: z.string(),
  condition: z.string(),
  price: z.number().int(),

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

export type BikeInsert = z.infer<typeof BikeInsertSchema>;
