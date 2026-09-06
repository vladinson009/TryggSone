import { createClient } from 'redis';
import { env } from '../config/env.js';

const redis = createClient({
  url: env.REDIS_URL,
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
};

export { redis as redisClient };
