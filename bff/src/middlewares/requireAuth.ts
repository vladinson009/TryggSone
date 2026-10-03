import { ServiceError } from '@tryggsone/common/errors';
import { createMiddleware } from 'hono/factory';
import { authClient } from '../clients/auth-client.js';
import type { AuthSession, AuthUser } from '@tryggsone/common/types';

type AuthVariables = {
  user: AuthUser;
  session: AuthSession;
};

export const requireAuth = createMiddleware<{ Variables: AuthVariables }>(async (c, next) => {
  const session = await authClient.getSession(c.req.raw);

  // Redundant ?
  if (!session) {
    throw new ServiceError('UNAUTHORIZED', 401, 'Unauthorized');
  }
  c.set('user', session.user);
  c.set('session', session.session);

  await next();
});
