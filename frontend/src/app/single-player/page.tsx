"use client";
import { SongOptions } from '@/components/molecules/song-options';
import { StatisticsPanel } from '@/components/molecules/statistics-panel';
import { LyricCard } from '@/components/organisms/lyric-card';
import BadgeModal from '@/components/organisms/new-badge-modal';
import {
  useCardTimer,
  CARD_TIMEOUT_SECONDS,
  CARD_LEDGER_LATENCY_SECONDS,
} from '@/features/game/hooks/use-card-timer';
import { fireConfetti } from '@/lib/confetti';
import { formatAmount, formatTime, WAGER_ASSET_CODE } from '@/lib/utils';
import { useStellar } from '@/lib/stellar/hooks/use-stellar';
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
  type QuestionKind,
  type Round,
} from '@/lib/stellar/types';
import { useGameTimer } from '@/features/game/hooks/use-game-timer';

interface SongOption {
  title: string;
  artist: string;
}

const MILESTONE_NAMES: Record<Milestone, string> = {
  [MILESTONES.FirstWin]: 'First Win',
  [MILESTONES.Streak5]: 'Streak Master',
  [MILESTONES.TenWins]: 'Music Connoisseur',
};

/** All question kinds the contract supports (LF-029). */
const QUESTION_KINDS: QuestionKind[] = ['Title', 'Artist', 'Year'];

/** Prompt shown above the options for each question kind. */
const QUESTION_PROMPTS: Record<QuestionKind, string> = {
  Title: 'Name the song',
  Artist: 'Name the artist',
  Year: 'Name the year',
};

/**
 * Pick the question kind for the next card. When a round setting is supplied
 * via the `kind` query param we honour it; otherwise we rotate through the
 * three kinds so every round exercises all of them.
 */
function pickQuestionKind(
  roundSetting: string | null,
  cardIndex: number,
): QuestionKind {
  if (roundSetting) {
    const match = QUESTION_KINDS.find(
      (kind) => kind.toLowerCase() === roundSetting.toLowerCase(),
    );
    if (match) return match;
  }
  return QUESTION_KINDS[cardIndex % QUESTION_KINDS.length];
}

/**
 * Parse a year option into a BigInt for `Answer.year`. Returns null when the
 * option isn't a valid non-negative integer so callers can guard against
 * submitting garbage to the contract.
 */
function parseYearOption(option: string): bigint | null {
  const trimmed = option.trim();
  if (!/^\d+$/.test(trimmed)) return null;
  try {
    return BigInt(trimmed);
  } catch {
    return null;
  }
}

