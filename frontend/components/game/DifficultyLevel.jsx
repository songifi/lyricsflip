import React from "react";
import { Star } from "lucide-react";
import { theme } from "@/theme"; // Import theme

const DifficultyLevel = ({
  difficulty,
  size = 16,
  customColors = {},
  className = "",
}) => {
  // Determine star color based on difficulty, allowing overrides via props
  const getStarColor = (level) => {
    const defaultColors = {
      beginner: theme.colors.primary.light,
      intermediate: theme.colors.status.warning,
      expert: theme.colors.status.error,
    };

    return (
      customColors[level?.toLowerCase()] ||
      defaultColors[level?.toLowerCase()] ||
      theme.colors.text.secondary
    );
  };

  return (
    <div className={`flex items-center gap-1 text-text-primary ${className}`}>
      <span>{difficulty}</span>
      <Star
        size={size}
        fill={getStarColor(difficulty)}
        color={getStarColor(difficulty)}
        className="inline-block"
      />
    </div>
  );
};

export default DifficultyLevel;
