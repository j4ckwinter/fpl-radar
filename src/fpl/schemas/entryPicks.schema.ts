import { z } from "zod";

/** Single pick: element id, squad position (1–15), multiplier, captain flags. */
export const entryPickSchema = z.object({
  element: z.number(),
  position: z.number(),
  multiplier: z.number(),
  is_captain: z.boolean(),
  is_vice_captain: z.boolean(),
});

/** entry_history: bank, team value, transfers this GW (all optional in API). */
export const entryHistorySchema = z
  .object({
    bank: z.number().optional(),
    value: z.number().optional(),
    event_transfers: z.number().optional(),
    event_transfers_cost: z.number().optional(),
  })
  .optional();

/** Response from GET /api/entry/{entryId}/event/{eventId}/picks/ */
export const entryPicksResponseSchema = z.object({
  picks: z.array(entryPickSchema),
  entry_history: entryHistorySchema,
});

export type EntryPick = z.output<typeof entryPickSchema>;
export type EntryHistory = z.output<typeof entryHistorySchema>;
export type EntryPicksResponse = z.output<typeof entryPicksResponseSchema>;
