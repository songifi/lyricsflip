"use client";
import { SongOptions } from '@/components/molecules/song-options';
import { StatisticsPanel } from '@/components/molecules/statistics-panel';
import { LyricCard } from '@/components/organisms/LyricCard';
import BadgeModal from '@/components/organisms/new-badge-modal';
import { useCardTimer, CARD_TIMEOUT_SECONDS } from '@/features/game/hooks/useCardTimer';
import { fireConfetti } from '@/lib/confetti';
import { formatAmount, WAGER_ASSET_CODE } from '@/lib/utils';
import { useStellar } from '@/lib/stellar/hooks/useStellar';
import { getGenreDisplayName } from '@/lib/stellar/genres';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Answer,
  MILESTONES,
  type Card,
  type Milestone,
  type QuestionCard,
  type Round,
} from '@/lib/stellar/types';
import { useGameTimer } from '@/features/game/hooks/useGameTimer';

interface SongOption {
  title: string;
  artist: string;
}

const MILESTONE_NAMES: Record<Milestone, string> = {
  [MILESTONES.FirstWin]: 'First Win',
  [MILESTONES.Streak5]: 'Streak Master',
  [MILESTONES.TenWins]: 'Music Connoisseur',
};
// Default round duration in seconds (5 minutes)
const DEFAULT_ROUND_SECONDS = 300;

