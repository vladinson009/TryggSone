import z from 'zod';
import { paginationSchema } from './pagination.js';

export type LookupBikeParams = z.infer<typeof lookupBikeSchema>;

export const lookupBikeSchema = paginationSchema.extend({
  frameNumber: z.string().min(4, 'frameNumber must be at least 4 characters long').nonempty(),
});
