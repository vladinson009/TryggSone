import { toQueryString } from '@tryggsone/common/libs';
import { env } from '../config/env.js';
import { createHttpClient } from './http-client.js';
import type { PaginatedResult } from '@tryggsone/common/types';
//TODO: Add type Logs from common package
const createLoggerClient = (baseUrl: string) => {
  const httpClient = createHttpClient(baseUrl);
  return {
    queryLogs: (query: Record<string, string>) =>
      httpClient.get<PaginatedResult<{}>>('/' + toQueryString(query)),
  };
};

export const loggerClient = createLoggerClient(env.LOGGER_SERVICE_URL);
