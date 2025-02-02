import React, { useState } from 'react';
import { IoGameController } from "react-icons/io5";
import { Modal } from './modal';
import { GameSetupForm } from '../modal/GameSetupForm';
import { useGameStore } from '@/store/gameStore';
import GeniusService from '@/services/geniusService';
// import { Modal } from "./ui/modal";


function PlayAgainButton({ onClick }) {

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleStartGame = () => {
  //   console.log("Starting game...");
  //   setIsModalOpen(false);
  // };

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
    <>
      <button
        className=" text-center rounded-lg border-2 border-[#70E3C7] hover:bg-[#70E3C7] hover:text-[#490878] transition-colors duration-300 bottom-4 right-4 shadow-lg flex items-center gap-2 px-4 py-2"
        onClick={() => setIsModalOpen(true)}
        >
        <IoGameController className="text-2xl" />
        <span className="text-[15px]">Play Game</span>
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Guess the song"
      >
        <GameSetupForm onStart={handleStartGame} />
      </Modal>
    </>
  );
}

export default PlayAgainButton;
