import React, { useState, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { theme } from "../../theme";

const MCQOption = ({
  option,
  isCorrect,
  isSelected,
  onSelect,
  isAnswerSubmitted,
  disabled,
}) => (
  <button
    onClick={onSelect}
    disabled={disabled}
    className={`min-w-full p-3 lg:w-[392px] lg:h-[70px] text-left text-[16px] text-${
      theme.colors.text.primary
    } rounded-lg transition-colors border disabled:cursor-not-allowed
      ${
        isSelected && isCorrect
          ? `bg-${theme.colors.status.success} border-${theme.colors.status.success}`
          : isSelected && !isCorrect
          ? `bg-${theme.colors.status.error} border-${theme.colors.status.error}`
          : !isSelected && isCorrect && isAnswerSubmitted
          ? `bg-${theme.colors.primary.light} border-${theme.colors.status.success}`
          : `bg-${theme.colors.background.paper} border-${theme.colors.primary.light}`
      }
    `}
  >
    {option}
  </button>
);

const AnswerInput = ({ onAnswer }) => {
  const { getCurrentQuestion, handleAnswer, selectedDifficulty } =
    useGameStore();
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const currentQuestion = getCurrentQuestion();

  useEffect(() => {
    // Reset state when the question changes
    setUserAnswer("");
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(false);
  }, [currentQuestion]);

  const validateAnswer = (answer) => {
    if (selectedDifficulty === "Beginner") {
      // For MCQ, compare the full string (song title - artist)
      return answer === currentQuestion.correctAnswer;
    } else {
      // For text input, only compare the song title
      const correctSongTitle = currentQuestion.correctAnswer
        .split(" - ")[0]
        .toLowerCase()
        .trim();
      const userSongTitle = answer.toLowerCase().trim();
      return correctSongTitle === userSongTitle;
    }
  };

  const handleSubmitAnswer = (answer) => {
    const isCorrect = validateAnswer(answer);
    setIsAnswerSubmitted(true);
    setIsAnswerCorrect(isCorrect);
    handleAnswer(isCorrect);
    onAnswer(isCorrect);
  };

  // Render MCQ for Beginner difficulty
  if (selectedDifficulty === "Beginner" && currentQuestion.options) {
    return (
      <div className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <MCQOption
              key={index}
              option={option}
              isCorrect={option === currentQuestion.correctAnswer}
              isSelected={selectedOption === option}
              isAnswerSubmitted={isAnswerSubmitted}
              disabled={isAnswerSubmitted}
              onSelect={() => {
                if (!isAnswerSubmitted) {
                  setSelectedOption(option);
                  handleSubmitAnswer(option);
                }
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Default text input for Intermediate and Advanced
  return (
    <div className="w-full flex flex-col items-center justify-center space-y-4 mx-auto p-4">
      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !isAnswerSubmitted) {
            handleSubmitAnswer(userAnswer);
          }
        }}
        placeholder="Type your guess here"
        disabled={isAnswerSubmitted}
        className={`input input-bordered input-lg w-[70%] rounded-[8px] bg-${
          theme.colors.background.default
        } border-${theme.colors.primary.light} text-${
          theme.colors.text.secondary
        } text-[14px] ${
          isAnswerSubmitted
            ? isAnswerCorrect
              ? `bg-${theme.colors.status.success}`
              : `bg-${theme.colors.status.error}`
            : "bg-gray-200"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      <p id="answer-status" className="sr-only">
        {isAnswerSubmitted ? (isAnswerCorrect ? "Correct" : "Incorrect") : ""}
      </p>
      <button
        onClick={() => handleSubmitAnswer(userAnswer)}
        disabled={isAnswerSubmitted}
        aria-label={
          isAnswerSubmitted
            ? isAnswerCorrect
              ? "Correct answer"
              : "Incorrect answer"
            : "Submit answer"
        }
        className={`w-[70%] text-sm/6 font-semibold px-[32px] py-[24px] text-center text-[16px] rounded-[1000px] transition-colors ${
          isAnswerSubmitted
            ? isAnswerCorrect
              ? `text-${theme.colors.status.success} bg-${theme.colors.primary.light} hover:bg-${theme.colors.primary.hover}`
              : `text-${theme.colors.status.error} bg-${theme.colors.status.error} hover:bg-${theme.colors.primary.hover}`
            : `text-${theme.colors.primary.main} bg-${theme.colors.primary.light} hover:bg-${theme.colors.primary.hover}`
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isAnswerSubmitted
          ? isAnswerCorrect
            ? "Correct"
            : "Incorrect"
          : "Submit"}
      </button>
    </div>
  );
};

export default AnswerInput;
