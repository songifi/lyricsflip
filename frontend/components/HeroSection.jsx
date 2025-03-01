"use client";

import Link from "next/link";
import { FaMusic, FaPlay } from "react-icons/fa6";
import { IoInformationCircleOutline } from "react-icons/io5";
import { useGameStore } from "../store/gameStore";
import { useUIStore } from "../store/uiStore";
import GameSection from "./game/GameSection";
import { Modal } from "./ui/modal";
import { GameSetupForm } from "./modal/GameSetupForm";
import { StarBackground } from "./ui/StarBackground";
import GeniusService from "@/services/geniusService";

import { useGameSounds } from "@/hooks/useGameSound";
import WelcomeModal from "./modal/welcomeModal";

export default function HeroSection() {
  const { handleStartGame, isModalOpen, setIsModalOpen } = useGameStore();
  const { playClick, playBackground, stopBackground } = useGameSounds();
  const { showGame } = useUIStore();

  if (showGame) {
    return <GameSection />;
  }

  return (
    <div className="relative min-h-[800px] w-full overflow-hidden">
      <StarBackground />
      <WelcomeModal />
      <section className="relative z-10 min-h-[800px] flex items-center justify-center">
        <div className="container mx-auto px-4 w-full flex justify-center items-center">
          <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl relative z-[1] text-center">
            <h1 className="text-[56px] font-[800] light:text-black dark:text-[#490878] tracking-tight text-white leading-tight font-geist">
              Sing, Guess and Earn
            </h1>
            <p className="mt-6 text-base sm:text-lg md:text-xl text-white max-w-xl font-inter font-[300] mx-auto">
              <span className="block">
                Test your lyrical knowledge, flip the cards, and guess the song!
                Discover your favorite genres, wager tokens,
              </span>
              <span className="block">
                and compete for the top spot. Let the music challenge begin!
              </span>
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  playClick();
                  setIsModalOpen(true);
                }}
                className="bg-[#63B2AE] dark:bg-black w-full sm:w-auto px-8 py-4 text-base font-[600] text-primary-main rounded-lg bg-primary-light hover:bg-[#5fcfb5] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <FaPlay className="text-lg" />
                Play Now
              </button>

              <button
                onClick={(e) => {
                  playClick();
                  const section = document.getElementById("howItWorks");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="bg-[#490878] dark:bg-black w-full sm:w-auto px-8 py-4 text-base font-[600] text-primary-light rounded-lg border-2 border-primary-light hover:bg-primary-light hover:text-primary-main transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <IoInformationCircleOutline className="text-xl" />
                How to Play
              </button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          playClick();
          setIsModalOpen(false);
        }}
        title="Guess the song"
      >
        <GameSetupForm onStart={handleStartGame} />
      </Modal>
    </div>
  );
}
