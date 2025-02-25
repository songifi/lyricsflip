"use client";
import { useState, useEffect } from "react";
import { Modal } from "./ui/modal";
import { GameSetupForm } from "./modal/GameSetupForm";
import { useGameStore } from "@/store/gameStore";
import GeniusService from "@/services/geniusService";

const steps = [
  {
    title: "Connect Wallet",
    text: "Securely connect your wallet to start the game. Don't have one? No worries, we'll guide you through the setup.",
  },
  {
    title: "Enter Username",
    text: "Choose a fun and unique username to showcase your identity. This will represent you in challenges and leaderboards. ",
  },
  {
    title: "Choose Category & Play",
    text: "Pick your favourite category and dive into the game! Test your knowledge, beat challenges, and climb the ranks.",
  },
];

const HowItWorks = () => {
 
  const { handleStartGame, isModalOpen, setIsModalOpen } = useGameStore();


 

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="howItWorks" className="bg-[#490878] px-4 py-12" role="region" aria-labelledby="howItWorksTitle">
      <div className="mx-auto max-w-7xl text-center py-[100px]">
        {/* Header Section */}
        <div className="">
          <h2 className="pb-4 text-5xl font-semibold text-background-default md:text-5xl lg:text-6xl">
            How it works
          </h2>
          <p className="text-lg text-background-default md:text-xl">
            Have fun testing your lyrical knowledge in three (3) easy steps 😊
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3 my-16">
          {steps.map((step, index) => (
            <div className="space-y-4 my-10" key={index}>
              <h3
                key={index}
                className="text-2xl font-bold text-background-default lg:text-3xl pb-3"
              >
                {step.title}
              </h3>
              <p className="mx-auto max-w-sm text-background-default"></p>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
          <button
            className="w-full rounded-full bg-primary-light px-[69px] py-6 font-semibold text-[#090909] transition md:w-auto"
            onClick={() => setIsModalOpen(true)}
            aria-label="Start the game"
          >
            Play Game
          </button>
          
          {/* Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Guess the song"
            aria-labelledby="modalTitle"
          >
            <GameSetupForm onStart={handleStartGame} />
          </Modal>
          <button className="w-full rounded-full border-2 border-primary-light px-[51px] py-6  font-semibold text-primary-light md:w-auto">
            Connect Wallet
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
