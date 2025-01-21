import { create } from "zustand";

const POINTS_PER_CORRECT = 10;
const REVIVE_COST = 5;
const INITIAL_TIME = 15;

export const useGameStore = create((set, get) => ({
  // State
  points: 0,
  questionsCompleted: 0,
  currentQuestionIndex: 0,
  gameStatus: "idle",
  questions: [],
  loading: false,
  error: null,

  // Basic setters
  setPoints: (points) => set({ points }),
  setQuestions: (questions) => set({ questions }),
  setGameStatus: (status) => set({ gameStatus: status }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Question management
  getCurrentQuestion: () => {
    const state = get();
    return state.questions[state.currentQuestionIndex] || null;
  },

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

  setRandomQuestion: () => {
    const newIndex = get().getRandomQuestionIndex();
    set({ currentQuestionIndex: newIndex });
  },

  // Game actions
  handleTimeout: () => {
    set({ gameStatus: "failed" });
  },

  handleSubmitGuess: (guess, currentAnswer) => {
    const state = get();
    if (state.gameStatus !== "playing") return false;

    const isCorrect =
      guess.toLowerCase().trim() === currentAnswer.toLowerCase().trim();

    if (isCorrect) {
      set({
        points: state.points + POINTS_PER_CORRECT,
        questionsCompleted: state.questionsCompleted + 1,
        gameStatus: "success",
      });
      return true;
    } else {
      set({ gameStatus: "failed" });
      return false;
    }
  },

  handleNextQuestion: () => {
    const state = get();
    let newIndex;

    if (state.currentQuestionIndex >= state.questions.length - 1) {
      newIndex = state.getRandomQuestionIndex();
    } else {
      newIndex = state.currentQuestionIndex + 1;
    }

    set({
      currentQuestionIndex: newIndex,
      gameStatus: "playing",
    });
  },

  resetGame: () => {
    const state = get();
    const newIndex = state.getRandomQuestionIndex();
    set({
      points: 0,
      questionsCompleted: 0,
      currentQuestionIndex: newIndex,
      gameStatus: "playing",
    });
  },

  handleSuccess: () => {
    const state = get();

    set({
      points: state.points + POINTS_PER_CORRECT,
      questionsCompleted: state.questionsCompleted + 1,
      gameStatus: "success",
      currentQuestionIndex: newIndex,
    });
  },

  handleRevive: () => {
    const state = get();
    if (state.points >= REVIVE_COST) {
      const newIndex = state.getRandomQuestionIndex();
      set({
        points: state.points - REVIVE_COST,
        gameStatus: "playing",
        currentQuestionIndex: newIndex,
      });
      return true;
    }
    return false;
  },
}));
