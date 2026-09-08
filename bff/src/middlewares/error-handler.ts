// src/middleware/error-handler.ts

import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { CustomError } from '../errors/app-error.js';
import z from 'zod';
import { parseErrorResponse } from '../lib/parse-error-response.js';

export function errorHandler(err: Error, c: Context) {
  console.error(`[bff => errorHandler] ${err}`);

  if (err instanceof z.ZodError) {
    return c.json(
      parseErrorResponse('VALIDATION_ERROR', 'Validation failed', err.issues),
      400,
    );
  }

  if (err instanceof CustomError) {
    return c.json(parseErrorResponse(err.code, err.message), err.status);
  }

  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json(
    parseErrorResponse('INTERNAL_SERVER_ERROR', 'Internal server error!'),
    500,
  );
}
