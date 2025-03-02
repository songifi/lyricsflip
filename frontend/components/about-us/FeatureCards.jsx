"use client";

import { motion } from "framer-motion";
import { Music, Trophy, Wallet } from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      icon: <Music className="w-12 h-12 text-primary-light" />,
      title: "Interactive Gameplay",
      description: "Test your music knowledge with our innovative card-flipping game mechanics"
    },
    {
      icon: <Trophy className="w-12 h-12 text-primary-light" />,
      title: "Compete & Win",
      description: "Challenge friends and climb the leaderboard to prove your musical expertise"
    },
    {
      icon: <Wallet className="w-12 h-12 text-primary-light" />,
      title: "Earn Rewards",
      description: "Win tokens and unlock exclusive features as you play and improve"
    }
  ];

  return (
    <div className="relative z-[5] container mx-auto px-4 -mt-20">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-xl shadow-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300"
            aria-labelledby={`feature-title-${index}`}
            aria-describedby={`feature-description-${index}`}
          >
            <div className="bg-primary-main/10 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-semibold text-primary-main mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
