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

  return (
    <Select value={selectedDifficulty} onValueChange={setDifficulty}>
      <SelectTrigger className="h-10 w-full rounded-lg transition-colors duration-300 focus:ring-0 bg-white/90">
        <SelectValue placeholder="Select Difficulty" />
      </SelectTrigger>
      <SelectContent className="border-2 border-teal-300/20 rounded-lg bg-white/90 backdrop-blur-sm">
        <SelectItem
          value="Beginner"
          className="hover:bg-teal-100 rounded-md transition-colors"
        >
          Beginner
        </SelectItem>
        <SelectItem
          value="Intermediate"
          className="hover:bg-teal-100 rounded-md transition-colors"
        >
          Intermediate
        </SelectItem>
        <SelectItem
          value="Advanced"
          className="hover:bg-teal-100 rounded-md transition-colors"
        >
          Advanced
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default DifficultySelect;
