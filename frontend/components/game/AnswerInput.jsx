import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useGameStore } from "../../store/gameStore";
import { theme } from "../../styles/theme";

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
    className={`min-w-full p-3 lg:w-[392px] lg:h-[70px] text-left text-[16px] text-[${
      theme.colors.text.primary
    }] rounded-lg transition-colors border disabled:cursor-not-allowed
      ${
        isSelected && isCorrect
          ? `bg-[${theme.colors.status.success}] border-green-400`
          : isSelected && !isCorrect
          ? `bg-[${theme.colors.status.error}] border-red-400`
          : !isSelected && isCorrect && isAnswerSubmitted
          ? `bg-[${theme.colors.primary.light}] border-green-200`
          : `bg-[${theme.colors.background.paper}] border-[${theme.colors.primary.light}]`
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
      const correctSongTitle = currentQuestion.correctAnswer
        .split(" - ")[0]
        .toLowerCase()
        .trim();
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
        className={`input input-bordered input-lg w-[70%] rounded-lg bg-[${
          theme.colors.background.default
        }] border-[${theme.colors.primary.light}] text-[${
          theme.colors.text.secondary
        }] text-[14px] ${
          isAnswerSubmitted
            ? isAnswerCorrect
              ? `bg-[${theme.colors.status.success}]`
              : `bg-[${theme.colors.status.error}]`
            : "bg-gray-200"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      />
      <button
        onClick={() => handleSubmitAnswer(userAnswer)}
        disabled={isAnswerSubmitted}
        className={`w-[70%] text-sm/6 font-semibold px-[32px] py-[24px] text-center text-[16px] rounded-full transition-colors ${
          isAnswerSubmitted
            ? isAnswerCorrect
              ? `text-green-700 bg-green-300 hover:bg-green-400`
              : `text-red-700 bg-red-300 hover:bg-red-400`
            : `text-[${theme.colors.primary.main}] bg-[${theme.colors.primary.light}] hover:bg-[${theme.colors.primary.hover}]`
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

// Define reusable question prop type
const questionPropType = PropTypes.shape({
  correctAnswer: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
});

AnswerInput.propTypes = {
  onAnswer: PropTypes.func.isRequired,
};

AnswerInput.defaultProps = {
  onAnswer: () => {},
};

export default AnswerInput;
