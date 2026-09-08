import type { $ZodIssue } from 'zod/v4/core';

type Code = 'VALIDATION_ERROR' | 'INTERNAL_SERVER_ERROR' | (string & {});

export const parseErrorResponse = (
  code: Code,
  message: string,
  issues?: $ZodIssue[],
) => {
  return {
    error: {
      code,
      message,
      issues,
    },
  };
};
