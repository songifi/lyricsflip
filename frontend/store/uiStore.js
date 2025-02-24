import { create } from "zustand";

export const useUIStore = create((set) => ({
  mobileMenuOpen: false,
  connectModalIsOpen: false,
  isModalOpen: false,
  isLoading: false,
  error: null,

  setMobileMenuOpen: (value) => set({ mobileMenuOpen: value }),
  setConnectModalIsOpen: (value) => set({ connectModalIsOpen: value }),
  setIsModalOpen: (value) => set({ isModalOpen: value }),
  setIsLoading: (value) => set({ isLoading: value }),
  setError: (value) => set({ error: value }),
}));
