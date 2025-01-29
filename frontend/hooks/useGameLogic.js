// useGameLogic.js
import { useEffect, useCallback } from "react";
import { useGameStore } from "../store/gameStore";
import GeniusService from "../services/geniusService";

export function useGameLogic(questionCount = 10) {
  const { setQuestions, selectedDifficulty, gameStatus, initializeGame } =
    useGameStore();

  const fetchQuestions = useCallback(async () => {
    try {
      if (!selectedDifficulty) return;

      const geniusService = GeniusService.getInstance();
      const snippets = await geniusService.getRandomLyricSnippets(
        "",
        questionCount
      );

      const filtered = snippets.filter(
        (s) => s.difficulty === selectedDifficulty
      );

      if (filtered.length === 0) {
        throw new Error("No questions for selected difficulty");
      }

      const formatted = filtered.map((snippet) => ({
        lyricsSnippet: snippet.lyricsSnippet,
        correctAnswer: snippet.songTitle,
        difficulty: snippet.difficulty,
        options:
          snippet.difficulty === "Beginner"
            ? shuffle([...snippet.options, snippet.songTitle])
            : [],
      }));

      setQuestions(formatted);
    } catch (error) {
      console.error("Question fetch failed:", error);
    }
  }, [selectedDifficulty, questionCount, setQuestions]);

  // Initial question fetch
  useEffect(() => {
    if (selectedDifficulty) {
      fetchQuestions();
    }
  }, [selectedDifficulty, fetchQuestions]);

  // Auto-start game when questions are loaded
  useEffect(() => {
    if (gameStatus === "idle" && selectedDifficulty) {
      initializeGame();
    }
  }, [gameStatus, selectedDifficulty, initializeGame]);

  return { refreshQuestions: fetchQuestions };
}

// Utility function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
