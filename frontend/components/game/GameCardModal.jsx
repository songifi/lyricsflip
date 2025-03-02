import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '@/store/gameStore';


const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    const {resetGame } = useGameStore();
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black"
            style={{ opacity: 0.5 }}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
          {/* Modal Card */}
          <motion.div
            className="relative bg-gray-100 rounded-[24px] border border-gray-200 p-6 w-[304px] z-10"
            initial={{ scale: 0.8, opacity: 0, rotateY: -10 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h2 className="text-center mb-4 font-bold">
              Are you sure you want to quit the game?
            </h2>
            <div className="flex justify-around">
              <button
                onClick={resetGame}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Quit
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-primary-light text-white rounded hover:bg-[#5fcfb5] transition"
              >
                No
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
