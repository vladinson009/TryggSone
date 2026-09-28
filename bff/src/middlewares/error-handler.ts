// src/middleware/error-handler.ts

import type { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import z from 'zod';
import { parseErrorResponse } from '../lib/parse-error-response.js';
import { CustomError } from '@tryggsone/common';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export function errorHandler(err: Error, c: Context) {
  console.error(`[bff => errorHandler] ${err}`);

  if (err instanceof z.ZodError) {
    return c.json(
      parseErrorResponse('VALIDATION_ERROR', 'Validation failed', err.issues),
      400,
    );
  }

  if (err instanceof CustomError) {
    return c.json(
      parseErrorResponse(err.code, err.message),
      err.status as ContentfulStatusCode,
    );
  }

  if (err instanceof HTTPException) {
    return err.getResponse();
  }
  return c.json(
    parseErrorResponse('INTERNAL_SERVER_ERROR', 'Internal server error!'),
    500,
  );
}
