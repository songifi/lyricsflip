"use client";

import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative h-[60vh] bg-gradient-to-r from-primary-main to-primary-light">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-0 container mx-auto px-4 h-full flex items-center justify-center text-center"> {/* Added z-0 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Together we</h1>
          <h2 className="text-4xl md:text-6xl font-bold mb-8">make Music Fun</h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Join us in creating a world where music knowledge meets gaming excitement
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
