import z from 'zod';

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.string().default('id'),
  sortDir: z.enum(['asc', 'desc']).default('asc'),
});
