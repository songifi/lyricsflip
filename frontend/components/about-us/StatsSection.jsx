"use client";

import { motion } from "framer-motion";

const StatsSection = () => {
  const stats = [
    { number: "10K+", label: "Active Players" },
    { number: "50K+", label: "Songs Available" },
    { number: "100K+", label: "Games Played" },
    { number: "5K+", label: "Daily Winners" }
  ];

  return (
    <section className="py-20" aria-labelledby="stats-section">
      <div className="container mx-auto px-4">
        <h2 id="stats-section" className="sr-only">
          Key Statistics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl font-bold text-primary-main mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
