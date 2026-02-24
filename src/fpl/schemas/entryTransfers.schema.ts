import { z } from "zod";

/** Single transfer record from GET /api/entry/{entryId}/transfers/ */
export const entryTransferItemSchema = z.object({
  element_in: z.number(),
  element_out: z.number(),
  event: z.number(),
  time: z.string(),
  value: z.number().optional(),
  bank: z.number().optional(),
  cost: z.number().optional(),
});

/** Response is an array of transfer records. */
export const entryTransfersResponseSchema = z.array(entryTransferItemSchema);

export type EntryTransferItem = z.output<typeof entryTransferItemSchema>;
export type EntryTransfersResponse = z.output<typeof entryTransfersResponseSchema>;
