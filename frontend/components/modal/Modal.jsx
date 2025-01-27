"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";
import { GameSetupForm } from "./GameSetupForm";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStartGame = () => {
    console.log("Starting game...");
    setIsModalOpen(false);
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
