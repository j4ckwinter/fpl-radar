export interface LoadSquadStateParams {
  leagueId: number;
  entryId: number;
  eventId: number;
}

export interface PlayerRow {
  id: number;
  teamId: number;
  positionId: number;
  nowCost: number;
}
