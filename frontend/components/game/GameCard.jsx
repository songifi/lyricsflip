"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import AnswerInput from "./AnswerInput";
import Image from "next/image";

const GameCard = () => {
  const { getCurrentQuestion, gameStatus, advanceQuestion } = useGameStore();
  const [isFlipped, setIsFlipped] = useState(false);

  const currentQuestion = getCurrentQuestion();

  useEffect(() => {
    if (gameStatus === "success" || gameStatus === "failed") {
      setIsFlipped(true);
    }
  }, [gameStatus]);

  const handleAnimationComplete = () => {
    if (isFlipped) {
      // Reset flip state and move to next question
      setIsFlipped(false);
      advanceQuestion();
    }
  };

  if (!currentQuestion) return null;

  return (
    <div className="relative">
      <div className="flex-col justify-center items-center p-4">
        <div className="flex justify-center items-center">
          <div className="p-4 bg-[#F5F5F5] rounded-[24px] border border-[#DBE2E7]">
            <motion.div
              className="relative w-[304px] h-[436px] mx-auto"
              animate={{
                rotateY: isFlipped ? 180 : 0,
              }}
              transition={{
                duration: 0.6,
              }}
              onAnimationComplete={handleAnimationComplete}
            >
              {/* Front Face */}
              <div
                className="absolute inset-0 bg-[#70E3C7] p-4 rounded-[24px] backface-hidden"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <div className="flex flex-col justify-center items-center min-h-full p-4">
                  <div className="w-full flex justify-center">
                    <Image
                      src="/img/GameCardIcon.svg"
                      alt="Decorative pattern"
                      width={344}
                      height={100}
                      className="w-full object-scale-down animate-customBounce"
                    />
                  </div>
                  <div className="lyrics-snippet text-[14px] font-[106] mt-[-60px] mx-auto text-center text-black sm:text-2xl/8">
                    <h2>"{currentQuestion.lyricsSnippet}"</h2>
                  </div>
                </div>
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 bg-[#70E3C7] p-4 rounded-[24px] backface-hidden rotate-y-180"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                <div className="flex flex-col justify-center items-center min-h-full p-4">
                  <div className="w-full flex justify-center">
                    <Image
                      src="/img/GameCardIcon.svg"
                      alt="Decorative pattern"
                      width={344}
                      height={100}
                      className="w-full object-scale-down animate-customBounce"
                    />
                  </div>
                  <div className="lyrics-snippet text-[14px] font-[106] mt-[-60px] mx-auto text-center text-black sm:text-2xl/8">
                    <h2>"{currentQuestion.lyricsSnippet}"</h2>
                  </div>
                  <div className="mt-12 text-black text-[14px]">
                    LyricFlip...join the fun🎶🩵
                  </div>
                </div>

                {/* <div className="flex items-center justify-center min-h-full">
                  <h2>"{currentQuestion.lyricsSnippet}"</h2>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="w-full mx-auto p-8 h-[88px] mt-4 flex flex-col items-center">
          <AnswerInput />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
