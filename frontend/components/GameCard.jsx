"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

const REVIVE_COST = 5;

const GameCard = ({
  lyricsSnippet,
  correctAnswer,
  onTimeout,
  onSuccess,
  onRevive,
  onReset,
  points,
  isLastQuestion,
}) => {
  const [guess, setGuess] = useState("");
  const [timeLeft, setTimeLeft] = useState(15);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameState, setGameState] = useState("playing");
  const [isFlipped, setIsFlipped] = useState(false);
  const [showReviveOption, setShowReviveOption] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(correctAnswer); // Store current answer

  // Update currentAnswer when a new question is loaded and card is front-facing
  useEffect(() => {
    if (!isFlipped) {
      setCurrentAnswer(correctAnswer);
    }
  }, [correctAnswer, isFlipped]);

  useEffect(() => {
    if (timeLeft > 0 && gameState === "playing") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      handleTimeout();
    }
  }, [timeLeft, gameState]);

  const handleTimeout = () => {
    setGameState("failed");
    setIsFlipped(true);
    setShowReviveOption(true);
    onTimeout();
  };

  const handleSubmit = () => {
    if (gameState !== "playing") return;

    if (guess.toLowerCase().trim() === currentAnswer.toLowerCase().trim()) {
      setGameState("success");
      setShowConfetti(true);
      setIsFlipped(true);
      onSuccess();

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } else {
      setGameState("failed");
      setIsFlipped(true);
      setShowReviveOption(true);
    }
  };

  const handleNextQuestion = () => {
    // First, flip the card back
    setIsFlipped(false);

    // Reset the game state after the flip animation
    setTimeout(() => {
      setGameState("playing");
      setGuess("");
      setTimeLeft(15);
      setShowReviveOption(false);
    }, 1500); // Match the flip animation duration
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleReviveClick = () => {
    if (onRevive()) {
      handleNextQuestion();
    }
  };

  const handleResetClick = () => {
    onReset();
    handleNextQuestion();
  };

  const getButtonStyles = () => {
    const baseStyles =
      "text-sm/6 font-semibold px-3 py-1.5 text-center rounded-lg transition-colors ";

    switch (gameState) {
      case "playing":
        return baseStyles + "text-[#490878] bg-[#92f2da] hover:bg-[#5bc4ab]";
      case "success":
        return baseStyles + "text-white bg-green-500 hover:bg-green-600";
      case "failed":
        return baseStyles + "text-white bg-red-500 hover:bg-red-600";
      default:
        return baseStyles + "text-[#490878] bg-[#70E3C7]";
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

      <motion.div
        className="relative mt-32 w-[560px] h-72 mx-auto"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.5 }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px",
        }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden bg-gray-100 opacity-85 p-4 rounded-lg shadow-2xl">
          <div className="lyrics-snippet mt-8 text-lg pt-8 font-medium text-black sm:text-2xl/8">
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
            {gameState === "success" ? (
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-600 mb-4">
                  Correct!
                </h3>
                <p className="text-lg text-black mb-4">
                  The answer is: {currentAnswer}
                </p>
                {!isLastQuestion && (
                  <button
                    onClick={handleNextQuestion}
                    className="text-white bg-green-500 hover:bg-green-600 font-semibold px-4 py-2 rounded-lg"
                  >
                    Next Question
                  </button>
                )}
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
                    {points >= REVIVE_COST && (
                      <button
                        onClick={handleReviveClick}
                        className="w-full text-white bg-blue-500 hover:bg-blue-600 font-semibold px-4 py-2 rounded-lg mb-2"
                      >
                        Revive (-{REVIVE_COST} points)
                      </button>
                    )}
                    <button
                      onClick={handleResetClick}
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
          disabled={gameState !== "playing"}
          className="input input-bordered input-lg w-full max-w-sm mb-4 text-black bg-gray-200 
               disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {gameState === "playing" && (
          <button onClick={handleSubmit} className={getButtonStyles()}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default GameCard;