export default function SinglePlayerGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roundId = searchParams?.get('roundId') ?? null;
  const { account, systemCalls } = useStellar();

  // Use the single shared timer — no local setInterval here.
  const { timeLeft, startTimer, stopTimer, resetTimer } = useGameTimer();

  const [round, setRound] = useState<Round | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [question, setQuestion] = useState<QuestionCard | null>(null);
  const [totalCards, setTotalCards] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SongOption | null>(null);
  const [correctOption, setCorrectOption] = useState<SongOption | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [score, setScore] = useState(0);

  // Stop the timer when the component unmounts (e.g. user navigates away).
  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, [stopTimer]);

  // Badge modal state (Issue #476)
  const [isBadgeModalOpen, setIsBadgeModalOpen] = useState(false);
  const [earnedBadgeName, setEarnedBadgeName] = useState<string>('');
  const statusRef = useRef<HTMLParagraphElement>(null);

  // ── Per-card 15-second timer (Issue #472) ────────────────────────────────
  /**
   * The card timer is active while:
   *   - a card is loaded
   *   - no answer has been selected yet
   *   - the card isn't already flipped
   */
  const cardTimerActive =
    isGameStarted && question !== null && selectedOption === null && !isCardFlipped;

  const handleCardTimeout = useCallback(() => {
    // Time ran out – flip the card to reveal the answer and count as a miss
    if (card) {
      setCorrectOption({ title: card.title, artist: card.artist });
    }
    setIsCardFlipped(true);
    // selectedOption stays null → the wrong-answer highlight is skipped,
    // but the correct answer is revealed (same UX as a miss)
    setAnsweredCount((prev) => prev + 1);
  }, [card]);

  const { timeLeft: cardTimeLeft, reset: resetCardTimer } = useCardTimer({
    isActive: cardTimerActive,
    onTimeout: handleCardTimeout,
  });

  // Reset per-card timer when a new card loads
  useEffect(() => {
    if (question !== null) {
      resetCardTimer();
    }
  }, [question, resetCardTimer]);

  // ── Contract data fetching ────────────────────────────────────────────────
  const loadNextCard = useCallback(async () => {
    if (!systemCalls || !roundId) return;
    const id = BigInt(roundId);
    setSelectedOption(null);
    setCorrectOption(null);
    setIsCardFlipped(false);
    setTxStatus('Drawing next card…');
    const nextCard = await systemCalls.nextCard(id);
    setTxStatus('Building question…');
    const questionCard = await systemCalls.buildQuestionCard(nextCard, 'Title');
    setCard(nextCard);
    setQuestion(questionCard);
    setTxStatus(null);
  }, [roundId, systemCalls]);

  useEffect(() => {
    const fetchRoundData = async () => {
      if (!systemCalls) {
        setError('System calls not initialized');
        return;
      }
      if (!roundId) {
        setIsLoading(false);
        return;
      }
      try {
        const id = BigInt(roundId);
        let roundData = await systemCalls.getRound(id);
        if (!roundData.is_started) {
          setTxStatus('Starting round…');
          await systemCalls.startRound(id);
          roundData = await systemCalls.getRound(id);
        }
        const cards = await systemCalls.getRoundCards(id);
        setRound(roundData);
        setTotalCards(cards.length);
        setAnsweredCount(roundData.next_card_index);
        setIsGameStarted(true);

        // Initialise and start the shared timer for this round.
        resetTimer(DEFAULT_ROUND_SECONDS);
        startTimer();

        if (roundData.next_card_index < cards.length) {
          await loadNextCard();
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to get round data');
      } finally {
        setTxStatus(null);
        setIsLoading(false);
      }
    };
    fetchRoundData();
  }, [roundId, systemCalls, loadNextCard, resetTimer, startTimer]);

  // ── Milestone / badge check ───────────────────────────────────────────────
  const checkMilestoneAndShowBadge = useCallback(
    async (finalScore: number, total: number) => {
      if (!systemCalls || !account?.address) return;
      try {
        const stats = await systemCalls.getPlayerStat(account.address);
        let milestone: Milestone | null = null;
        if (stats.rounds_won === BigInt(1)) milestone = MILESTONES.FirstWin;
        else if (stats.current_streak === BigInt(5)) milestone = MILESTONES.Streak5;
        else if (stats.rounds_won === BigInt(10)) milestone = MILESTONES.TenWins;

        if (milestone !== null) {
          try {
            await systemCalls.claimReward(milestone);
          } catch {
            // Already claimed or contract error; still show the modal
          }
          setEarnedBadgeName(MILESTONE_NAMES[milestone]);
          setIsBadgeModalOpen(true);
        }
      } catch {
        // Non-critical
      }
    },
    [account?.address, systemCalls],
  );

  // ── Game options ──────────────────────────────────────────────────────────
  const options: SongOption[] = question
    ? [
        question.option_one,
        question.option_two,
        question.option_three,
        question.option_four,
      ].map((title) => ({ title, artist: '' }))
    : [];

  const isRoundFinished = totalCards > 0 && answeredCount >= totalCards;

  // ── Answer handling ───────────────────────────────────────────────────────
  const handleAnswer = useCallback(
    async (option: SongOption) => {
      if (!systemCalls || !roundId || !card || selectedOption !== null) return;
      setSelectedOption(option);
      setIsCardFlipped(true);
      setCorrectOption({ title: card.title, artist: card.artist });

      const isCorrect = option.title === card.title;
      if (isCorrect) {
        setScore((prev) => prev + 1);
        fireConfetti();
      }

      try {
        const id = BigInt(roundId);
        setTxStatus('Submitting answer…');
        await systemCalls.submitAnswer(id, isCorrect ? Answer.Correct : Answer.Wrong);
        setAnsweredCount((prev) => prev + 1);
        setTxStatus(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit answer');
        setTxStatus(null);
      }
    },
    [card, roundId, selectedOption, systemCalls],
  );

  const handleNextCard = useCallback(async () => {
    if (isRoundFinished) {
      await checkMilestoneAndShowBadge(score, totalCards);
      return;
    }
    await loadNextCard();
  }, [checkMilestoneAndShowBadge, isRoundFinished, loadNextCard, score, totalCards]);

  // ── Screen-reader status updates ──────────────────────────────────────────
  useEffect(() => {
    if (statusRef.current) {
      statusRef.current.textContent = txStatus ?? '';
    }
  }, [txStatus]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading round…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p role="alert" className="text-red-500">
          {error}
        </p>
        <button onClick={() => router.back()} className="underline">
          Go back
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <p className="text-sm text-gray-500">
          {round ? getGenreDisplayName(round.genre) : ''}
        </p>
      </header>

      <p ref={statusRef} aria-live="polite" className="sr-only" />

      <StatisticsPanel
        score={score}
        answeredCount={answeredCount}
        totalCards={totalCards}
        timeLeft={timeLeft}
        wagerLabel={`${formatAmount(round?.wager ?? 0)} ${WAGER_ASSET_CODE}`}
      />

      {question && (
        <section className="flex flex-col gap-4">
          <LyricCard
            card={card}
            question={question}
            isFlipped={isCardFlipped}
            correctOption={correctOption}
            selectedOption={selectedOption}
            timeLeft={cardTimeLeft}
            timeoutSeconds={CARD_TIMEOUT_SECONDS}
          />

          <SongOptions
            options={options}
            selectedOption={selectedOption}
            correctOption={correctOption}
            disabled={selectedOption !== null}
            onSelect={handleAnswer}
          />

          {selectedOption !== null && (
            <button
              onClick={handleNextCard}
              className="self-end rounded bg-black px-4 py-2 text-white"
            >
              {isRoundFinished ? 'Finish round' : 'Next card'}
            </button>
          )}
        </section>
      )}

      {txStatus && <p className="text-sm text-gray-500">{txStatus}</p>}

      <BadgeModal
        isOpen={isBadgeModalOpen}
        badgeName={earnedBadgeName}
        onClose={() => setIsBadgeModalOpen(false)}
      />
    </main>
  );
}
