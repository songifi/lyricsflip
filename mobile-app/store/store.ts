import { create } from "zustand";

interface AppState {
  counter: number;
  increment: () => void;
  decrement: () => void;
  // Add more state and actions as needed
}

export const useAppStore = create<AppState>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
}));
