type Code = 'SESSION_NOT_FOUND' | 'UNAUTHORIZED';

export const parseErrorResponse = (code: Code, message: string) => {
  return {
    code,
    message,
  };
};
