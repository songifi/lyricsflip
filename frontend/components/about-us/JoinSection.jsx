"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const JoinSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-main to-primary-light text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 id="join-section" className="text-4xl font-bold mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-xl mb-8">
            Whether you're a casual listener or a die-hard music fan, LyricFlip offers 
            a unique and entertaining way to experience the world of lyrics.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/signup"
              className="bg-white text-primary-main px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
            >
              Join Now
            </Link>
            <Link 
              href="/play"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary-main transition-all"
            >
              Try Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
