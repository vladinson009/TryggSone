import { env } from '../config/env.js';

import { drizzle } from 'drizzle-orm/neon-http';
import { relations } from './relations.js';

export const db = drizzle(env.DATABASE_URL, {
  relations: relations,
});
