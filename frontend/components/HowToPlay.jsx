"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaWallet, FaUser, FaHeadphones } from "react-icons/fa";
import { MusicBackground } from "@/components/how-to-play/MusicBackground";
import { AudioWave } from "@/components/how-to-play/AudioWave";
import { StepCard } from "@/components/how-to-play/StepCard";
import { BonusSection } from "@/components/how-to-play/BonusSection";
import { ActionButtons } from "@/components/how-to-play/ActionButtons";

const steps = [
  {
    title: "Connect Your Beat Box",
    text: "Link your wallet in seconds and unlock the full rhythm of rewards. New to crypto? We'll drop the beat-by-beat guide to get you flowing.",
    icon: <FaWallet className="mb-4 text-5xl text-primary-light" />,
    animation: "bounce",
  },
  {
    title: "Drop Your Stage Name",
    text: "Create your musical alter ego and let the world know who's about to top the lyrical leaderboards. Your legend starts with a name.",
    icon: <FaUser className="mb-4 text-5xl text-primary-light" />,
    animation: "pulse",
  },
  {
    title: "Spin the Genre & Jam",
    text: "From hip-hop to rock, pop to indie - pick your sonic playground and start guessing lyrics to earn while you learn. The stage is yours!",
    icon: <FaHeadphones className="mb-4 text-5xl text-primary-light" />,
    animation: "shake",
  },
];

const HowItWorks = () => {
  const [hoveredStep, setHoveredStep] = useState(null);

  return (
    <section
      id="howItWorks"
      className="relative bg-teal dark:bg-[#490878] overflow-hidden bg-gradient-to-br from-[#490878] via-[#2a0545] to-[#1c0731] px-4 py-12"
      role="region" 
      aria-labelledby="how-it-works-heading"
    >
      {/* Animated background */}
      <MusicBackground />

      {/* Decorative vinyl records */}
      <div
        className="absolute w-64 h-64 bg-black border-8 border-gray-700 rounded-full -left-32 top-1/4 opacity-40 animate-spin-slow"
        aria-hidden="true"
      ></div>
      <div
        className="absolute w-48 h-48 bg-black border-4 border-gray-700 rounded-full -right-32 bottom-1/4 opacity-30 animate-spin-slow"
        aria-hidden="true"
      ></div>

      <div className="relative mx-auto max-w-7xl text-center py-[100px]">
        {/* Header Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-2">
            <span
              id="how-it-works-heading"
              className="inline-block px-4 py-1 mb-4 text-sm font-semibold tracking-wider rounded-full md:text-5xl lg:text-6xl bg-primary-light bg-opacity-20 text-primary-light"
              role="heading"
              aria-level="2"
            >
              HOW IT WORKS
            </span>
          </div>

          <h2
            className=" dark:bg-black text-black pb-4 text-5xl font-bold text-white md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary-light to-purple-300"
           // className="pb-4 text-5xl font-bold text-transparent text-white md:text-5xl lg:text-6xl bg-clip-text bg-gradient-to-r from-primary-light to-purple-300"
            aria-labelledby="how-it-works-heading"
          >
            Drop the Beat, Earn the Treat
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-white md:text-xl">
            Master lyrics, collect tokens, and climb the charts in three easy
            moves. Ready to prove your music IQ? 🎧
          </p>

          <AudioWave />
        </motion.div>

        {/* Steps Grid */}
        <div className="grid gap-8 my-16 md:grid-cols-3" role="list">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              hoveredStep={hoveredStep}
              setHoveredStep={setHoveredStep}
              isLast={index === steps.length - 1}
              aria-label={`Step ${index + 1}: ${step.title}`}
              role="listitem"
            />
          ))}
        </div>

        {/* Action Buttons */}
        <ActionButtons aria-label="Action buttons" />

        {/* Bonus Section */}
        <BonusSection />
      </div>

      {/* Glass-morphism bottom effect */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gradient-to_1 to-transparent"
        aria-hidden="true"
      ></div>
    </section>
  );
};

export default HowItWorks;
