import { createHash } from 'node:crypto';
import { AppError } from '../errors/app-error.js';
import { redisClient } from './redis-client.js';
import { ErrorStatus } from '../types/custom-error.js';

import type { AuthSession, AuthUser } from '../types/auth-contract.js';
import { cachedSessionKey } from '../redis/keys.js';
import { env } from '../config/env.js';

type SessionResponse = Promise<{ user: AuthUser; session: AuthSession }>;

export const getSession = async (request: Request) => {
  const cookie = request.headers.get('cookie');

  if (!cookie) {
    return null;
  }

  const hashedCookie = createHash('sha256').update(cookie).digest('hex');
  const cacheKey = cachedSessionKey(hashedCookie);

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      console.log('CACHED COOKIE');
      return JSON.parse(cached) as SessionResponse;
    }
  } catch (error) {
    console.error('Redis GET failed:', error);
  }

  const response = await fetch(`${env.AUTH_SERVICE_URL}/internal/session`, {
    headers: {
      cookie,
    },
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new AppError(
      'AUTH_SERVICE_ERROR',
      ErrorStatus.BadRequest,
      `Auth service returned ${response.status}`,
    );
  }
  console.log('Auth SRV cookie');

  const session = (await response.json()) as SessionResponse;
  try {
    const expiresAt = new Date((await session).session.expiresAt).getTime();
    // const ttl = Math.max(1, Math.floor((expiresAt - Date.now()) / 1000));

    // TODO: Invalidate Session on Logout wit Pub/Sub pattern

    await redisClient.set(cacheKey, JSON.stringify(session), {
      expiration: { type: 'EX', value: 60 },
    });
  } catch (error) {
    console.error('Redis SET failed:', error);
  }

  return session;
};
