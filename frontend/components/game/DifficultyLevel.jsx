import React from "react";
import { Star } from "lucide-react";

const DifficultyLevel = ({ difficulty }) => {
  // determine star color based on difficulty
  const getStarColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "#70E3C7";
      case "intermediate":
        return "#F59E0B";
      case "expert":
        return "#EF4444";
      default:
        return "#CBD5E1";
    }
  };

  return (
    <div className="flex items-center gap-1">
      <span>{difficulty}</span>
      <Star
        size={16}
        fill={getStarColor(difficulty)}
        color={getStarColor(difficulty)}
        className="inline-block"
      />
    </div>
  );
};

export default DifficultyLevel;
