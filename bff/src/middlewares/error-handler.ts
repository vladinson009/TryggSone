// src/middleware/error-handler.ts

import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { CustomError } from '../errors/app-error.js';
import z from 'zod';

export function errorHandler(err: Error, c: Context) {
  console.error(err);

  if (err instanceof z.ZodError) {
    return c.json(
      {
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          issues: err.issues,
        },
      },
      400,
    );
  }

  if (err instanceof CustomError) {
    return c.json(
      {
        error: {
          code: err.code,
          message: err.message,
        },
      },
      err.status,
    );
  }

  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json(
    {
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Internal server error!',
      },
    },
    500,
  );
}
