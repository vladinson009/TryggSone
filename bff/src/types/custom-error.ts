export enum ErrorStatus {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Conflict = 409,
  UnprocessableEntity = 422,
}
export type ErrorCode =
  | 'VALIDATION_ERROR'
  | 'UNAUTHORIZED'
  | 'FORBIDDEN'
  | 'BIKE_NOT_FOUND'
  | 'BIKE_ALREADY_EXISTS'
  | 'USER_NOT_FOUND'
  | 'AUTH_SERVICE_ERROR'
  | 'INTERNAL_SERVER_ERROR';
