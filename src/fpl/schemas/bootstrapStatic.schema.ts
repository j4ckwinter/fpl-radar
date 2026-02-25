import { z } from "zod";

/** Team: only fields we use in v1. */
export const bootstrapTeamSchema = z.object({
  id: z.number(),
  name: z.string(),
  short_name: z.string(),
  code: z.number().optional(),
});

/** Player (element): only fields we use in v1. */
export const bootstrapElementSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  second_name: z.string(),
  web_name: z.string(),
  team: z.number(),
  element_type: z.number(),
  now_cost: z.number(),
  status: z.string(),
  news: z.string(),
  selected_by_percent: z.string(),
  transfers_in_event: z.number().optional(),
  transfers_out_event: z.number().optional(),
});

/** Position type (e.g. GKP, DEF, MID, FWD). */
export const bootstrapElementTypeSchema = z.object({
  id: z.number(),
  singular_name_short: z.string(),
});

/** Gameweek (event): only fields we use in v1. */
export const bootstrapEventSchema = z.object({
  id: z.number(),
  name: z.string(),
  deadline_time: z.string(),
  finished: z.boolean(),
  is_current: z.boolean(),
  is_next: z.boolean(),
});

/** Full bootstrap-static payload: teams, elements (players), element_types, events. */
export const bootstrapStaticSchema = z.object({
  teams: z.array(bootstrapTeamSchema),
  elements: z.array(bootstrapElementSchema),
  element_types: z.array(bootstrapElementTypeSchema),
  events: z.array(bootstrapEventSchema),
});

export type BootstrapTeam = z.output<typeof bootstrapTeamSchema>;
export type BootstrapElement = z.output<typeof bootstrapElementSchema>;
export type BootstrapElementType = z.output<typeof bootstrapElementTypeSchema>;
export type BootstrapEvent = z.output<typeof bootstrapEventSchema>;
export type BootstrapStatic = z.output<typeof bootstrapStaticSchema>;
