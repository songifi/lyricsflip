"use client";
import React, { memo, useEffect, useState } from "react";
import { useGameStore } from "../../store/gameStore";

const MCQOption = memo(
  ({ option, isCorrect, isSelected, onSelect, disabled }) => (
    <button
      onClick={onSelect}
      disabled={disabled}
      className={`w-full p-3 text-left text-[20px] text-[#090909] rounded-lg transition-colors bg-[#EEFCF8CC] border border-[#CBF6EA]
      ${isCorrect ? "bg-[#2EAE4E] !border-green-400" : ""}
      ${isSelected && !isCorrect ? "bg-[#CE0000] !border-red-400" : ""}
      ${
        !disabled ? "bg-white hover:bg-gray-100 border-gray-200" : "bg-gray-100"
      }
      disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {option}
    </button>
  )
);

MCQOption.displayName = "MCQOption";

const TextInput = memo(({ value, onChange, onSubmit, disabled }) => (
  <div className="w-full space-y-2">
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyPress={(e) => e.key === "Enter" && !disabled && onSubmit()}
      placeholder="Type your guess here"
      disabled={disabled}
      className="input input-bordered input-lg w-full text-black bg-gray-200 
        disabled:opacity-50 disabled:cursor-not-allowed"
    />
    <button
      onClick={onSubmit}
      disabled={disabled}
      className="w-full text-sm/6 font-semibold px-3 py-1.5 text-center rounded-lg 
        transition-colors text-[#490878] bg-[#92f2da] hover:bg-[#5bc4ab]
        disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Submit
    </button>
  </div>
));
TextInput.displayName = "TextInput";

const AnswerInput = () => {
  const {
    gameStatus,
    handleSubmitGuess,
    getCurrentQuestion,
    guess,
    setGuess,
    handleNextQuestion,
  } = useGameStore();

  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const currentQuestion = getCurrentQuestion();

  useEffect(() => {
    // Reset state when new question loads
    setSelectedOption(null);
    setSubmitted(false);
  }, [currentQuestion]);

  useEffect(() => {
    if (gameStatus === "success" || gameStatus === "failed") {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus, handleNextQuestion]);

  if (!currentQuestion) return null;

  const { difficulty, options, correctAnswer } = currentQuestion;
  const isDisabled = submitted || gameStatus !== "playing";

  const handleSubmit = (submittedGuess) => {
    if (isDisabled) return;
    setSubmitted(true);
    handleSubmitGuess(submittedGuess, correctAnswer);
  };

  if (difficulty === "Beginner") {
    return (
      <div className="grid grid-cols-2 gap-4 w-full">
        {options.map((option, index) => (
          <MCQOption
            key={index}
            option={option}
            onSelect={() => {
              setSelectedOption(option);
              handleSubmit(option);
            }}
            disabled={isDisabled}
            isCorrect={submitted && option === correctAnswer}
            isSelected={submitted && option === selectedOption}
          />
        ))}
      </div>
    );
  }

  return (
    <TextInput
      value={guess}
      onChange={(e) => setGuess(e.target.value)}
      onSubmit={() => handleSubmit(guess)}
      disabled={isDisabled}
    />
  );
};

export default memo(AnswerInput);
