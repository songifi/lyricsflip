import { useState } from "react";
import { motion } from "framer-motion";
import { useGameStore } from "@/store/gameStore";
import AnswerInput from "./AnswerInput";
import Image from "next/image";
import WinSinglePlayerResult from "./WinSinglePlayerResult";

const GameCard = () => {
  const { getCurrentQuestion, gameStatus, advanceQuestion } = useGameStore();
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isWinSinglePlayerResultOpen, setIsWinSinglePlayerResultOpen] = useState(true);

  const currentQuestion = getCurrentQuestion();

  const handleAnswer = (isCorrect) => {
    setShowFeedback(true);

    // delay before flipping the card to show feedback
    setTimeout(() => {
      setIsFlipped(!isFlipped);
      advanceQuestion();
      setShowFeedback(false);
    }, 1000);
  };

  if (!currentQuestion) return null;

  return (
    <div className="relative">
      <div className="flex-col justify-center items-center p-4">
        <div className="flex justify-center items-center">
          <div className="p-4 bg-gray-100 rounded-[24px] border border-gray-200">
            <motion.div
              className="relative w-[304px] h-[436px] mx-auto cursor-default rounded-[24px] overflow-hidden"
              animate={{
                rotateY: isFlipped ? 180 : 0,
                scale: isFlipped ? 0.96 : 1,
                rotateX: isFlipped ? -3 : 0,
                y: isFlipped ? [-10, 0] : 0,
                boxShadow: isFlipped
                  ? "0 25px 50px -12px rgba(113, 227, 199, 0.4)"
                  : "0 8px 24px -6px rgba(73, 9, 120, 0.2)",
              }}
              transition={{
                type: "spring",
                stiffness: 25, // Reduced stiffness for smoother motion
                damping: 20, // Increased damping for a gentler stop
                mass: 1.5,
                restDelta: 0.0005,
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                willChange: "transform, box-shadow",
              }}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 150, damping: 15 },
              }}
              whileTap={{
                scale: 0.98,
                transition: { type: "spring", stiffness: 300, damping: 20 },
              }}>
              {/* Front Face */}
              <div
                className="absolute inset-0 bg-primary-light p-4 rounded-[24px] backface-hidden"
                style={{
                  transform: "rotateY(0deg)",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                  filter: "drop-shadow(0 8px 16px rgba(73, 9, 120, 0.15))",
                }}>
                <motion.div
                  className="flex flex-col justify-center items-center min-h-full p-4"
                  animate={{
                    opacity: isFlipped ? 0 : 1,
                    transition: { duration: 0.2, delay: 0.1 },
                  }}>
                  <div className="w-full flex justify-center">
                    <Image
                      src="/img/GameCardIcon.svg"
                      alt="Decorative pattern"
                      width={344}
                      height={100}
                      className="w-full object-scale-down animate-musical-float transition-all duration-300"
                    />
                  </div>
                  <div className="lyrics-snippet text-[14px] font-[106] mt-[-60px] mx-auto text-center text-black sm:text-2xl/8">
                    <h2>"{currentQuestion.lyricsSnippet}"</h2>
                  </div>
                  <div className="mt-12 text-[14px]">
                    <span className="animate-lyric-call font-medium text-[16px]">
                      LyricFlip...join the fun
                      <span>🎶</span>
                      <span className="inline-block animate-heart-beat ml-[-0.2em]">
                        🩵
                      </span>
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Back Face */}
              <div
                className="absolute inset-0 bg-primary-light p-4 rounded-[24px] backface-hidden"
                style={{
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d",
                }}>
                <motion.div
                  className="flex flex-col justify-center items-center min-h-full p-4"
                  style={{
                    transform: "rotateY(0deg) translateZ(1px)",
                    backfaceVisibility: "visible",
                  }}
                  animate={{
                    opacity: isFlipped ? 1 : 0,
                    transition: { duration: 0.2, delay: 0.1 },
                  }}>
                  <div className="w-full flex justify-center">
                    <Image
                      src="/img/GameCardIcon.svg"
                      alt="Decorative pattern"
                      width={344}
                      height={100}
                      className="w-full object-scale-down animate-musical-float transition-all duration-300"
                    />
                  </div>
                  <div className="lyrics-snippet text-[14px] font-[106] mt-[-60px] mx-auto text-center text-black sm:text-2xl/8">
                    <h2>"{currentQuestion.lyricsSnippet}"</h2>
                  </div>
                  <div className="mt-12 text-[14px]">
                    <span className="animate-lyric-call font-medium text-[16px]">
                      LyricFlip...join the fun
                      <span>🎶</span>
                      <span className="inline-block animate-heart-beat ml-[-0.2em]">
                        🩵
                      </span>
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="w-full mx-auto p-8 h-[88px] flex flex-col items-center">
          <AnswerInput onAnswer={handleAnswer} />
        </div>
      </div>
      <WinSinglePlayerResult
        isOpen={isWinSinglePlayerResultOpen}
        onClose={() => setIsWinSinglePlayerResultOpen(false)}
      />
    </div>
  );
};

export default GameCard;
