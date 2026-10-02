// src/middleware/error-handler.ts

import type { Context } from 'hono';
import { DrizzleQueryError } from 'drizzle-orm';
import { parseErrorResponse } from '../lib/parse-error-response.js';
import { CustomError } from '@tryggsone/common/errors';
import type { ContentfulStatusCode } from 'hono/utils/http-status';

export function errorHandler(err: Error, c: Context) {
  console.error(`[bikes => errorHandler] ${err}`);
  if (err instanceof CustomError) {
    return c.json(
      parseErrorResponse(err.code, err.message),
      err.status as ContentfulStatusCode,
    );
  }
  if (
    err instanceof DrizzleQueryError &&
    err.cause &&
    'code' in err.cause &&
    err.cause.code === '23505'
  ) {
    const constraint = 'constraint' in err.cause ? err.cause.constraint : undefined;

    if (constraint === 'bikes_frame_number_key') {
      return c.json(
        parseErrorResponse('CONFLICT', 'The bike is already registered'),
        409,
      );
    }

    if (constraint === 'bike_address_bike_id_unique') {
      return c.json(
        parseErrorResponse(
          'CONFLICT',
          'This bike already has an address registered',
        ),
        409,
      );
    }
    return c.json(parseErrorResponse('CONFLICT', 'This record already exists'), 409);
  }

  return c.json(
    parseErrorResponse('INTERNAL_SERVER_ERROR', 'Internal server error!'),
    500,
  );
}
