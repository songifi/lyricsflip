export interface GameMode {
    id: string;
    name: string;
    description: string;
    rules: string[];
    maxPlayers: number;
    minPlayers: number;
    scoringStrategy: string;
    timeLimit?: number; // in seconds, optional for endless mode
    initialize(): void;
    startGame(players: string[]): string; // returns game session id
    endGame(gameSessionId: string): GameResult;
    calculateScore(gameSessionId: string, playerId: string): number;
  }