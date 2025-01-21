"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useGameStore } from "../../store/gameStore";
import Image from "next/image";

const GameCard = () => {
  const {
    handleSuccess,
    handleRevive,
    resetGame,
    points,
    questionsCompleted,
    gameStatus,
    setGameStatus,
    handleSubmitGuess,
    handleNextQuestion: storeHandleNextQuestion,
    handleTimeout: storeHandleTimeout,
    getCurrentQuestion,
  } = useGameStore();

  const [guess, setGuess] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showReviveOption, setShowReviveOption] = useState(false);

  const currentQuestion = getCurrentQuestion();

  // debug logging
  console.log("GameCard current question:", currentQuestion);

  if (!currentQuestion) {
    console.log("No question data in GameCard");
    return null;
  }

  const { lyricsSnippet, correctAnswer } = currentQuestion;

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && gameStatus === "playing") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStatus === "playing") {
      storeHandleTimeout();
      setIsFlipped(true);
      setShowReviveOption(true);
    }
  }, [timeLeft, gameStatus, storeHandleTimeout]);

  const handleSubmit = () => {
    if (gameStatus !== "playing") return;

    const isCorrect = handleSubmitGuess(guess, correctAnswer);
    setIsFlipped(true);

    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } else {
      setShowReviveOption(true);
    }
  };

  const handleNextQuestion = () => {
    setIsFlipped(false);

    setTimeout(() => {
      storeHandleNextQuestion();
      setGuess("");
      setTimeLeft(15);
      setShowReviveOption(false);
    }, 1500);
  };

  const handlePlayAgain = () => {
    setIsFlipped(false);

    setTimeout(() => {
      resetGame();
      setGuess("");
      setTimeLeft(15);
      setShowReviveOption(false);
    }, 1500);
  };

  const handleReviveAttempt = () => {
    if (handleRevive()) {
      setIsFlipped(false);
      setShowReviveOption(false);
      setTimeLeft(15);
      setGuess("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="relative">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <div className="flex-col justify-center items-center min-h-screen">
        <motion.div
          className="relative w-[344px] h-[476px] mx-auto"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 1.5 }}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
            transformOrigin: "center center",
          }}
        >
          {/* Front of card */}
          <div className="absolute inset-0 backface-hidden bg-[#70E3C7] opacity-85 p-4 rounded-lg shadow-2xl">
            <div className="flex-col justify-center items-center min-h-full">
              <div className="">
                <Image
                  src="/img/GameCardIcon.svg"
                  alt="Decorative pattern"
                  width={344}
                  height={100}
                  className="w-full object-scale-down animate-customBounce"
                />
              </div>
              <div className="lyrics-snippet text-[16px] font-[126] mt-[-60px] mx-auto text-black sm:text-2xl/8">
                <h2>{lyricsSnippet}</h2>
              </div>
              {/* <div
                className={`px-4 py-4 rounded-full border mx-auto max-w-28 text-xs whitespace-nowrap ${
                  timeLeft < 5 ? "bg-red-500" : "bg-gray-700"
                } text-white mt-4`}
              >
                {timeLeft} seconds left
              </div> */}
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute inset-0 backface-hidden bg-[#70E3C7] p-4 rounded-lg shadow-2xl"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              {gameStatus === "success" ? (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Correct!
                  </h3>
                  <p className="text-lg text-black mb-4">
                    The answer is: {correctAnswer}
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleNextQuestion}
                      className="text-white bg-green-500 hover:bg-green-600 font-semibold px-4 py-2 rounded-lg"
                    >
                      Next Question
                    </button>
                    <p className="text-sm text-gray-600">
                      Questions completed: {questionsCompleted}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-red-600 mb-4">
                    {timeLeft === 0 ? "Time's Up!" : "Incorrect!"}
                  </h3>
                  <p className="text-lg text-black mb-4">
                    The answer was: {correctAnswer}
                  </p>
                  {showReviveOption && (
                    <div className="space-y-2">
                      {points >= 5 && (
                        <button
                          onClick={handleReviveAttempt}
                          className="w-full text-white bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2 rounded-lg mb-2"
                        >
                          Revive (-5 points)
                        </button>
                      )}
                      <button
                        onClick={handlePlayAgain}
                        className="w-full text-white bg-red-500 hover:bg-red-600 font-semibold px-4 py-2 rounded-lg"
                      >
                        Play Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
        <div className="w-96 mx-auto p-4 mt-4 flex flex-col items-center">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your guess here"
            disabled={gameStatus !== "playing"}
            className="input input-bordered input-lg w-full max-w-sm mb-4 text-black bg-gray-200 
               disabled:opacity-50 disabled:cursor-not-allowed"
          />
          {gameStatus === "playing" && (
            <button
              onClick={handleSubmit}
              className="text-sm/6 font-semibold px-3 py-1.5 text-center rounded-lg transition-colors text-[#490878] bg-[#92f2da] hover:bg-[#5bc4ab]"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
