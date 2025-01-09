"use client";

import React, { useState } from "react";
import GameCard from "../components/GameCard";

const Game = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
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
  ];

  const handleTimeout = () => {
    console.log("Time's up! Show correct answer or deduct tokens.");
  };

  const handleSuccess = () => {
    console.log("Congratulations! Tokens awarded.");
    setTimeout(() => {
      setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    }, 3000);
  };

  return (
    <div
      id="game"
      // className="bg-[#70E3C7]"
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
        />
      </div>
    </div>
  );
};

export default Game;
