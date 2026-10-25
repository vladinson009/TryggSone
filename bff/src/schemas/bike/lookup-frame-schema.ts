import z from 'zod';
import { paginationQuerySchema } from '../pagination-query.js';

export type LookupFrameSchema = z.infer<typeof lookupFrameSchema>;

export const lookupFrameSchema = paginationQuerySchema.extend({
  frameNumber: z.string().min(4, 'frameNumber must be at least 4 characters long').nonempty(),
});
