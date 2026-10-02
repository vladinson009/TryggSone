import { zValidator } from '@hono/zod-validator';
import type z from 'zod';

export const validateJson = <T extends z.ZodType>(schema: T) =>
  zValidator('json', schema, (result) => {
    if (!result.success) {
      throw result.error;
    }
  });
