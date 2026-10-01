import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { AuthSession, AuthUser } from '../../types/auth-contract.js';

export type SessionResponse = { user: AuthUser; session: AuthSession };

export type ServiceErrorResponse = {
  code: string;
  status: ContentfulStatusCode;
  message: string;
};

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

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
export type BikesForSale = {
  id: string;
  ownerId: string;
  description: string | null;
  status: 'active' | 'for_sale' | 'stolen' | 'deleted';
  brand: string;
  model: string;
  isElectric: boolean;
  condition: string;
  price: number;
  updatedAt: Date;
  photo: string | null;
};
