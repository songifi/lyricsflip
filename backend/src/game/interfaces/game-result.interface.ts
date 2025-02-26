export interface GameResult {
    gameSessionId: string;
    gameMode: string;
    startTime: Date;
    endTime: Date;
    players: Array<{
      id: string;
      score: number;
      rank: number;
    }>;
    winner: string;
  }