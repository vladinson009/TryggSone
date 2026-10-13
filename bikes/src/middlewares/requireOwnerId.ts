import { createMiddleware } from 'hono/factory';
import { UnauthorizedError } from '@tryggsone/common/errors';
import { HEADER_CONST } from '@tryggsone/common/configs';

type Env = {
  Variables: {
    ownerId: string;
  };
};

export const requireOwnerId = createMiddleware<Env>(async (c, next) => {
  const ownerId = c.req.header(HEADER_CONST.xUserId);

  if (!ownerId) {
    throw new UnauthorizedError('Missing user identity');
  }

  c.set('ownerId', ownerId);
  await next();
});
