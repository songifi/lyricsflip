import { useState, useEffect } from "react";
import GeniusService from "../services/geniusService";

export function useGameData(questionCount = 10) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch random song snippets from GeniusService
      const geniusService = GeniusService.getInstance();
      const snippets = await geniusService.getRandomLyricSnippets(
        "",
        questionCount
      );

      // data structure needed by the game
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
    // console.log(lyricsSnippet);
  }, [questionCount]);

  return {
    questions,
    loading,
    error,
    refreshQuestions: fetchQuestions,
  };
}
