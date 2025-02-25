import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useGameStore } from "../../store/gameStore";

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
    className={`min-w-full p-3 lg:w-[392px] lg:h-[70px] text-left text-[16px] text-[#090909] rounded-lg transition-colors border disabled:cursor-not-allowed
      ${
        isSelected && isCorrect
          ? "bg-[#2EAE4E] border-green-400"
          : isSelected && !isCorrect
          ? "bg-[#CE0000] border-red-400"
          : !isSelected && isCorrect && isAnswerSubmitted
          ? "bg-[#70E3C7CC] border-green-200"
          : "bg-[#EEFCF8CC] border-[#CBF6EA]"
      }
    `}
  >
    {option}
  </button>
);

MCQOption.propTypes = {
  option: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  isAnswerSubmitted: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const AnswerInput = ({ onAnswer }) => {
  const { getCurrentQuestion, handleAnswer, selectedDifficulty } =
    useGameStore();
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);

  const currentQuestion = getCurrentQuestion();

  useEffect(() => {
    setUserAnswer("");
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setIsAnswerCorrect(false);
  }, [currentQuestion]);

  const validateAnswer = (answer) => {
    if (selectedDifficulty === "Beginner") {
      return answer === currentQuestion.correctAnswer;
    } else {
      const correctSongTitle = currentQuestion.correctAnswer.split(" - ")[0].toLowerCase().trim();
      return correctSongTitle === answer.toLowerCase().trim();
    }
  };

  const handleSubmitAnswer = (answer) => {
    const isCorrect = validateAnswer(answer);
    setIsAnswerSubmitted(true);
    setIsAnswerCorrect(isCorrect);
    handleAnswer(isCorrect);
    onAnswer(isCorrect);
  };

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
        className={`input input-bordered input-lg w-[70%] rounded-[8px] bg-white border-[#70E3C7] text-[#666666] text-[14px] ${
          isAnswerSubmitted
            ? isAnswerCorrect
              ? "bg-[#2EAE4E]"
              : "bg-[#CE0000]"
            : "bg-gray-200"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      <button
        onClick={() => handleSubmitAnswer(userAnswer)}
        disabled={isAnswerSubmitted}
        className={`w-[70%] text-sm/6 font-semibold px-[32px] py-[24px] text-center text-[16px] rounded-[1000px] transition-colors ${
          isAnswerSubmitted
            ? isAnswerCorrect
              ? "text-green-700 bg-green-300 hover:bg-green-400"
              : "text-red-700 bg-red-300 hover:bg-red-400"
            : "text-[#490878] bg-[#92f2da] hover:bg-[#5bc4ab]"
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

AnswerInput.propTypes = {
  onAnswer: PropTypes.func.isRequired,
};

export default AnswerInput;
