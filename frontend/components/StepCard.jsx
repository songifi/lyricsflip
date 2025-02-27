"use client";
import { motion } from "framer-motion";
import ArrowIcon from "./ArrowIcon";

export const StepCard = ({ step, index, hoveredStep, setHoveredStep, isLast }) => {
  return (
    <motion.div
      className={`relative space-y-4 my-10 p-8 bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl shadow-[0_0_15px_rgba(123,31,162,0.5)] border border-primary-light border-opacity-20 transition transform duration-300 ease-in-out ${
        hoveredStep === index ? "scale-105 shadow-[0_0_25px_rgba(123,31,162,0.8)]" : ""
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      onMouseEnter={() => setHoveredStep(index)}
      onMouseLeave={() => setHoveredStep(null)}
    >
      {/* Step number badge */}
      <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-primary-light flex items-center justify-center text-[#090909] font-bold text-xl">
        {index + 1}
      </div>
      
      {/* Icon with animation */}
      <motion.div
        animate={hoveredStep === index ? { 
          scale: [1, 1.2, 1], 
          rotate: [0, 10, -10, 0]
        } : {}}
        transition={{ duration: 0.8, repeat: hoveredStep === index ? Infinity : 0 }}
      >
        {step.icon}
      </motion.div>
      
      <h3 className="text-2xl font-bold text-white lg:text-3xl pb-3">
        {step.title}
      </h3>
      <p className="text-white opacity-90">{step.text}</p>
      
      {/* Stylized arrow between steps (except last) */}
      {!isLast && (
        <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
           <ArrowIcon />
        </div>
      )}
    </motion.div>
  );
};