export default function SinglePlayerGame() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roundId = searchParams?.get('roundId') ?? null;
  const kindSetting = searchParams?.get('kind') ?? null;
  const { account, systemCalls } = useStellar();

  const [round, setRound] = useState<Round | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [card, setCard] = useState<Card | null>(null);
  const [question, setQuestion] = useState<QuestionCard | null>(null);
  const [questionKind, setQuestionKind] = useState<QuestionKind>('Title');
  const [totalCards, setTotalCards] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SongOption | null>(null);
  const [correctOption, setCorrectOption] = useState<SongOption | null>(null);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [score, setScore] = useState(0);
  // Ledger close time (unix ms) that opened the current card's answer window.
  const [cardStartedAtMs, setCardStartedAtMs] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [answerResult, setAnswerResult] = useState<
    'correct' | 'wrong' | 'late' | null
  >(null);

  // Exactly one round timer: it derives the remaining time from the round's
  // on-chain `end_time`, so a page refresh resumes with the correct value
  // instead of restarting the countdown.
  const { timeLeft } = useGameTimer({
    endTimeSeconds: round ? round.end_time : null,
  });

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
    isGameStarted &&
    question !== null &&
    selectedOption === null &&
    !isCardFlipped &&
    !isSubmitting;

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

  const {
    timeLeft: cardTimeLeft,
    isExpired: isCardWindowClosed,
    reset: resetCardTimer,
  } = useCardTimer({
    isActive: cardTimerActive,
    onTimeout: handleCardTimeout,
    // Anchor the countdown to the ledger that included `next_card` instead of
    // the moment this component rendered (LF-193).
    startedAtMs: cardStartedAtMs,
  });

  // ── Contract data fetching ────────────────────────────────────────────────
  const loadNextCard = useCallback(async () => {
    if (!systemCalls || !roundId) return;
    const id = BigInt(roundId);
    setSelectedOption(null);
    setCorrectOption(null);
    setAnswerResult(null);
    setIsCardFlipped(false);
    setCardStartedAtMs(null);
    resetCardTimer();
    setTxStatus('Drawing next card…');
    const { result: nextCard, startedAtMs } = await systemCalls.nextCardWithMeta(id);
    setTxStatus('Building question…');
    // Rotate (or honour the round setting) so all three kinds get played.
    const kind = pickQuestionKind(kindSetting, answeredCount);
    const questionCard = await systemCalls.buildQuestionCard(nextCard, kind);
    setQuestionKind(kind);
    setCard(nextCard);
    setQuestion(questionCard);
    // The contract's 15 s window started when `next_card` closed in a ledger,
    // which is several seconds before this line runs.
    setCardStartedAtMs(startedAtMs);
    setTxStatus(null);
  }, [answeredCount, kindSetting, roundId, systemCalls, resetCardTimer]);

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
  }, [roundId, systemCalls, loadNextCard]);

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
  // The contract returns every option as a string, including years, so we keep
  // them as-is and only convert to BigInt at submit time.
  const options: SongOption[] = question
    ? [
        question.option_one,
        question.option_two,
        question.option_three,
        question.option_four,
      ].map((option) => ({ title: option, artist: '' }))
    : [];

  const isRoundFinished = totalCards > 0 && answeredCount >= totalCards;

  // ── Answer handling ───────────────────────────────────────────────────────
  const handleAnswer = useCallback(
    async (option: SongOption) => {
      if (!systemCalls || !roundId || !card || selectedOption !== null) return;
      setSelectedOption(option);
      setIsCardFlipped(true);
      setCorrectOption({ title: card.title, artist: card.artist });
      setAnswerResult(null);

      // Build the Answer variant that matches the question kind. Year options
      // arrive as strings, so parse them safely before hitting the contract.
      let answer: Answer;
      if (questionKind === 'Artist') {
        answer = Answer.artist(option.title);
      } else if (questionKind === 'Year') {
        const year = parseYearOption(option.title);
        if (year === null) {
          setError(`Invalid year option: ${option.title}`);
          return;
        }
        answer = Answer.year(year);
      } else {
        answer = Answer.title(option.title);
      }

      try {
        const id = BigInt(roundId);
        // Show "Submitting…" until the transaction is included in a ledger;
        // the contract, not the client clock, decides whether it was in time.
        setIsSubmitting(true);
        setTxStatus('Submitting answer…');
        const { result: isCorrect, closedAtMs } =
          await systemCalls.submitAnswerWithMeta(id, answer);

        // `submit_answer` returns false for a wrong answer *and* for an answer
        // that landed after the card window. The ledger close time of the
        // submission tells the two apart (LF-193).
        const windowClosesAtMs =
          cardStartedAtMs === null
            ? null
            : cardStartedAtMs + CARD_TIMEOUT_SECONDS * 1000;
        const wasLate =
          !isCorrect &&
          closedAtMs !== null &&
          windowClosesAtMs !== null &&
          closedAtMs > windowClosesAtMs;

        if (isCorrect) {
          setScore((prev) => prev + 1);
          fireConfetti();
        }
        setAnswerResult(isCorrect ? 'correct' : wasLate ? 'late' : 'wrong');
        await systemCalls.submitAnswer(id, answer);
        setAnsweredCount((prev) => prev + 1);
        setTxStatus(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to submit answer');
        setTxStatus(null);
      } finally {
        setIsSubmitting(false);
      }
    },
    [card, cardStartedAtMs, questionKind, roundId, selectedOption, systemCalls],
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
        time={formatTime(timeLeft)}
        potWin={`${formatAmount(round?.wager_amount ?? 0)} ${WAGER_ASSET_CODE}`}
        scores={`${score} / ${totalCards}`}
      />

      {question && (
        <section className="flex flex-col gap-4">
          <LyricCard
            lyrics={[
              {
                text: question.lyric,
                title: card?.title ?? '',
                artist: card?.artist ?? '',
              },
            ]}
            isFlipped={isCardFlipped}
          />

          <p className="text-sm font-semibold text-gray-900">
            {QUESTION_PROMPTS[questionKind]}
          </p>

          <p className="text-xs text-gray-500">
            Answers close {CARD_LEDGER_LATENCY_SECONDS}s early to cover one
            ledger of submission latency.
          </p>

          {isSubmitting && (
            <p role="status" className="text-sm font-medium text-purple-600">
              Submitting…
            </p>
          )}

          {answerResult && !isSubmitting && (
            <p
              role="status"
              className={
                answerResult === 'correct'
                  ? 'text-sm font-semibold text-green-600'
                  : 'text-sm font-semibold text-red-600'
              }
            >
              {answerResult === 'correct'
                ? 'Correct'
                : answerResult === 'late'
                  ? 'Too late'
                  : 'Wrong'}
            </p>
          )}

          <SongOptions
            options={options}
            selectedOption={selectedOption}
            correctOption={correctOption}
            disabled={
              selectedOption !== null ||
              isSubmitting ||
              isCardWindowClosed ||
              isCardFlipped
            }
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
