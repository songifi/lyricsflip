"use client";
import { useGameStore } from "@/store/gameStore";

const DifficultySelect = () => {
  const { selectedDifficulty, setDifficulty } = useGameStore();

  return (
    <select
      value={selectedDifficulty}
      onChange={(e) => setDifficulty(e.target.value)}
      className="px-6 py-3 bg-white text-[#490878] rounded-lg border-2 border-[#92f2da] 
        focus:outline-none focus:border-[#5bc4ab] text-lg w-64"
    >
      <option value="">Select Difficulty</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
    </select>
  );
};

export default DifficultySelect;
