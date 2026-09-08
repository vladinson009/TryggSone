import type { ContentfulStatusCode } from 'hono/utils/http-status';

type Code = 'SESSION_NOT_FOUND' | 'UNAUTHORIZED';

export const parseErrorResponse = (
  code: Code,
  status: ContentfulStatusCode,
  message: string,
) => {
  return {
    code,
    status,
    message,
  };
};
