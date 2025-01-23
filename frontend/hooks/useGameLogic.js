import { useEffect } from "react";
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
    selectedDifficulty, // Access selectedDifficulty from the store
  } = useGameStore();

  const getRandomOptions = (correctAnswer, allSongs, count = 3) => {
    const otherSongs = allSongs.filter((song) => song !== correctAnswer);
    const shuffled = otherSongs.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!selectedDifficulty) {
        console.error("Difficulty not selected in fetchQuestions");
        setError("Difficulty not selected");
        return;
      }

      console.log("Fetching Questions for Difficulty:", selectedDifficulty);
      const geniusService = GeniusService.getInstance();
      const snippets = await geniusService.getRandomLyricSnippets(
        "",
        questionCount
      );

      console.log("Raw Snippets from GeniusService:", snippets);

      const filteredSnippets = snippets.filter(
        (snippet) => snippet.difficulty === selectedDifficulty
      );

      console.log("Filtered Snippets by Difficulty:", filteredSnippets);

      if (filteredSnippets.length === 0) {
        console.error("No questions available for the selected difficulty");
        setError("No questions available for the selected difficulty");
        return;
      }

      const allSongTitles = filteredSnippets.map(
        (snippet) => snippet.songTitle
      );

      const formattedQuestions = filteredSnippets.map((snippet) => {
        const otherOptions = getRandomOptions(snippet.songTitle, allSongTitles);
        return {
          lyricsSnippet: snippet.lyricsSnippet,
          correctAnswer: snippet.songTitle,
          difficulty: snippet.difficulty,
          options:
            snippet.difficulty === "Beginner"
              ? shuffleArray([snippet.songTitle, ...otherOptions])
              : [],
        };
      });

      console.log("Formatted Questions to Set in Store:", formattedQuestions);

      setQuestions(formattedQuestions); // Update the store with the questions
      setGameStatus("playing"); // Move setGameStatus here to ensure questions are fetched first
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError(err.message || "An error occurred while fetching questions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(
      "useEffect Triggered: Selected Difficulty:",
      selectedDifficulty
    );
    if (selectedDifficulty) {
      fetchQuestions();
    }
  }, [selectedDifficulty, questionCount]); // Trigger only when selectedDifficulty or questionCount changes

  return {
    questions,
    loading,
    error,
    refreshQuestions: fetchQuestions,
  };
}
