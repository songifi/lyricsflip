// gameStore.js
import GeniusService from "@/services/geniusService";
import { create } from "zustand";

const POINTS_PER_CORRECT = 10;
const DIFFICULTY_DURATIONS = {
  Beginner: 300,
  Intermediate: 180,
  Advanced: 120,
};

export const useGameStore = create((set, get) => ({
  // Core Game State
  gameStatus: "idle",
  selectedDifficulty: "",
  currentQuestionIndex: -1, // Start at -1 to clearly show it's not set
  username: "",
  points: 0,
  timeLeft: 0,
  questions: [],
  // Derived State

  setUsername: (username) => set({ username }),
  setDifficulty: (difficulty) => {
    // console.log("STORE: Setting difficulty to", difficulty);
    set({ selectedDifficulty: difficulty });
  },

  getCurrentQuestion: () => {
    const { questions, currentQuestionIndex } = get();
    // console.log(
    //   "STORE: Getting current question - Total questions:",
    //   questions.length
    // );
    // console.log(
    //   "STORE: Getting current question - Current index:",
    //   currentQuestionIndex
    // );

    if (questions.length === 0 || currentQuestionIndex === -1) {
      // console.error("STORE: No questions available or index not set");
      return null;
    }

    const currentQuestion = questions[currentQuestionIndex];
    // console.log("STORE: Returning current question:", currentQuestion);
    return currentQuestion;
  },
  // Game Actions
  initializeGame: () => {
    const state = get();
    // console.log("STORE: Initializing game", {
    //   difficulty: state.selectedDifficulty,
    //   questions: state.questions,
    // });

    if (!state.selectedDifficulty || state.questions.length === 0) {
      // console.error(
      //   "STORE: Cannot initialize game - missing difficulty or questions"
      // );
      return;
    }

    set({
      gameStatus: "playing",
      currentQuestionIndex: 0, // Explicitly set to first question
      points: 0,
      timeLeft: DIFFICULTY_DURATIONS[state.selectedDifficulty],
    });

    get().startTimer(); // Start the timer when the game starts

    // console.log(
    //   "STORE: Game initialized with first question index:",
    //   get().currentQuestionIndex
    // );
  },

  advanceQuestion: () => {
    const { currentQuestionIndex, questions } = get();
    const nextIndex = currentQuestionIndex + 1;

    // console.log("STORE: Advancing Question", {
    //   currentIndex: currentQuestionIndex,
    //   nextIndex,
    //   totalQuestions: questions.length,
    // });

    if (nextIndex < questions.length) {
      set({
        currentQuestionIndex: nextIndex,
        gameStatus: "playing", // Reset game status when moving to next question
      });
    } else {
      get().endGame();
    }
  },

  handleAnswer: (isCorrect) => {
    // console.log("STORE: Handle Answer - Is Correct:", isCorrect);

    set((state) => ({
      points: isCorrect ? state.points + POINTS_PER_CORRECT : state.points,
      gameStatus: isCorrect ? "success" : "failed",
    }));

    // Optional: Add a delay before moving to next question
    // if (isCorrect) {
    //   setTimeout(() => {
    //     get().advanceQuestion();
    //   }, 1000); // 1 second delay
    // }
  },
  // Timer Management
  timerId: null,
  startTimer: () => {
    get().stopTimer(); // Clear any existing timer
    const timerId = setInterval(() => {
      set((state) => {
        if (state.timeLeft > 0) {
          return { timeLeft: state.timeLeft - 1 };
        } else {
          get().endGame(); // End the game when time runs out
          return {};
        }
      });
    }, 1000); // Update time every second
    set({ timerId });
  },

  stopTimer: () => {
    clearInterval(get().timerId);
    set({ timerId: null });
  },

  endGame: () => {
    get().stopTimer();
    set({ gameStatus: "finished" });
  },

  // State Setters
  setQuestions: (questions) => {
    // console.log("STORE: Setting questions", questions);
    set({
      questions,
      currentQuestionIndex: 0, // Explicitly set to first question
    });
    // console.log(
    //   "STORE: Current question index after setting",
    //   get().currentQuestionIndex
    // );
  },

  setDifficulty: (difficulty) => set({ selectedDifficulty: difficulty }),
  resetGame: () =>
    set({
      gameStatus: "idle",
      selectedDifficulty: "",
      username: "",
      currentQuestionIndex: -1,
      points: 0,
      questions: [],
    }),

  setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
  
  handleStartGame: async () => {
    const { selectedDifficulty, username, setQuestions, initializeGame } = get();
    
    if (!selectedDifficulty || !username) return;

    set({ isLoading: true, error: null });

    try {
      const geniusService = GeniusService.getInstance();
      const snippets = await geniusService.getRandomLyricSnippets("", 20);
      const filtered = snippets.filter(
        (s) => s.difficulty === selectedDifficulty
      );

      if (filtered.length === 0) {
        throw new Error("No questions available for selected difficulty");
      }

      const formatted = filtered.map((snippet) => {
        const correctOption = `${snippet.songTitle} - ${snippet.artist}`;
        const otherSongChoices = filtered
          .filter((s) => s.songTitle !== snippet.songTitle)
          .map((s) => `${s.songTitle} - ${s.artist}`);

        const additionalOptions = [];
        while (additionalOptions.length < 3 && otherSongChoices.length > 0) {
          const randomIndex = Math.floor(Math.random() * otherSongChoices.length);
          const randomChoice = otherSongChoices.splice(randomIndex, 1)[0];
          additionalOptions.push(randomChoice);
        }

        const options = [correctOption, ...additionalOptions];
        const shuffledOptions = options.sort(() => 0.5 - Math.random());

        return {
          lyricsSnippet: snippet.lyricsSnippet,
          correctAnswer: correctOption,
          songTitle: snippet.songTitle, 
          artist: snippet.artist, 
          difficulty: snippet.difficulty,
          options: selectedDifficulty === "Beginner" ? shuffledOptions : [],
        };
      });

      setQuestions(formatted);
      initializeGame();
    } catch (err) {
      // console.error("Game initialization failed:", err);
      set({ error: err.message || "Failed to start game. Please try again." });
    } finally {
      set({ isLoading: false, isModalOpen: false });
    }
  },

}));
