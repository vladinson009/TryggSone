import {
  pgTable,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';

type Bike = typeof bikes.$inferSelect;
type BikeInsert = typeof bikes.$inferInsert;

export const bikes = pgTable('bikes', {
  id: uuid('id').defaultRandom().primaryKey(),

  ownerId: text('owner_id').notNull(),

  // Identification
  frameNumber: text('frame_number').notNull().unique(),

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
  condition: text('condition').notNull(),
  // new, like_new, good, fair, poor

  // Pricing
  price: integer('price').notNull(),
  currency: text('currency').default('NOK').notNull(),

  description: text('description'),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  isApproved: boolean('is_approved').notNull().default(false),
});
