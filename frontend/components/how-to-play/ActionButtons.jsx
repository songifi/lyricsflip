"use client";
import { motion } from "framer-motion";
import { FaPlay, FaWallet } from "react-icons/fa";
import { Modal } from "../ui/modal";
import { GameSetupForm } from "../modal/GameSetupForm";
import { useGameStore } from "@/store/gameStore";

export const ActionButtons = () => {
  const { handleStartGame, isModalOpen, setIsModalOpen } = useGameStore();

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6 md:flex-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <motion.button
        className="group w-full rounded-full bg-gradient-to-r from-primary-light to-purple-500 px-[69px] py-6 font-bold text-text-primary shadow-lg hover:shadow-[0_0_25px_rgba(123,31,162,0.6)] transition md:w-auto relative overflow-hidden"
        onClick={() => setIsModalOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <FaPlay /> Start Guessing
          <span className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></span>
        </span>
      </motion.button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Guess the song"
      >
        <GameSetupForm onStart={handleStartGame} />
      </Modal>

      <motion.button
        className="group w-full rounded-full border-2 border-primary-light px-[51px] py-6 font-bold text-primary-light hover:bg-primary-light hover:text-text-primary transition md:w-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center justify-center gap-2">
          <FaWallet /> Connect Wallet
        </span>
      </motion.button>
    </motion.div>
  );
};
