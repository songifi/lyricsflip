"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const VisionSection = () => {
  const visionPoints = [
    "Innovative Gaming Experience",
    "Community-Driven Platform",
    "Rewarding Musical Journey",
    "Global Music Discovery"
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold text-primary-main">Our Vision</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We envision a world where music lovers can seamlessly blend their passion 
              for songs with interactive challenges, fostering a deeper appreciation for 
              the art of lyrics.
            </p>
            <div className="space-y-4">
              {visionPoints.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary-light" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/img/music-vision.jpg"
              alt="Music Vision"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;