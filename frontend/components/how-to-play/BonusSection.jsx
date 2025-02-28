"use client";
import { motion } from "framer-motion";
import { FaTrophy } from "react-icons/fa";

export const BonusSection = () => (
  <motion.div 
    className="mt-20 p-6 bg-black bg-opacity-40 backdrop-blur-sm rounded-xl max-w-2xl mx-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.8 }}
  >
    <div className="flex items-center justify-center gap-3 mb-4">
      <FaTrophy className="text-yellow-400 text-3xl" />
      <h3 className="text-2xl font-bold text-white">Earn While You Learn</h3>
    </div>
    <p className="text-white opacity-90">
      Every correct guess earns you crypto rewards! The faster you identify the lyrics, the bigger your earnings. Challenge friends, climb global leaderboards, and become the ultimate music maestro.
    </p>
  </motion.div>
);
