import type { ContentfulStatusCode } from 'hono/utils/http-status';

export abstract class CustomError extends Error {
  abstract readonly code: string;
  abstract readonly status: ContentfulStatusCode;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ServiceError extends CustomError {
  constructor(
    public readonly code: string,
    public readonly status: ContentfulStatusCode,
    message: string,
  ) {
    super(message);
  }
}
