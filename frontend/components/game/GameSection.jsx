"use client";
import React from "react";
import GameCard from "./GameCard";
import { useGameLogic } from "../../hooks/useGameLogic";
import { useGameStore } from "../../store/gameStore";

const Game = () => {
  const { loading, error, refreshQuestions } = useGameLogic(10);
  const { currentQuestionIndex, questions, gameStatus, setGameStatus } =
    useGameStore();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Questions
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={refreshQuestions}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (gameStatus === "idle") {
    return (
      <div className="h-screen flex items-center justify-center">
        <button
          onClick={() => setGameStatus("playing")} // Transition to "playing"
          className="px-6 py-3 text-[#490878] bg-[#92f2da] rounded-lg text-lg font-bold hover:shadow-2xl"
        >
          Start Game
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div
      id="game"
      style={{
        backgroundImage: "url('/img/hero-background.svg')",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="p-10 h-full w-full">
        <GameCard
          lyricsSnippet={currentQuestion?.lyricsSnippet}
          correctAnswer={currentQuestion?.correctAnswer}
        />
      </div>
    </div>
  );
};

export default Game;
