import React from "react";
import PropTypes from "prop-types";
import { Star } from "lucide-react";

/**
 * DifficultyLevel Component
 * Displays a difficulty label with a corresponding colored star icon.
 *
 * @param {string} difficulty - The difficulty level ("beginner", "intermediate", "expert").
 */
const DifficultyLevel = ({ difficulty }) => {
  /**
   * Determines star color based on difficulty level.
   * @param {string} level - Difficulty level.
   * @returns {string} - Corresponding hex color.
   */
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

DifficultyLevel.propTypes = {
  difficulty: PropTypes.oneOf(["beginner", "intermediate", "expert"]).isRequired,
};

DifficultyLevel.defaultProps = {
  difficulty: "beginner", // Default difficulty level
};

export default DifficultyLevel;
