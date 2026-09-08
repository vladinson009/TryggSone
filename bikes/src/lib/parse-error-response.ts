type Code = 'INTERNAL_SERVER_ERROR' | 'CONFLICT' | (string & {});

export const parseErrorResponse = (code: Code, message: string) => {
  return {
    code,
    message,
  };
};
