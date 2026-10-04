import { pgTable, text, timestamp, uuid, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-orm/zod';

export const bikeStatusEnum = pgEnum('bike_status', ['active', 'for_sale', 'stolen', 'deleted']);
export const bikeConditionEnum = pgEnum('bike_condition', [
  'new',
  'like_new',
  'good',
  'fair',
  'poor',
  'for_parts',
  'unknown',
]);

export const bikesTable = pgTable('bikes', {
  id: uuid('id').defaultRandom().primaryKey(),

  ownerId: text('owner_id').notNull(),

  // Identification
  frameNumber: text('frame_number').notNull().unique(),
  status: bikeStatusEnum('status').notNull().default('active'),

  // Bike
  brand: text('brand').notNull(),
  model: text('model').notNull(),
  year: integer('year').notNull(),
  color: text('color').notNull(),

  // Type
  type: text('type').notNull(),
  // road, mountain, gravel, city, electric, etc.

  // Technical
  frameSize: text('frame_size'),
  wheelSize: text('wheel_size'),
  weight: integer('weight'),

  // Electric bike
  isElectric: boolean('is_electric').default(false).notNull(),
  motorBrand: text('motor_brand'),
  motorPower: integer('motor_power'),
  batteryCapacity: integer('battery_capacity'),

  // Condition
  condition: bikeConditionEnum('condition').notNull().default('unknown'),
  // new, like_new, good, fair, poor

  // Pricing
  price: integer('price').notNull(),
  currency: text('currency').default('NOK').notNull(),

  description: text('description'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  isApproved: boolean('is_approved').notNull().default(false),

  version: integer().notNull().default(0),
});

export const BikeInsertSchema = createInsertSchema(bikesTable).omit({
  id: true,
  ownerId: true,
});
export const BikeSelectSchema = createSelectSchema(bikesTable);
export const BikePatchSchema = BikeInsertSchema.partial();
