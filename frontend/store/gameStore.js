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
  guess: "",
  selectedDifficulty: "",

  // Basic setters
  setPoints: (points) => set({ points }),
  setQuestions: (questions) => {
    console.log("Questions being set in Store:", questions);
    set({
      questions,
      currentQuestionIndex: 0, // Reset index to the first question
    });
  },
  setGameStatus: (status) => set({ gameStatus: status }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setGuess: (guess) => set({ guess }),
  setSelectedDifficulty: (difficulty) => {
    console.log("setSelectedDifficulty Called: ", difficulty); // Log the value being set
    set({ selectedDifficulty: difficulty });
  },

  // Question management
  getCurrentQuestion: () => {
    const state = get();

    // Ensure questions are available
    if (state.questions.length === 0) {
      console.warn("No questions available");
      return null;
    }

    // Ensure index stays within bounds
    const safeIndex = Math.min(
      state.currentQuestionIndex,
      state.questions.length - 1
    );
    if (state.currentQuestionIndex !== safeIndex) {
      set({ currentQuestionIndex: safeIndex });
    }

    return state.questions[safeIndex];
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
        guess: "",
      });
      return true;
    } else {
      set({ gameStatus: "failed", guess: "" });
      return false;
    }
  },

  // gameStore.js - Update handleNextQuestion:
  handleNextQuestion: () => {
    const state = get();

    // Always reset gameStatus to playing first
    set({ gameStatus: "playing" });

    // Then check if we need to load new questions
    if (state.currentQuestionIndex + 1 >= state.questions.length) {
      console.log("Loading more questions...");
      // Trigger question reload here if needed
    }

    // Proceed to next question
    set({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      questionsCompleted: state.questionsCompleted + 1,
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
      guess: "",
      selectedDifficulty: "",
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
