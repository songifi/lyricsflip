"use client";
import { motion } from "framer-motion";

const audioWaveHeights = [
  [10, 30, 20, 15, 10],
  [15, 40, 25, 50, 15],
  [20, 35, 15, 45, 20],
  [12, 45, 30, 60, 12],
  [18, 30, 40, 25, 18],
  [14, 50, 20, 40, 14],
  [25, 35, 15, 30, 25],
  [10, 25, 45, 20, 10],
  [15, 30, 20, 55, 15],
  [22, 40, 25, 35, 22],
  [17, 45, 30, 40, 17],
  [13, 30, 50, 25, 13]
];

export const AudioWave = () => (
  <div className="flex items-end justify-center h-16 gap-1 my-4">
    {Array.from({ length: 12 }).map((_, i) => (
      <motion.div
        key={i}
        className="w-2 bg-primary-light rounded-full"
        initial={{ height: audioWaveHeights[i][0] }}
        animate={{ height: audioWaveHeights[i] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: i * 0.08,
        }}
      />
    ))}
  </div>
);
