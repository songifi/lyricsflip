"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { GameSetupForm } from "./GameSetupForm";
import { useGameStore } from "@/store/gameStore";
import GeniusService from "@/services/geniusService";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { initializeGame, selectedDifficulty, username } = useGameStore();

  // const handleStartGame = async () => {
  //   if (!selectedDifficulty || !username) return;

  //   try {
  //     await initializeGame(); // This will start the game with the selected difficulty
  //     setIsModalOpen(false); // Close the modal after game starts
  //   } catch (error) {
  //     console.error("Failed to start game:", error);
  //   }
  // };

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
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button
        onClick={() => setIsModalOpen(true)}
        className="bg-[#7CEBC5] text-black hover:bg-[#7CEBC5]/90"
      >
        Play Game
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Guess the song"
      >
        <GameSetupForm onStart={handleStartGame} />
      </Modal>
    </div>
  );
}
