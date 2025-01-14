"use client";
import React, { useState, useCallback } from "react";
import GameCard from "../components/GameCard";

const POINTS_PER_CORRECT = 10;
const REVIVE_COST = 5;

const Game = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [questions, setQuestions] = useState([
    {
      lyricsSnippet:
        "I hate a bitch that's hatin' on a bitch and they both hoes",
      correctAnswer: "TV OFF",
    },
    {
      lyricsSnippet: "Just a small-town girl, living in a lonely world...",
      correctAnswer: "Don't Stop Believin'",
    },
    {
      lyricsSnippet: "Is this the real life? Is this just fantasy?",
      correctAnswer: "Bohemian Rhapsody",
    },
    {
      lyricsSnippet:
        "I chop akara when moi moi no dey, as long as e full my belle me i'm ok",
      correctAnswer: "Bundle by Bundle",
    },
    {
      lyricsSnippet:
        "In my tiny apartment, I loved your body often. And I don't even know when you're coming home",
      correctAnswer: "Tiny Apartment",
    },
  ]);

  // Fisher-Yates shuffle algorithm for randomizing questions
  const shuffleQuestions = useCallback(() => {
    const shuffled = [...questions];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
  }, [questions]);

  // Initialize game with shuffled questions
  useState(() => {
    shuffleQuestions();
  }, [shuffleQuestions]);

  const handleTimeout = () => {
    console.log("Time's up!");
  };

  const handleSuccess = () => {
    setPoints((prev) => prev + POINTS_PER_CORRECT);
    console.log("Congratulations! +10 points awarded.");

    // Only increment question index if there are more questions
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
    shuffleQuestions();
    setPoints(0);
  };

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
          lyricsSnippet={questions[currentQuestionIndex].lyricsSnippet}
          correctAnswer={questions[currentQuestionIndex].correctAnswer}
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
