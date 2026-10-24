import { create } from 'zustand';

type ModalType =
  | 'game'
  | 'settings'
  | 'profile'
  | 'leaderboard'
  | 'wager'
  | 'wager-summary'
  | 'won'
  | 'lost'
  | null;

interface ModalState {
  isOpen: boolean;
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalType: null,
  openModal: (type) => set({ isOpen: true, modalType: type }),
  closeModal: () => set({ isOpen: false, modalType: null }),
}));
