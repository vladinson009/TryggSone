import z from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().nonempty(),
  PORT: z.coerce.number(),

  RABBITMQ_URL: z.string().nonempty(),
  RABBITMQ_USERNAME: z.string().nonempty(),
  RABBITMQ_PASSWORD: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);

export const RABBITMQ_URL = `amqp://${encodeURIComponent(
  env.RABBITMQ_USERNAME,
)}:${encodeURIComponent(env.RABBITMQ_PASSWORD)}@${env.RABBITMQ_URL}`;
