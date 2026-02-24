export class SquadNotFoundError extends Error {
  constructor(
    message: string,
    public readonly params: { leagueId: number; entryId: number; eventId: number }
  ) {
    super(message);
    this.name = "SquadNotFoundError";
  }
}

export class InvalidSquadError extends Error {
  constructor(
    message: string,
    public readonly params: { leagueId: number; entryId: number; eventId: number }
  ) {
    super(message);
    this.name = "InvalidSquadError";
  }
}
