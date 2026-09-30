import { env } from '../config/env.js';
import { Pool } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { relations } from './relations.js';

const pool = new Pool({ connectionString: env.DATABASE_URL, max: 5 });
export const db = drizzle({ client: pool, relations: relations });
//TODO: Adjust other DB connections to looks like this
