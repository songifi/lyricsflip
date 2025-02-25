"use client";

import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useGameStore } from "@/store/gameStore";
import DifficultySelect from "../game/DifficultySelect";

export function GameSetupForm({ onStart, className = "", ...props }) {
  const { setDifficulty, setUsername, selectedDifficulty, username } =
    useGameStore();

  const handleSubmit = () => {
    if (!username || !selectedDifficulty) return;
    setUsername(username);
    onStart();
  };

  return (
    <div className={`space-y-6 ${className}`} {...props}>
      <div className="flex flex-col gap-2.5 items-start">
        <p className="text-base text-black font-medium -mb-1">
          Ready to show your lyrical prowess?🌚
        </p>
        <p className="text-[12px] text-[#666666]">
          Fill in the form below to continue
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Username Input */}
        <div className="space-y-2 flex flex-col items-start">
          <label htmlFor="username" className="text-sm font-medium text-[#212121]">
            Username
          </label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="h-10 !border-2 !border-[#70E3C7]/30 hover:!border-[#70E3C7]/50 focus:!border-[#70E3C7] rounded-lg transition-colors duration-300 focus:ring-0 bg-white/90"
          />
        </div>

        {/* Genre Selection */}
        <FormSelect label="Genre" options={["Pop", "Rock", "Hip Hop", "Jazz"]} />

        {/* Difficulty Level */}
        <div className="space-y-2 flex flex-col items-start">
          <label htmlFor="difficulty" className="text-sm font-medium text-[#212121]">
            Difficulty Level
          </label>
          <div className="border-2 border-[rgba(113,227,199,0.3)] hover:border-[rgba(113,227,199,0.5)] rounded-lg transition-colors duration-300 w-full">
            <DifficultySelect />
          </div>
        </div>

        {/* Duration Selection */}
        <FormSelect label="Duration" options={["5 minutes", "10 minutes", "15 minutes"]} />

        {/* Game Mode Selection */}
        <FormSelect label="Game Mode" options={["Single Player", "Multiplayer"]} />

        {/* Players Selection */}
        <FormSelect label="Players" options={["2 Players", "3 Players", "4 Players"]} />
      </div>

      {/* Start Game Button */}
      <div className="max-w-[300px] mx-auto pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!username || !selectedDifficulty}
          className="w-full bg-[#70E3C7] py-7 text-md font-bold text-black hover:bg-[#70E3C7]/90 rounded-full disabled:opacity-50"
        >
          Start Game
        </Button>
      </div>
    </div>
  );
}

// **Reusable FormSelect Component for DRY Code**
const FormSelect = ({ label, options }) => (
  <div className="space-y-2 flex flex-col items-start">
    <label className="text-sm font-medium text-[#212121]">{label}</label>
    <div className="h-10 w-full">
      <Select>
        <SelectTrigger className="h-10 border-2 border-[#70E3C7]/30 hover:border-[#70E3C7]/50 focus:border-[#70E3C7] rounded-lg transition-colors duration-300 focus:ring-0 bg-white/90">
          <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="border-2 border-[#70E3C7]/20 rounded-lg bg-white/95 backdrop-blur-sm">
          {options.map((option, index) => (
            <SelectItem key={index} value={option.toLowerCase()} className="rounded-[6px] transition-colors duration-200 hover:bg-transparent">
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>
);

GameSetupForm.propTypes = {
  onStart: PropTypes.func.isRequired,
  className: PropTypes.string,
};

FormSelect.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GameSetupForm;
