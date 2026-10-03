import z from 'zod';

const envSchema = z.object({
  AUTH_SERVICE_URL: z.string().nonempty(),
  BIKES_SERVICE_URL: z.string().nonempty(),
  REDIS_URL: z.string().nonempty(),
  PORT: z.coerce.number(),
});

export const env = envSchema.parse(process.env);
