export interface InPoolPlayer {
  playerId: number;
  teamId: number;
  positionId: number;
  nowCost: number;
  selectedByPercent: number | null;
  status: string;
}

export interface BuildInPoolByPositionParams {
  ownedPlayerIds: Set<number>;
  positionIds: number[];
  perPositionLimit?: number;
}

export interface BuildInPoolByPositionResult {
  inPoolByPosition: Map<number, InPoolPlayer[]>;
  sizeByPositionBeforeLimit: Record<number, number>;
}
