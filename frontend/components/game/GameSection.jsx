"use client";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useGameStore } from "@/store/gameStore";
import React, { useEffect, useState } from "react";
import GameCard from "./GameCard";

const DifficultySelect = ({ onSelect }) => (
  <select
    onChange={(e) => onSelect(e.target.value)}
    className="ml-4 px-4 py-2 bg-white text-[#490878] rounded-lg border-2 border-[#92f2da] 
      focus:outline-none focus:border-[#5bc4ab]"
  >
    <option value="">Select Difficulty</option>
    <option value="Beginner">Beginner</option>
    <option value="Intermediate">Intermediate</option>
    <option value="Advanced">Advanced</option>
  </select>
);

const Game = () => {
  const {
    setSelectedDifficulty,
    setGameStatus,
    getCurrentQuestion,
    gameStatus,
    selectedDifficulty,
    handleNextQuestion,
  } = useGameStore();

  const { loading, error, refreshQuestions } = useGameLogic(10); // Call useGameLogic to fetch questions
  const [difficulty, setDifficulty] = useState("");

  console.log("Game Status:", gameStatus);
  console.log("Selected Difficulty one:", selectedDifficulty);
  console.log("Current Question:", getCurrentQuestion());

  const handleStartGame = () => {
    if (!difficulty) {
      alert("Please select a difficulty level");
      return;
    }

    console.log("Selected Difficulty:", difficulty); // Debugging log
    setSelectedDifficulty(difficulty); // Update the store
    // Removed setGameStatus("playing") from here
  };

  useEffect(() => {
    if (gameStatus === "success" || gameStatus === "failed") {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus, handleNextQuestion]);

  const currentQuestion = getCurrentQuestion();

  // Handle loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="text-xl text-gray-700 mt-4">Loading Questions...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Questions
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={refreshQuestions} // Allow retrying question fetch
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
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center">
            <button
              onClick={handleStartGame}
              disabled={!difficulty}
              className="px-6 py-3 text-[#490878] bg-[#92f2da] rounded-lg text-lg font-bold 
                hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start Game
            </button>
            <DifficultySelect onSelect={setDifficulty} />
          </div>
          {!difficulty && (
            <p className="text-sm text-gray-600">
              Please select a difficulty level to start
            </p>
          )}
        </div>
      </div>
    );
  }

  if (currentQuestion) {
    return (
      <div id="game">
        <div className="p-10 h-full w-full">
          <GameCard key={currentQuestion.correctAnswer} />
        </div>
      </div>
    );
  }

  return null;
};

export default Game;
