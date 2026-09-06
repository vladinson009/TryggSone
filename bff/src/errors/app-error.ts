import type { ErrorStatus, ErrorCode } from '../types/custom-error.js';

export class AppError extends Error {
  constructor(
    public readonly code: ErrorCode,
    public readonly status: ErrorStatus,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}
