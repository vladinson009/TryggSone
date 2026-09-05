import { drizzle } from 'drizzle-orm/neon-http';
import { relations } from './auth-schema.js';

export const db = drizzle(process.env.DATABASE_URL!, {
  relations: relations,
});
