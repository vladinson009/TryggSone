import z from 'zod';

export const loggerQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),

    // optional filters matching your table columns
    eventType: z.string().min(1).optional(),
    eventId: z.uuid().optional(),
    correlationId: z.string().min(1).optional(),

    // occurredAt range, e.g. ?from=2025-01-01&to=2025-01-31
    from: z.coerce.date().optional(),
    to: z.coerce.date().optional(),
  })
  .refine((q) => !q.from || !q.to || q.from <= q.to, {
    message: '`from` must be before `to`',
    path: ['from'],
  });
