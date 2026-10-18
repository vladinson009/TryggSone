import z from 'zod';
import { PaginationQuerySchema } from '../pagination-query.js';

export type LookupFrameSchema = z.infer<typeof lookupFrameSchema>;

export const lookupFrameSchema = PaginationQuerySchema.extend({
  frameNumber: z.string().min(4, 'frameNumber must be at least 4 characters long').nonempty(),
});
