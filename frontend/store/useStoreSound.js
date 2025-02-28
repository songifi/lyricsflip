import { create } from "zustand";

export const useSoundStore = create((set) => ({
  isPlaying: false,
  play: null,
  stop: null,

  setSound: (play, stop) => set({ play, stop }),

  playBackground: () =>
    set((state) => {
      if (state.play) {
        state.play();
        return { isPlaying: true };
      }
      return {};
    }),

  stopBackground: () =>
    set((state) => {
      if (state.stop) {
        state.stop();
        return { isPlaying: false };
      }
      return {};
    }),
}));
