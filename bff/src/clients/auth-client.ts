import { createHash } from 'node:crypto';
import { redisClient } from './redis-client.js';

import { cachedSessionKey } from '../redis/keys.js';
import { env } from '../config/env.js';
import { createHttpClient } from './http-client.js';
import { UnauthorizedError } from '@tryggsone/common/errors';
import type { SessionResponse } from '@tryggsone/common/types';

const createAuthClient = (baseUrl: string) => {
  const httpClient = createHttpClient(baseUrl);

  return {
    getSession: async (request: Request): Promise<SessionResponse | null> => {
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

      const session = await httpClient.get<SessionResponse | null>('/api/auth/get-session', {
        headers: {
          cookie,
        },
      });
      if (!session) {
        throw new UnauthorizedError('No active session');
      }
      console.log('Auth SRV cookie');

      try {
        // const expiresAt = new Date(session?.session?.expiresAt).getTime();
        // const ttl = Math.max(1, Math.floor((expiresAt - Date.now()) / 1000));

        // TODO: Invalidate Session on Logout wit Pub/Sub pattern

        await redisClient.set(cacheKey, JSON.stringify(session), {
          expiration: { type: 'EX', value: 60 },
        });
      } catch (error) {
        console.error('Redis SET failed:', error);
      }

      return session;
    },
  };
};

export const authClient = createAuthClient(env.AUTH_SERVICE_URL);
