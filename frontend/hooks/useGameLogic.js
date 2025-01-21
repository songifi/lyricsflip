import { useState, useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import GeniusService from "../services/geniusService";

export function useGameLogic(questionCount) {
  const {
    setQuestions,
    setLoading,
    setError,
    questions,
    loading,
    error,
    setGameStatus,
  } = useGameStore();

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const geniusService = GeniusService.getInstance();
      const snippets = await geniusService.getRandomLyricSnippets(
        "",
        questionCount
      );

      const formattedQuestions = snippets.map((snippet) => ({
        lyricsSnippet: snippet.lyricsSnippet,
        correctAnswer: snippet.songTitle,
      }));

      console.log("Setting questions:", formattedQuestions);
      setQuestions(formattedQuestions);
      setGameStatus("idle"); // Ensure we start in idle state
    } catch (err) {
      setError(err.message || "An error occurred while fetching questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [questionCount]);

  return {
    questions,
    loading,
    error,
    refreshQuestions: fetchQuestions,
  };
}
