"use client";
import React from "react";
import GameCard from "./GameCard";
import { useGameLogic } from "../../hooks/useGameLogic";
import { useGameStore } from "../../store/gameStore";

const Game = () => {
  const { loading, error, refreshQuestions } = useGameLogic();
  const { gameStatus, setGameStatus, getCurrentQuestion, questions } =
    useGameStore();

  const currentQuestion = getCurrentQuestion();

  //  debug logging
  console.log("Current game state:", {
    loading,
    gameStatus,
    currentQuestion,
    totalQuestions: questions.length,
  });

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
          onClick={() => setGameStatus("playing")}
          className="px-6 py-3 text-[#490878] bg-[#92f2da] rounded-lg text-lg font-bold hover:shadow-2xl"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    console.log("No current question available");
    return null;
  }

  return (
    <div id="game">
      <div className="p-10 h-full w-full">
        <GameCard />
      </div>
    </div>
  );
};

export default Game;
