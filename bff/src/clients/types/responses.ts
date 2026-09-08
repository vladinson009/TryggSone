import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { AuthSession, AuthUser } from '../../types/auth-contract.js';

export type SessionResponse = { user: AuthUser; session: AuthSession };

export type ServiceErrorResponse = {
  code: string;
  status: ContentfulStatusCode;
  message: string;
};

export type BikeResponse = {
  id: string;
  ownerId: string;
  frameNumber: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  type: string;
  frameSize: string | null;
  wheelSize: string | null;
  weight: number | null;
  isElectric: boolean;
  motorBrand: string | null;
  motorPower: number | null;
  batteryCapacity: number | null;
  condition: string;
  price: number;
  currency: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  isApproved: boolean;
};
