import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL!,
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
