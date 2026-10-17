import { MOCK_LYRICS } from '@/mock/mock';
import { LyricData, SongOption, useStore } from '@/store';
import { useEffect, useState } from 'react';

const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useSinglePlayer = (genre: string) => {
  const gameStore = useStore((state) => state.game);
  const [currentLyric, setCurrentLyric] = useState<LyricData | null>(null);
  const [nextLyric, setNextLyric] = useState<LyricData | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SongOption | null>(null);
  const [correctOption, setCorrectOption] = useState<SongOption | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [gameResult, setGameResult] = useState<{
    isWin: boolean;
    isMultiplayer: boolean;
  } | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  // Start game and timer
  useEffect(() => {
    if (genre && gameStore.gameStatus === 'playing') {
      const firstLyric = MOCK_LYRICS[Math.floor(Math.random() * MOCK_LYRICS.length)];
      const secondLyric = MOCK_LYRICS[Math.floor(Math.random() * MOCK_LYRICS.length)];
      setCurrentLyric({ ...firstLyric, options: shuffleArray(firstLyric.options) });
      setNextLyric({ ...secondLyric, options: shuffleArray(secondLyric.options) });
      setIsGameStarted(true);
      setIsCardFlipped(false);
    }
    return () => {
      gameStore.stopTimer(); // Cleanup timer on unmount
    };
  }, [genre, gameStore.gameStatus]);

  // Monitor timeLeft and end game only once
  useEffect(() => {
    if (gameStore.timeLeft <= 0 && !gameResult && isGameStarted) {
      endGame(false);
    }
  }, [gameStore.timeLeft, gameResult, isGameStarted]);

  const startNewRound = () => {
    if (gameStore.currentRound >= gameStore.maxRounds) {
      endGame(true); // End if max rounds reached
      return;
    }
    const randomLyric =
      MOCK_LYRICS[Math.floor(Math.random() * MOCK_LYRICS.length)];
    const shuffledOptions = shuffleArray(randomLyric.options);
    setCurrentLyric({ ...randomLyric, options: shuffledOptions });
    setSelectedOption(null);
    setCorrectOption(null);
    // Flip card to show new lyrics
    setIsCardFlipped(!isCardFlipped);
  };

  const handleSongSelect = (option: SongOption) => {
    if (!currentLyric || selectedOption || gameResult) return; // Prevent selection after game end

    setSelectedOption(option);
    setCorrectOption({
      title: currentLyric.title,
      artist: currentLyric.artist,
    });

    const isCorrect = option.title === currentLyric.title;
    const newWrongAttempts = isCorrect ? 0 : wrongAttempts + 1;

    if (isCorrect) {
      gameStore.increaseScore();
      gameStore.setGuessResult('correct');
      setWrongAttempts(0);

      // Check if this is the last round
      if (gameStore.currentRound + 1 >= gameStore.maxRounds) {
        setTimeout(() => endGame(true), 2000);
        return;
      }
    } else {
      gameStore.setGuessResult('incorrect');
      setWrongAttempts(newWrongAttempts);
      if (newWrongAttempts >= gameStore.gameConfig.odds) {
        setTimeout(() => endGame(false), 2000);
        return;
      }
    }

    // Move to next round if not ended
    setTimeout(() => startNewRound(), 2000);
  };

  const endGame = (didWin: boolean) => {
    if (gameResult) return; // Ensure called only once
    setGameResult({
      isWin: didWin,
      isMultiplayer: false,
    });
    gameStore.endGame();
  };

  const resetGame = () => {
    gameStore.resetGame();
    setIsGameStarted(false);
    setCurrentLyric(null);
    setNextLyric(null);
    setGameResult(null);
    setWrongAttempts(0);
    setIsCardFlipped(false);
  };

  return {
    currentLyric,
    nextLyric,
    isGameStarted,
    selectedOption,
    correctOption,
    handleSongSelect,
    gameResult,
    resetGame,
    isCardFlipped,
  };
};