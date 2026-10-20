import React from 'react';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import SinglePlayerPage from './page';
import { CARD_TIMEOUT_SECONDS } from '@/features/game/hooks/use-card-timer';

const mockGetRound = jest.fn();
const mockGetRoundCards = jest.fn();
const mockStartRound = jest.fn();
const mockNextCard = jest.fn();
const mockNextCardWithMeta = jest.fn();
const mockBuildQuestionCard = jest.fn();
const mockSubmitAnswer = jest.fn();
const mockSubmitAnswerWithMeta = jest.fn();
const mockGetPlayerStat = jest.fn();
const mockClaimReward = jest.fn();

const mockSystemCalls = {
  getRound: mockGetRound,
  getRoundCards: mockGetRoundCards,
  startRound: mockStartRound,
  nextCard: mockNextCard,
  nextCardWithMeta: mockNextCardWithMeta,
  buildQuestionCard: mockBuildQuestionCard,
  submitAnswer: mockSubmitAnswer,
  submitAnswerWithMeta: mockSubmitAnswerWithMeta,
  getPlayerStat: mockGetPlayerStat,
  claimReward: mockClaimReward,
};

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn(), prefetch: jest.fn() }),
  useSearchParams: () => new URLSearchParams('roundId=1'),
}));

jest.mock('@/lib/stellar/hooks/use-stellar', () => ({
  useStellar: () => ({
    account: { address: 'GPLAYER1' },
    systemCalls: mockSystemCalls,
  }),
}));

jest.mock('@/lib/confetti', () => ({ fireConfetti: jest.fn() }));

const round = {
  round_id: BigInt(1),
  admin: 'GADMIN',
  genre: 'Pop' as const,
  wager_amount: BigInt(0),
  start_time: BigInt(1_000),
  is_started: true,
  is_completed: false,
  end_time: BigInt(9_999_999_999),
  next_card_index: 0,
  is_cancelled: false,
};

const card = {
  card_id: BigInt(7),
  genre: 'Pop' as const,
  artist: 'Michael Jackson',
  title: 'Thriller',
  year: BigInt(1982),
  difficulty: 1,
  lyrics: 'Cause this is thriller',
};

const question = {
  lyric: 'Cause this is thriller',
  timestamp: BigInt(0),
  kind: 'Title' as const,
  option_one: 'Thriller',
  option_two: 'Bad',
  option_three: 'Beat It',
  option_four: 'Smooth Criminal',
};

describe('SinglePlayerPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetRound.mockResolvedValue(round);
    mockGetRoundCards.mockResolvedValue([BigInt(7)]);
    mockNextCard.mockResolvedValue(card);
    mockNextCardWithMeta.mockResolvedValue({ result: card, closedAtMs: null, startedAtMs: Date.now() });
    mockBuildQuestionCard.mockResolvedValue(question);
    mockSubmitAnswer.mockResolvedValue(true);
    mockSubmitAnswerWithMeta.mockResolvedValue({ result: true, closedAtMs: null });
  });

  it('loads the round and renders the lyric with four answer options', async () => {
    render(<SinglePlayerPage />);

    expect(await screen.findByText('Cause this is thriller')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /option 1: thriller/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /^option \d/i })).toHaveLength(4);
  });

  it('submits the selected answer as a Title answer', async () => {
    render(<SinglePlayerPage />);

    fireEvent.click(
      await screen.findByRole('button', { name: /option 1: thriller/i }),
    );

    await waitFor(() =>
      expect(mockSubmitAnswerWithMeta).toHaveBeenCalledWith(BigInt(1), {
        tag: 'Title',
        values: ['Thriller'],
      }),
    );
  });

  it('reveals the answer and counts the card after answering', async () => {
    render(<SinglePlayerPage />);

    fireEvent.click(
      await screen.findByRole('button', { name: /option 1: thriller/i }),
    );

    expect(await screen.findByRole('button', { name: /next card/i })).toBeInTheDocument();
  });

  it('closes the answer window when the card deadline has already passed', async () => {
    const startedAtMs = Date.now() - (CARD_TIMEOUT_SECONDS + 2) * 1000;
    mockNextCardWithMeta.mockResolvedValue({ result: card, closedAtMs: null, startedAtMs });

    render(<SinglePlayerPage />);

    const option = await screen.findByRole('button', { name: /option 1: thriller/i });
    await waitFor(() => expect(option).toBeDisabled());
  });

  it('shows "Too late" when the contract scores a click submitted after the window', async () => {
    const startedAtMs = Date.now();
    mockNextCardWithMeta.mockResolvedValue({ result: card, closedAtMs: null, startedAtMs });
    mockSubmitAnswerWithMeta.mockResolvedValue({
      result: false,
      closedAtMs: startedAtMs + (CARD_TIMEOUT_SECONDS + 3) * 1000,
    });

    render(<SinglePlayerPage />);

    fireEvent.click(
      await screen.findByRole('button', { name: /option 1: thriller/i }),
    );

    expect(await screen.findByText('Too late')).toBeInTheDocument();
  });

  it('keeps "Submitting…" visible until the answer transaction is confirmed', async () => {
    let resolveSubmit: (value: {
      result: boolean;
      closedAtMs: number | null;
    }) => void = () => {};
    mockSubmitAnswerWithMeta.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveSubmit = resolve;
        }),
    );

    render(<SinglePlayerPage />);

    fireEvent.click(
      await screen.findByRole('button', { name: /option 1: thriller/i }),
    );

    expect(await screen.findByText('Submitting…')).toBeInTheDocument();

    await act(async () => {
      resolveSubmit({ result: true, closedAtMs: Date.now() });
    });

    await waitFor(() =>
      expect(screen.queryByText('Submitting…')).not.toBeInTheDocument(),
    );
  });

  it('shows "Wrong" when an in-time answer is simply incorrect', async () => {
    const startedAtMs = Date.now();
    mockNextCardWithMeta.mockResolvedValue({ result: card, closedAtMs: null, startedAtMs });
    mockSubmitAnswerWithMeta.mockResolvedValue({
      result: false,
      closedAtMs: startedAtMs + 2_000,
    });

    render(<SinglePlayerPage />);

    fireEvent.click(
      await screen.findByRole('button', { name: /option 2: bad/i }),
    );

    expect(await screen.findByText('Wrong')).toBeInTheDocument();
  });
});
