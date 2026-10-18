export class CreateStateRecoveryDto {
  gameId: string;
  playerId: string;
  state: Record<string, unknown>;
}
