export interface LeagueRefreshJobPayload {
  leagueId: number;
  eventId?: number;
  maxEntries?: number;
  force?: boolean;
}
