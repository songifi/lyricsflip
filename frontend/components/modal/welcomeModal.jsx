import { useState } from "react";

import { useGameSounds } from "@/hooks/useGameSound";
export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(true);
  const { playBackground } = useGameSounds();

  const handleClose = () => {
    setIsOpen(false);
    // playBackground();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Welcome to LyricsFlip</h2>
        <p className="text-gray-700">
          Get ready to test your lyrical knowledge and have fun!
        </p>
      </div>
    </div>
  );
}
