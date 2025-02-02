"use client";
import { title } from "process";
import { useState } from "react";
import { Modal } from "./ui/modal";
import { GameSetupForm } from "./modal/GameSetupForm";
import { useGameStore } from "@/store/gameStore";
import GeniusService from "@/services/geniusService";

const steps = [
  {
    title: "Connect Wallet",
    text: "Securely connect your wallet to start the game. Don’t have one? No worries, we’ll guide you through the setup.",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { initializeGame, selectedDifficulty, username, setQuestions } =
    useGameStore();

  const handleStartGame = async () => {
    if (!selectedDifficulty || !username) return;

    setIsLoading(true);
    setError(null);

    try {
      const geniusService = GeniusService.getInstance();
      const snippets = await geniusService.getRandomLyricSnippets("", 20);
      const filtered = snippets.filter(
        (s) => s.difficulty === selectedDifficulty
      );

      if (filtered.length === 0) {
        throw new Error("No questions available for selected difficulty");
      }

      const formatted = filtered.map((snippet) => {
        const correctOption = `${snippet.songTitle} - ${snippet.artist}`;
        const otherSongChoices = filtered
          .filter((s) => s.songTitle !== snippet.songTitle)
          .map((s) => `${s.songTitle} - ${s.artist}`);

        const additionalOptions = [];
        while (additionalOptions.length < 3 && otherSongChoices.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * otherSongChoices.length
          );
          const randomChoice = otherSongChoices.splice(randomIndex, 1)[0];
          additionalOptions.push(randomChoice);
        }

        const options = [correctOption, ...additionalOptions];
        const shuffledOptions = options.sort(() => 0.5 - Math.random());

        return {
          lyricsSnippet: snippet.lyricsSnippet,
          correctAnswer: correctOption,
          difficulty: snippet.difficulty,
          options: selectedDifficulty === "Beginner" ? shuffledOptions : [],
        };
      });

      console.log("Formatted Questions:", formatted);
      setQuestions(formatted);
      initializeGame();
    } catch (err) {
      console.error("Game initialization failed:", err);
      setError(err.message || "Failed to start game. Please try again.");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <section
      id="howItWorks"
      className="bg-[#490878] px-4 py-12"
    >
      <div className="mx-auto max-w-7xl text-center border-red-500 py-[100px]">
        {/* Header Section */}
        <div className="">
          <h2 className="pb-4 text-5xl font-semibold text-[#FFFFFF] md:text-5xl lg:text-6xl">
            How it works
          </h2>
          <p className="text-lg text-[#FFFFFF] md:text-xl">
            Have fun testing your lyrical knowledge in three (3) easy steps 😊
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-8 md:grid-cols-3 my-16">
          {steps.map((step, index) => (
            <div className="space-y-4 my-10" key={index}>
              <h3
                key={index}
                className="text-2xl font-bold text-[#FFFFFF] lg:text-3xl pb-3"
              >
                {step.title}
              </h3>
              <p className="mx-auto max-w-sm text-[#FFFFFF]"></p>
              <p>{step.text}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className=" flex flex-col items-center justify-center gap-4 md:flex-row ">
          <button
            className="w-full rounded-full bg-[#70E3C7] px-[69px] py-6 font-semibold text-[#090909] transition md:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Play Game
          </button>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Guess the song"
          >
            <GameSetupForm onStart={handleStartGame} />
          </Modal>
          <button className="w-full rounded-full border-2 border-[#70E3C7] px-[51px] py-6  font-semibold text-[#70E3C7] md:w-auto">
            Connect Wallet
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
