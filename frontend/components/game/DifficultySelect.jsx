"use client";

import { useGameStore } from "@/store/gameStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DifficultySelect = () => {
  const { selectedDifficulty, setDifficulty } = useGameStore();
  const handleValueChange = (value) => {
    // Prevent event propagation
    setDifficulty(value);
  };

  return (
    <Select value={selectedDifficulty} onValueChange={handleValueChange}>
      <SelectTrigger className="h-10 w-full">
        <SelectValue placeholder="Select Difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Beginner">Beginner</SelectItem>
        <SelectItem value="Intermediate">Intermediate</SelectItem>
        <SelectItem value="Advanced">Advanced</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DifficultySelect;
