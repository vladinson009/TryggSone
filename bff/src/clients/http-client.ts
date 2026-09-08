import { ServiceError } from '../errors/app-error.js';
import type { ServiceErrorResponse } from './types/responses.js';

type Options = { body?: unknown; headers?: HeadersInit };
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const createHttpClient = (baseUrl: string) => {
  const fetcher = async <T>(
    method: Method,
    url: string,
    options: Options = {},
  ): Promise<T> => {
    const requestOptions: RequestInit = { method, headers: options.headers };

    if (options.body !== undefined) {
      requestOptions.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
      requestOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${baseUrl}${url}`, requestOptions);

    if (!response.ok) {
      const error: ServiceErrorResponse = await response.json();
      throw new ServiceError(error.code, error.status, error.message);
    }

    // if (response.status === 204) {
    //   return;
    // }

    return response.json();
  };

  return {
    get: <T>(url: string, options?: Options) => fetcher<T>('GET', url, options),
    post: <T>(url: string, options?: Options) => fetcher<T>('POST', url, options),
    put: <T>(url: string, options?: Options) => fetcher<T>('PUT', url, options),
    delete: (url: string, options?: Options) =>
      fetcher<void>('DELETE', url, options),
  };
};
