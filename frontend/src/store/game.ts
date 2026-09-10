import { create } from 'zustand';

interface GameState {
  score: number;
  timeLeft: number;
  potentialWin: number;
  currentRound: number;
  maxRounds: number;
  gameStatus: 'idle' | 'playing' | 'ended';
  gameConfig: {
    genre: string;
    difficulty: string;
    duration: string;
    odds: number;
    wagerAmount: number;
  };
  lastGuessResult: 'correct' | 'incorrect' | null;
  roundId: bigint | null;
  increaseScore: () => void;
  setGuessResult: (result: GameState['lastGuessResult']) => void;
  decreaseTime: () => void;
  resetGame: () => void;
  startGame: (config: GameState['gameConfig']) => void;
  endGame: () => void;
  setGameStatus: (status: GameState['gameStatus']) => void;
  setRoundId: (roundId: bigint) => void;
}

export const useGameStore = create<GameState>((set) => ({
  score: 0,
  timeLeft: 300,
  potentialWin: 0,
  currentRound: 0,
  maxRounds: 5,
  gameStatus: 'idle',
  gameConfig: {
    genre: '',
    difficulty: '',
    duration: '',
    odds: 0,
    wagerAmount: 0,
  },
  lastGuessResult: null,
  roundId: null,

  increaseScore: () =>
    set((state) => ({
      score: state.score + 1,
      currentRound: state.currentRound + 1,
      lastGuessResult: 'correct',
    })),

  setGuessResult: (result) => set({ lastGuessResult: result }),

  decreaseTime: () =>
    set((state) => ({
      timeLeft: Math.max(0, state.timeLeft - 1),
    })),

  resetGame: () =>
    set({
      score: 0,
      timeLeft: 300,
      potentialWin: 0,
      currentRound: 0,
      lastGuessResult: null,
      roundId: null,
      gameStatus: 'idle',
      gameConfig: {
        genre: '',
        difficulty: '',
        duration: '',
        odds: 0,
        wagerAmount: 0,
      },
    }),

  startGame: (config) =>
    set({
      potentialWin: config.wagerAmount * config.odds,
      timeLeft:
        config.duration === '5 mins'
          ? 300
          : config.duration === '10 mins'
            ? 600
            : 900,
      score: 0,
      currentRound: 0,
      lastGuessResult: null,
      roundId: null,
      gameStatus: 'playing',
      gameConfig: config,
    }),

  endGame: () => set({ gameStatus: 'ended' }),

  setGameStatus: (status) => set({ gameStatus: status }),

  setRoundId: (roundId) => set({ roundId }),
}));

// Export startGameTimer as a separate function
let timer: NodeJS.Timeout | null = null;
export const startGameTimer = () => {
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    useGameStore.getState().decreaseTime();
  }, 1000);
};

// Stop the timer when needed (e.g., on game end)
export const stopGameTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};