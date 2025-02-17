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

  if (gameStatus === "idle") return null;


  return (
    <>
      {/* <div className="min-h-screen bg-[#F5F5F5]"> */}
      {/* Start Screen */}
      {/* {gameStatus === "idle" && (
        <div className="h-full flex items-center justify-center ">
          <div className="flex flex-col items-center space-y-6 mt-12">
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
      )} */}

      {/* Game Overlay */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        {gameStatus !== "idle" && (
          <div className="fixed inset-0 z-50 h-[95%] my-auto rounded-[12px] flex flex-col">
            {/* Game Header */}
            <div className="bg-[#F5F5F5] mx-auto w-full max-w-4xl p-3 flex justify-between items-center rounded-t-[12px] shadow-md">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white border border-[#DBE1E7] p-2 rounded-[1000px] pr-[12px]">
                  <h1 className="text-[16px] font-bold text-[#090909]">
                    {username || "Player"}
                  </h1>
                </div>
                <div className="flex items-center">
                  <div className="text-[16px] text-[#490878]">
                    <DifficultyLevel difficulty={selectedDifficulty} />
                  </div>
                </div>
              </div>
              <div className="p-3 flex items-center justify-center gap-2">
                <div className="text-[16px] text-center text-[#666666]">
                  Time Left:
                </div>
                <div className="text-[16px] font-bold text-[#2EAE4E]">
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
      </Modal>
      {/* </div> */}
    </>
  );
};

export default Game;
