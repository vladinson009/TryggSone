import { createMiddleware } from 'hono/factory';
import { authClient } from '../clients/auth-client.js';
import { AppError } from '../errors/app-error.js';
import { ErrorStatus } from '../types/custom-error.js';

import type { AuthSession, AuthUser } from '../types/auth-contract.js';

type AuthVariables = {
  user: AuthUser;
  session: AuthSession;
};

export const requireAuth = createMiddleware<{ Variables: AuthVariables }>(
  async (c, next) => {
    const session = await authClient.getSession(c.req.raw);

    // Redundant ?
    if (!session) {
      throw new AppError('UNAUTHORIZED', ErrorStatus.Unauthorized, 'Unauthorized');
    }
    c.set('user', session.user);
    c.set('session', session.session);

    await next();
  },
);
