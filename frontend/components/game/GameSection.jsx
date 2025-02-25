"use client";

import { useState, useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import GameCard from "./GameCard";
import DifficultySelect from "./DifficultySelect";
import DifficultyLevel from "./DifficultyLevel";
import GeniusService from "@/services/geniusService";
import GameCompletion from "./GameCompletion";
import { Modal } from "../ui/modal";

const Game = () => {
  const {
    gameStatus,
    selectedDifficulty,
    timeLeft,
    getCurrentQuestion,
    initializeGame,
    setQuestions,
    stopTimer,
    username,
  } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

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

  const handleStartGame = async () => {
    if (!selectedDifficulty) return;

    setIsLoading(true);
    setError(null);

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
          const randomIndex = Math.floor(
            Math.random() * otherSongChoices.length
          );
          const randomChoice = otherSongChoices.splice(randomIndex, 1)[0];
          additionalOptions.push(randomChoice);
        }

        const options = [correctOption, ...additionalOptions];
        const shuffledOptions = options.sort(() => 0.5 - Math.random());

        return {
          lyricsSnippet: snippet.lyricsSnippet,
          correctAnswer: correctOption,
          difficulty: snippet.difficulty,
          options: selectedDifficulty === "Beginner" ? shuffledOptions : [],
        };
      });

      setQuestions(formatted);
      initializeGame();
    } catch (err) {
      console.error("Game initialization failed:", err);
      setError(err.message || "Failed to start game. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = () => {
    switch (selectedDifficulty) {
      case "Beginner":
        return "text-status-success"; // Green
      case "Intermediate":
        return "text-[#F4A261]"; // Orange
      case "Expert":
        return "text-[#E63946]"; // Red
      default:
        return "text-text-secondary";
    }
  };

  const getAvatarColor = () => {
    switch (selectedDifficulty) {
      case "Beginner":
        return "#2EAE4E"; // Green
      case "Intermediate":
        return "#F4A261"; // Orange
      case "Expert":
        return "#E63946"; // Red
      default:
        return "#666666"; // Default color
    }
  };

  if (gameStatus === "idle") return null;

  return (
    <>
      {/* Game Overlay */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="gameModalTitle"
        role="dialog"
        aria-hidden={!isModalOpen}
      >
        {gameStatus !== "idle" && (
          <div
            className="fixed inset-0 z-50 h-[95%] my-auto rounded-[12px] flex flex-col"
            aria-live="assertive"
          >
            {/* Game Header */}
            <div
              className="bg-[#F5F5F5] mx-auto w-full max-w-4xl p-3 flex justify-between items-center rounded-t-[12px] shadow-md"
              aria-labelledby="gameHeader"
            >
              <div className="flex flex-col items-start gap-2">
                {/* Username and Avatar */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10"
                    aria-label="User avatar"
                    role="img"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-full h-full"
                      role="img"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" fill="transparent" />
                      <path
                        d="M12 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0 2c2.67 0 8 1.34 8 4v1H4v-1c0-2.66 5.33-4 8-4z"
                        fill={getAvatarColor()}
                      />
                    </svg>
                  </div>

                  <div>
                    <h1
                      className="text-[14px] font-bold text-[#090909]"
                      id="username"
                      aria-label={`Username: ${username || "Player"}`}
                    >
                      {username || "Player"}
                    </h1>
                  </div>
                </div>

                {/* Difficulty */}
                <div className="flex items-center gap-2">
                  <span className="text-[14px] text-text-secondary">Difficulty:</span>
                  <span
                    className={`text-[14px] font-bold flex items-center gap-1 ${getDifficultyColor()}`}
                    aria-label={`Current difficulty: ${selectedDifficulty}`}
                  >
                    {selectedDifficulty}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Timer */}
              <div className="p-3 flex items-center justify-center gap-2">
                <div className="text-[16px] text-center text-[#666666]" aria-label="Timer">
                  🕒
                </div>
                <div
                  className="text-[16px] font-bold text-[#2EAE4E]"
                  aria-label={`Time left: ${formatTime(timeLeft)}`}
                >
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            {/* Game Content */}
            <div className="flex-1 bg-white mx-auto w-full max-w-4xl overflow-auto rounded-b-[12px]">
              {(() => {
                if (gameStatus === "finished") {
                  return <GameCompletion />;
                }

                const currentQuestion = getCurrentQuestion();

                return currentQuestion ? (
                  <GameCard />
                ) : (
                  <div>No current question available</div>
                );
              })()}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default Game;
