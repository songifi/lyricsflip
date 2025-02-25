"use client";

import PropTypes from "prop-types";
import { useGameStore } from "@/store/gameStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/**
 * DifficultySelect Component
 * A dropdown component that allows users to select a game difficulty level.
 *
 * @component
 * @example
 * return <DifficultySelect />
 */
const DifficultySelect = ({ className }) => {
  const { selectedDifficulty, setDifficulty } = useGameStore();

  /**
   * Handles the change of difficulty selection.
   *
   * @param {string} value - Selected difficulty level.
   */
  const handleValueChange = (value) => {
    setDifficulty(value);
  };

  return (
    <Select value={selectedDifficulty} onValueChange={handleValueChange}>
      <SelectTrigger
        className={`h-10 w-full rounded-lg transition-colors duration-300 focus:ring-0 bg-white/90 ${className}`}
      >
        <SelectValue placeholder="Select Difficulty" />
      </SelectTrigger>
      <SelectContent className="border-2 border-[#70E3C7]/20 rounded-lg bg-white/95 backdrop-blur-sm">
        {["Beginner", "Intermediate", "Advanced"].map((level) => (
          <SelectItem
            key={level}
            value={level}
            className="hover:bg-[#70E3C7]/10 rounded-[6px] transition-colors"
          >
            {level}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

DifficultySelect.propTypes = {
  /** Additional class names for custom styling */
  className: PropTypes.string,
};

DifficultySelect.defaultProps = {
  className: "",
};

export default DifficultySelect;
