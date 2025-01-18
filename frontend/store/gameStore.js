import { create } from "zustand";

const POINTS_PER_CORRECT = 10;
const REVIVE_COST = 5;

export const useGameStore = create((set, get) => ({
  // State
  points: 0,
  questionsCompleted: 0,
  currentQuestionIndex: 0,
  gameStatus: "idle",
  questions: [],
  loading: false,
  error: null,

  // Actions
  setPoints: (points) => set({ points }),
  addPoints: () =>
    set((state) => ({ points: state.points + POINTS_PER_CORRECT })),
  deductPoints: (amount) => set((state) => ({ points: state.points - amount })),
  setQuestions: (questions) => set({ questions }),
  setGameStatus: (status) => set({ gameStatus: status }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Get a random question index different from current
  getRandomQuestionIndex: () => {
    const state = get();
    const currentIndex = state.currentQuestionIndex;
    const questionsLength = state.questions.length;

    if (questionsLength <= 1) return 0;

    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * questionsLength);
    } while (newIndex === currentIndex);

    return newIndex;
  },

  // Set a random question
  setRandomQuestion: () => {
    const newIndex = get().getRandomQuestionIndex();
    set({ currentQuestionIndex: newIndex });
  },

  incrementQuestion: () =>
    set((state) => {
      // If we're at the end of questions, use random question
      if (state.currentQuestionIndex >= state.questions.length - 1) {
        const newIndex = state.getRandomQuestionIndex();
        return {
          currentQuestionIndex: newIndex,
          questionsCompleted: state.questionsCompleted + 1,
        };
      }

      return {
        currentQuestionIndex: state.currentQuestionIndex + 1,
        questionsCompleted: state.questionsCompleted + 1,
      };
    }),

  resetGame: () =>
    set((state) => ({
      points: 0,
      questionsCompleted: 0,
      currentQuestionIndex: state.getRandomQuestionIndex(),
      gameStatus: "playing",
    })),

  // Game actions

  handleSuccess: () => {
    const state = get();
    set({
      points: state.points + POINTS_PER_CORRECT,
      questionsCompleted: state.questionsCompleted + 1,
      gameStatus: "success",
    });

    // If at end of questions, get random question
    if (state.currentQuestionIndex >= state.questions.length - 1) {
      const newIndex = state.getRandomQuestionIndex();
      set({ currentQuestionIndex: newIndex });
    } else {
      set({ currentQuestionIndex: state.currentQuestionIndex + 1 });
    }
  },

  handleRevive: () => {
    const state = get();
    if (state.points >= REVIVE_COST) {
      const newIndex = state.getRandomQuestionIndex();
      set({
        points: state.points - REVIVE_COST,
        gameStatus: "playing",
        currentQuestionIndex: newIndex, // Set new random question
      });
      return true;
    }
    return false;
  },

  handleGameOver: () => set({ gameStatus: "finished" }),
}));
