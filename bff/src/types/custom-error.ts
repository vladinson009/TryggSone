export enum ErrorStatus {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
  InternalServerError = 500,
  BadGateway = 502,
  ServiceUnavailable = 503,
}
export type AppErrorCode =
  | 'BIKE_ALREADY_EXISTS'
  | 'BIKE_NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'USER_NOT_FOUND';
