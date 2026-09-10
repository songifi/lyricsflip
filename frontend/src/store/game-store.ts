import { create } from 'zustand';

interface GameState {
  roundId: bigint | null;
  setRoundId: (roundId: bigint) => void;
}

export const useGameStore = create<GameState>((set) => ({
  roundId: null,
  setRoundId: (roundId) => set({ roundId }),
}));
