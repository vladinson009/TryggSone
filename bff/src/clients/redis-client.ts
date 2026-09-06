import { createClient } from 'redis';

const redis = createClient({
  url: process.env.REDIS_URL!,
});

redis.on('error', (err) => {
  console.error('Redis error:', err);
});

export const redisClient = redis;

export const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};
