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
import { useState } from "react";

export default function HeroSection() {
  // Remove the GameSection prop
  const { handleStartGame, isModalOpen, setIsModalOpen } = useGameStore();
  const { showGame,  } = useUIStore();


  if (showGame) {
    return <GameSection />; // Use the imported GameSection component
  }

  return (
    <div className="relative min-h-[800px] w-full overflow-hidden">
      <StarBackground />

      <section className="relative z-10 min-h-[800px] flex items-start pt-[200px]">
        <div className="container mx-auto px-4 w-full">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-start">
            <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl relative z-[1] ml-2 lg:ml-4">
              <h1 className="text-[56px] font-[800] tracking-tight text-white leading-tight font-geist">
                Sing, Guess and Earn
              </h1>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-white max-w-xl font-inter font-[300]">
                Test your lyrical knowledge, flip the cards, and guess the song!
                Discover your favorite genres, wager tokens, and compete for the
                top spot. Let the music challenge begin!
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full sm:w-auto px-8 py-4 text-base font-[600] text-primary-main rounded-lg bg-primary-light hover:bg-[#5fcfb5] transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <FaPlay className="text-lg" />
                  Play Now
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.getElementById("howItWorks");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="w-full sm:w-auto px-8 py-4 text-base font-[600] text-primary-light rounded-lg border-2 border-primary-light hover:bg-primary-light hover:text-primary-main transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  <IoInformationCircleOutline className="text-xl" />
                  How to Play
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Guess the song"
      >
        <GameSetupForm
          onStart={handleStartGame}
        />
      </Modal>
    </div>
  );
}
