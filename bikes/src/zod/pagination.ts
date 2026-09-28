import z from 'zod';

export type PaginationParams = z.infer<typeof paginationSchema>;

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});
