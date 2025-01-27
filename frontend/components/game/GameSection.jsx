"use client";
import { useState, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import GameCard from "./GameCard";
import DifficultySelect from "./DifficultySelect";
import GeniusService from "@/services/geniusService";
import GameCompletion from "./GameCompletion";

const Game = () => {
  const {
    gameStatus,
    selectedDifficulty,
    timeLeft,
    points,
    getCurrentQuestion, // Use the new method
    initializeGame,
    setDifficulty,
    resetGame,
    questions,
    setQuestions,
    stopTimer,
  } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("Selected Difficulty:", selectedDifficulty);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    return () => {
      stopTimer(); // Stop the timer on component unmount
    };
  }, [stopTimer]);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleStartGame = async () => {
    if (!selectedDifficulty) return;

    setIsLoading(true);
    setError(null);

    try {
      const geniusService = GeniusService.getInstance();

      // Fetch more snippets than needed to ensure variety
      const snippets = await geniusService.getRandomLyricSnippets("", 20);

      // Filter by difficulty
      const filtered = snippets.filter(
        (s) => s.difficulty === selectedDifficulty
      );

      if (filtered.length === 0) {
        throw new Error("No questions available for selected difficulty");
      }

      const formatted = filtered.map((snippet) => {
        // Create an option that combines song title and artist
        const correctOption = `${snippet.songTitle} - ${snippet.artist}`;

        // For Beginner difficulty, prepare multiple-choice options
        const otherSongChoices = filtered
          .filter((s) => s.songTitle !== snippet.songTitle)
          .map((s) => `${s.songTitle} - ${s.artist}`);

        // Randomly select up to 3 additional unique song choices
        const additionalOptions = [];
        while (additionalOptions.length < 3 && otherSongChoices.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * otherSongChoices.length
          );
          const randomChoice = otherSongChoices.splice(randomIndex, 1)[0];
          additionalOptions.push(randomChoice);
        }

        // Create options: correct answer + 3 random alternatives
        const options = [correctOption, ...additionalOptions];

        // Shuffle the options
        const shuffledOptions = options.sort(() => 0.5 - Math.random());

        return {
          lyricsSnippet: snippet.lyricsSnippet,
          correctAnswer: correctOption, // Now includes artist
          difficulty: snippet.difficulty,
          options: selectedDifficulty === "Beginner" ? shuffledOptions : [],
        };
      });

      console.log("Formatted Questions:", formatted);
      setQuestions(formatted);

      initializeGame();
    } catch (err) {
      console.error("Game initialization failed:", err);
      setError(err.message || "Failed to start game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen">
      {/* Start Screen */}
      {gameStatus === "idle" && (
        <div className="h-full flex items-center justify-center bg-[#F5F5F5]">
          <div className="flex flex-col items-center space-y-6">
            <h1 className="text-[4xl] font-bold text-[#490878]">Thetimleyin</h1>

            {error && (
              <div className="text-red-600 bg-red-100 p-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="flex flex-col items-center space-y-4">
              <DifficultySelect />

              <button
                onClick={handleStartGame}
                disabled={!selectedDifficulty || isLoading}
                className="px-8 py-4 text-[#490878] bg-[#92f2da] rounded-xl text-xl font-bold 
                  hover:shadow-2xl transition-all duration-200 disabled:opacity-50
                  relative min-w-[200px]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#490878]"></span>
                    Loading...
                  </span>
                ) : (
                  "Start Game"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game Overlay - Fixed CSS classes */}
      {gameStatus !== "idle" && (
        <div className="fixed inset-0 h-[95%]  z-50 my-auto rounded-[12px] flex flex-col p-3">
          {/* Game Header */}
          {gameStatus === "playing" && (
            <div className="bg-[#F5F5F5] mx-auto w-full max-w-4xl p-2 flex justify-between items-center rounded-t-[12px] shadow-md">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white border border-[#DBE1E7] p-2 rounded-[1000px] pr-[12px]">
                  <h1 className="text-[16px] font-bold text-[#090909]">
                    Thetimleyin
                  </h1>
                </div>
                <div className="flex items-center">
                  <div className="text-[16px] text-[#490878]">
                    Difficulty: {selectedDifficulty}
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-center gap-2">
                <div className="text-[16px] text-center text-[#666666]">
                  Time Left :
                </div>
                <div className="text-[16px] font-bold text-[#2EAE4E]">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>
          )}

          {/* Game Content  */}
          <div className="flex-1 bg-white mx-auto w-full max-w-4xl p-4 overflow-auto rounded-b-[12px]">
            {(() => {
              if (gameStatus === "finished") {
                return <GameCompletion />;
              }

              const currentQuestion = getCurrentQuestion();
              console.log(
                "RENDER: Current Question in Game component:",
                currentQuestion
              );

              return currentQuestion ? (
                <GameCard />
              ) : (
                <div>No current question available</div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
