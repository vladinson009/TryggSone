import { createMiddleware } from 'hono/factory';
import { xUserId } from '../config/constants.js';
import { ServiceError } from '@tryggsone/common/errors';

type Env = {
  Variables: {
    ownerId: string;
  };
};

export const requireOwnerId = createMiddleware<Env>(async (c, next) => {
  const ownerId = c.req.header(xUserId);

  if (!ownerId) {
    throw new ServiceError('UNAUTHORIZED', 401, 'Missing user identity');
  }

  c.set('ownerId', ownerId);
  await next();
});
