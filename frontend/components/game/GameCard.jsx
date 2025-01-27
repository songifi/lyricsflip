"use client";

import React, { useState, useEffect , useRef } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useGameStore } from "../../store/gameStore";

const GameCard = ({ lyricsSnippet, correctAnswer }) => {
  const {
    handleSuccess,
    handleRevive,
    resetGame,
    setRandomQuestion,
    points,
    questionsCompleted,
    gameStatus,
    setGameStatus,
  } = useGameStore();

  const [guess, setGuess] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showReviveOption, setShowReviveOption] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(correctAnswer);
  const inputRef = useRef(null);

  // Update answer when new question loads
  useEffect(() => {
    if (!isFlipped) {
      setCurrentAnswer(correctAnswer);
    }
  }, [correctAnswer, isFlipped]);

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && gameStatus === "playing") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStatus === "playing") {
      handleTimeout();
    }
  }, [timeLeft, gameStatus]);

  const handleTimeout = () => {
    setGameStatus("failed");
    setIsFlipped(true);
    setShowReviveOption(true);
  };

  const handleSubmit = () => {
    if (gameStatus !== "playing") return;

    if (guess.trim() === "") {
      inputRef.current.focus(); 
      return;
    }

    if (guess.toLowerCase().trim() === currentAnswer.toLowerCase().trim()) {
      handleSuccess();
      setShowConfetti(true);
      setIsFlipped(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } else {
      setGameStatus("failed");
      setIsFlipped(true);
      setShowReviveOption(true);
    }
  };

  const handleNextQuestion = () => {
    setIsFlipped(false);

    setTimeout(() => {
      setGameStatus("playing");
      setGuess("");
      setTimeLeft(15);
      setShowReviveOption(false);
    }, 1500);
  };

  const handlePlayAgain = () => {
    setIsFlipped(false);

    setTimeout(() => {
      resetGame(); // This now includes setting a random question
      setGuess("");
      setTimeLeft(15);
      setShowReviveOption(false);
    }, 1500);
  };

  const handleReviveAttempt = () => {
    if (handleRevive()) {
      // handleRevive now includes setting a random question
      setIsFlipped(false);
      setShowReviveOption(false);
      setTimeLeft(15);
      setGuess("");
    }
  };

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Rest of your component remains the same
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

      <motion.div
        className="relative mt-16 w-full max-w-xl h-72 mx-auto sm:mt-20 md:h-80 lg:mt-24"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-gray-100 opacity-85 p-4 rounded-lg shadow-2xl">
          <div className="lyrics-snippet mt-4 text-sm pt-4 font-medium text-black sm:text-lg md:text-xl lg:text-2xl">
            <h2>{lyricsSnippet}</h2>
          </div>
          <div
            className={`px-4 py-4 rounded-full border mx-auto max-w-28 text-xs whitespace-nowrap ${
              timeLeft < 5 ? "bg-red-500" : "bg-gray-700"
            } text-white mt-4`}
          >
            {timeLeft} seconds left
          </div>
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full backface-hidden bg-white p-4 rounded-lg shadow-2xl"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex flex-col items-center justify-center h-full">
            {gameStatus === "success" ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  Correct!
                </h3>
                <p className="text-lg text-black mb-4">
                  The answer is: {currentAnswer}
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={handleNextQuestion}
                    className="text-white bg-green-500 hover:bg-green-600 font-semibold px-4 py-2 rounded-lg"
                  >
                    Next Question
                  </button>
                  <p className="text-sm text-gray-600 ">
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
                  The answer was: {currentAnswer}
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
          ref={inputRef}
          type="text"
          value={guess}
          onChange={handleInputChange}
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
  );
};

export default GameCard;
