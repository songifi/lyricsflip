"use client";

import React from "react";
import GameCard from "../components/GameCard";

const Game = () => {
  const handleTimeout = () => {
    console.log("Time's up! Show correct answer or deduct tokens.");
  };

  const handleSuccess = () => {
    // setTokens((prev) => prev + 10);
    console.log("Congratulations! Tokens awarded.");
  };

  return (
    <div
      id="game"
      className=""
      style={{
        backgroundImage: "url('/img/hero-background.svg')",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className="p-10 h-full w-full">
        <GameCard
          lyricsSnippet="Just a small-town girl, living in a lonely world..."
          correctAnswer="Don't Stop Believin'"
          onTimeout={handleTimeout}
          onSuccess={handleSuccess}
        />
      </div>
    </div>
  );
};

export default Game;
