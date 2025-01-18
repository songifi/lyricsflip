import { useState, useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import GeniusService from "../services/geniusService";

export function useGameLogic(questionCount = 10) {
  const { setQuestions, setLoading, setError, questions, loading, error } =
    useGameStore();

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      const geniusService = GeniusService.getInstance();
      const snippets = await geniusService.getRandomLyricSnippets(
        "",
        questionCount
      );

      setQuestions(
        snippets.map((snippet) => ({
          lyricsSnippet: snippet.lyricsSnippet,
          correctAnswer: snippet.songTitle,
        }))
      );
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
