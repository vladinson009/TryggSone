import { createMiddleware } from 'hono/factory';
import { ServiceError } from '@tryggsone/common/errors';
import { headers } from '@tryggsone/common/configs';

type Env = {
  Variables: {
    ownerId: string;
  };
};

export const requireOwnerId = createMiddleware<Env>(async (c, next) => {
  const ownerId = c.req.header(headers.xUserId);

  if (!ownerId) {
    throw new ServiceError('UNAUTHORIZED', 401, 'Missing user identity');
  }

  c.set('ownerId', ownerId);
  await next();
});
