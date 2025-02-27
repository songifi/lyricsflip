import React from "react";
import PropTypes from "prop-types";
import { Star } from "lucide-react";

const DifficultyLevel = ({ difficulty }) => {
  // Determine Tailwind color class based on difficulty
  const getColorClass = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "text-teal-400";
      case "intermediate":
        return "text-amber-500";
      case "expert":
        return "text-red-500";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span className={getColorClass(difficulty)}>{difficulty}</span>
      <Star size={16} className={`inline-block ${getColorClass(difficulty)}`} />
    </div>
  );
};

DifficultyLevel.propTypes = {
  difficulty: PropTypes.oneOf(["beginner", "intermediate", "expert"])
    .isRequired,
};

export default DifficultyLevel;
