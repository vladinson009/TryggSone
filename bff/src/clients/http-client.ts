import { ServiceError } from '@tryggsone/common/errors';
type ServiceErrorResponse = {
  code: string;
  status: number;
  message: string;
};

type Options = { body?: unknown; headers?: HeadersInit };
type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export const createHttpClient = (baseUrl: string) => {
  const fetcher = async <T>(method: Method, url: string, options: Options = {}): Promise<T> => {
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
      throw new ServiceError(error.code, response.status, error.message);
    }
    //TODO: Handle empty response
    // if (response.status === 204) {
    //   return;
    // }
    return response.json();
  };

  return {
    get: <T>(url: string, options?: Options) => fetcher<T>('GET', url, options),
    post: <T>(url: string, options?: Options) => fetcher<T>('POST', url, options),
    put: <T>(url: string, options?: Options) => fetcher<T>('PUT', url, options),
    patch: <T>(url: string, options?: Options) => fetcher<T>('PATCH', url, options),
    delete: <T>(url: string, options?: Options) => fetcher<T>('DELETE', url, options),
  };
};
