"use client";
import { SongOptions } from '@/components/molecules/song-options';
import { StatisticsPanel } from '@/components/molecules/statistics-panel';
import GameResultPopup from '@/components/organisms/GameResultPopup';
import { LyricCard } from '@/components/organisms/LyricCard';
import { useStellar } from '@/lib/stellar/hooks/useStellar';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Round } from '@/lib/stellar/types';

interface SongOption {
  title: string;
  artist: string;
}

export default function SinglePlayerGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roundId = searchParams.get('roundId');
  const { systemCalls } = useStellar();
  const [round, setRound] = useState<Round | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLyric, setCurrentLyric] = useState<{
    text: string;
    title: string;
    artist: string;
    options: SongOption[];
  } | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SongOption | null>(null);
  const [correctOption, setCorrectOption] = useState<SongOption | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes default

  useEffect(() => {
    const fetchRoundData = async () => {
      if (!systemCalls) {
        setError('System calls not initialized');
        return;
      }

      if (roundId) {
        try {
          const roundData = await systemCalls.getRound(BigInt(roundId));
          setRound(roundData);
          setIsGameStarted(true);

          // TODO: Fetch current lyric from the contract
          // For now, using mock data
          setCurrentLyric({
            text: "Sample lyric text",
            title: "Sample Song",
            artist: "Sample Artist",
            options: [
              { title: "Sample Song", artist: "Sample Artist" },
              { title: "Wrong Song 1", artist: "Wrong Artist 1" },
              { title: "Wrong Song 2", artist: "Wrong Artist 2" },
              { title: "Wrong Song 3", artist: "Wrong Artist 3" }
            ]
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to get round data');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchRoundData();
  }, [roundId, systemCalls]);

  useEffect(() => {
    if (isGameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isGameStarted, timeLeft]);

  const handleSongSelect = async (option: SongOption, index: number) => {
    if (!round) return;
    
    setSelectedOption(option);
    setIsCardFlipped(true);
    
    try {
      // TODO: Implement answer submission against the contract
      // For now, just check if the option matches the current lyric
      const isCorrect = option.title === currentLyric?.title && option.artist === currentLyric?.artist;
      setCorrectOption(option);
      if (isCorrect) {
        setScore(prev => prev + 1);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="container mt-4 mx-auto h-fit w-full mb-20 lg:mb-12 p-4 lg:p-0 md:mt-24 lg:mt-32">
        <p>Loading game...</p>
      </div>
    );
  }

  if (error || !round) {
    return (
      <div className="container mt-4 mx-auto h-fit w-full mb-20 lg:mb-12 p-4 lg:p-0 md:mt-24 lg:mt-32">
        <p>{error || 'No round found'}</p>
        <button
          onClick={handleBack}
          className="mt-4 px-4 py-2 bg-purple-500 text-white rounded"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4 mx-auto h-fit w-full mb-20 lg:mb-12 p-4 lg:p-0 md:mt-24 lg:mt-32">
      <div className="mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold">Wager (Single Player)</h1>
        <p className="text-gray-600 text-sm">
          {`${round.genre.toString()} Genre | Expert Difficulty`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-start-2 lg:col-span-1 order-1 lg:order-2">
          <LyricCard
            lyrics={[
              {
                text: currentLyric?.text || 'Loading...',
                title: currentLyric?.title || 'Loading...',
                artist: currentLyric?.artist || 'Loading...',
              }
            ]}
            isFlipped={isCardFlipped}
          />
        </div>
        <div className="lg:col-start-3 lg:col-span-1 order-2 lg:order-3">
          <StatisticsPanel
            time={`${timeLeft}`}
            potWin={`${round.wager_amount.toString()} STRK`}
            scores={`${score} / 10`}
          />
        </div>
      </div>

      <SongOptions
        options={currentLyric?.options || []}
        onSelect={handleSongSelect}
        selectedOption={selectedOption}
        correctOption={correctOption}
      />
    </div>
  );
}