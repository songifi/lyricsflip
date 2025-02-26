import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import { useGameStore } from "@/store/gameStore";
import { ExclamationSVG, TrophySVG } from "@/public/svgs";
import { motion } from "framer-motion";

const GameCompletion = () => {
  const { points, questions, resetGame } = useGameStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = React.useRef(null);

  // Calculate score percentage
  const maxPossiblePoints = questions.length * 10;
  const scorePercentage = (points / maxPossiblePoints) * 100;
  const isHighScore = scorePercentage >= 60;

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    if (isHighScore) {
      setTimeout(() => setShowConfetti(true), 100);
    }

    return () => window.removeEventListener("resize", updateSize);
  }, [isHighScore]);

  const getEmoji = () => {
    if (scorePercentage >= 80) return "🎉";
    if (scorePercentage >= 60) return "🔥";
    if (scorePercentage >= 40) return "😊";
    return "🤔";
  };

  const getMessage = () => {
    if (scorePercentage >= 80) return "You are amazinggg!";
    if (scorePercentage >= 60) return "Great job!";
    if (scorePercentage >= 40) return "Not bad!";
    return "You can do better";
  };

  const getIcon = () => {
    if (scorePercentage >= 60) {
      return (
        <div className="w-52 h-52 mb-4 mx-auto">
          <TrophySVG />
        </div>
      );
    } else {
      return (
        <div className="w-52 h-52 mb-4 mx-auto text-red-500">
          <ExclamationSVG />
        </div>
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full flex items-center justify-center"
    >
      {showConfetti && (
        <ReactConfetti
          width={containerSize.width}
          height={containerSize.height}
          colors={["#34d399", "#6d28d9", "#14b8a6", "#16a34a"]} // Tailwind colors
          recycle={false}
          numberOfPieces={200}
          confettiSource={{
            x: containerSize.width / 2,
            y: containerSize.height / 2,
          }}
        />
      )}

      <motion.div
        className="p-8 rounded-3xl w-full text-center bg-gradient-to-br from-white/90 to-gray-100 
          backdrop-blur-lg border border-white/20 shadow-lg"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        {getIcon()}

        <div className="flex-col md:flex items-center justify-center gap-4 mb-2">
          <motion.div
            className="text-teal-400 text-2xl font-bold"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {points} Points
          </motion.div>

          <motion.div
            className="text-2xl text-black"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {getMessage()} {getEmoji()}
          </motion.div>
        </div>

        <motion.div
          className="text-gray-600 mb-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {scorePercentage.toFixed(1)}% Accuracy
        </motion.div>

        <motion.button
          onClick={resetGame}
          className="w-[80%] px-6 py-3 bg-green-300 text-purple-800 rounded-full 
            text-lg font-bold hover:bg-teal-400 transition-colors duration-200"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Play Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default GameCompletion;
