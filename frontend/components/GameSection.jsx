"use client";
import React, { useState } from "react";
import GameCard from "../components/GameCard";
import { useGameData } from "@/hooks/useGameData";

const POINTS_PER_CORRECT = 10;
const REVIVE_COST = 5;

const Game = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);

  const { questions, loading, error, refreshQuestions } = useGameData(5); // Fetch 5 questions

  const handleTimeout = () => {
    console.log("Time's up!");
  };

  const handleSuccess = () => {
    setPoints((prev) => prev + POINTS_PER_CORRECT);
    console.log("Congratulations! +10 points awarded.");

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRevive = () => {
    if (points >= REVIVE_COST) {
      setPoints((prev) => prev - REVIVE_COST);
      return true;
    }
    return false;
  };

  const handleGameReset = () => {
    refreshQuestions();
    setPoints(0);
    setCurrentQuestionIndex(0);
  };

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
          lyricsSnippet={questions[currentQuestionIndex]?.lyricsSnippet}
          correctAnswer={questions[currentQuestionIndex]?.correctAnswer}
          onTimeout={handleTimeout}
          onSuccess={handleSuccess}
          onRevive={handleRevive}
          onReset={handleGameReset}
          points={points}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      </div>
    </div>
  );
};

export default Game;
