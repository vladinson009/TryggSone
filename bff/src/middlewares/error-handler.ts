// src/middleware/error-handler.ts

import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { AppError } from '../errors/app-error.js';

export function errorHandler(err: Error, c: Context) {
  console.error(err);

  if (err instanceof AppError) {
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
