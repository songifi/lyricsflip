"use client"

import { useState } from "react"
import Link from "next/link"
import { FaMusic } from "react-icons/fa6"
import { useGameStore } from "../store/gameStore"
import GameSection from "../components/game/GameSection"
import { Modal } from "./ui/modal";
import { GameSetupForm } from "./modal/GameSetupForm";



export default function HeroSection({ GameSection }) {
  const { setGameStatus } = useGameStore()
  const [showGame, setShowGame] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleStartGame = () => {
    console.log("Starting game...");
    setIsModalOpen(false);
  };

  const handlePlayNow = () => {
    setGameStatus("playing")
    setShowGame(true)
  }

  if (showGame) {
    return <GameSection />
  }

  return (
    <div>
      <section
      className="bg-cover bg-no-repeat min-h-screen flex items-center"
      style={{ backgroundImage: "url('/img/hero-background.svg')" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl lg:max-w-3xl xl:max-w-4xl relative z-[1]">
            <h1 className="lg:mt-16 text-[40px] md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-pretty text-[#490878]">
              Sing <FaMusic className="inline text-[0.7em]" /> Guess <FaMusic className="inline text-[0.7em]" /> Earn
            </h1>
            <p className="mt-8 pt-8 text-lg md:text-xl lg:text-2xl font-medium text-gray-700 md:text-white sm:text-2xl/8">
              Test your lyrical knowledge, flip the cards, and guess the song! Discover your favorite genres, wager
              tokens, and compete for the top spot. Let the music challenge begin!
            </p>
            <div className="mt-6 sm:mt-8 flex flex-col md:flex-row gap-4">
            <button
                 onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto text-sm sm:text-base font-semibold text-[#490878] px-6 py-3 text-center rounded-lg bg-[#70E3C7] hover:bg-[#5fcfb5] transition-colors duration-300"
              >
                Play Now
              </button>
              
                <Modal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  title="Guess the song"
                >
                  <GameSetupForm onStart={handleStartGame} />
                </Modal>
                <button
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.getElementById("howItWorks");
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="w-full sm:w-auto text-sm sm:text-base font-semibold text-[#70E3C7] px-6 py-3 text-center rounded-lg border-2 border-[#70E3C7] hover:bg-[#70E3C7] hover:text-[#490878] transition-colors duration-300"
              >
                How to Play
              </button>

            </div>
          </div>
          <div className="absolute top-48 left-[50%] -translate-x-[50%] lg:relative lg:top-0 lg:left-0 lg:translate-x-0 mt-14 sm:mt-24 lg:mt-20 lg:shrink-0 lg:grow">
            <FaMusic className="text-[220px] md:text-[250px] lg:text-[300px] xl:text-[350px] text-[#70E3C7] animate-customBounce" />
          </div>
        </div>
      </div>
    </section>
    </div>
  )
}
