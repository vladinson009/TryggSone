// schemas/bike-status-schemas.ts
import { z } from 'zod';

export const reportStolenSchema = z.object({
  policeReportNumber: z.string().trim().min(1),
  theftDate: z.coerce.date(),
  theftLocation: z.string().trim().min(1),
});

export const recoveredSchema = z.object({
  recoveryDate: z.coerce.date(),
  recoveryLocation: z.string().trim().min(1),
});

export const listForSaleSchema = z.object({
  price: z.number().positive(),
});

export type ReportStolenSchema = z.infer<typeof reportStolenSchema>;
export type ReportRecoveredSchema = z.infer<typeof recoveredSchema>;
export type ReportListForSaleSchema = z.infer<typeof listForSaleSchema>;
