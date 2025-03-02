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
      <SelectTrigger className="h-10 w-full rounded-lg transition-colors duration-300 focus:ring-0 bg-white/90">
        <SelectValue placeholder="Select Difficulty" />
      </SelectTrigger>
      <SelectContent className="border-2 border-primary-light/20 rounded-lg bg-white/95 backdrop-blur-sm">
        <SelectItem 
          value="Beginner"
          className="hover:bg-primary-light/10 rounded-[6px] transition-colors"
        >
          Beginner
        </SelectItem>
        <SelectItem 
          value="Intermediate"
          className="hover:bg-primary-light/10 rounded-[6px] transition-colors"
        >
          Intermediate
        </SelectItem>
        <SelectItem 
          value="Advanced"
          className="hover:bg-primary-light/10 rounded-[6px] transition-colors"
        >
          Advanced
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DifficultySelect;
