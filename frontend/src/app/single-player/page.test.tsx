import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SinglePlayerPage from './page';

const mockGetRound = jest.fn();
const mockGetRoundCards = jest.fn();
const mockStartRound = jest.fn();
const mockNextCard = jest.fn();
const mockBuildQuestionCard = jest.fn();
const mockSubmitAnswer = jest.fn();
const mockGetPlayerStat = jest.fn();
const mockClaimReward = jest.fn();

const mockSystemCalls = {
  getRound: mockGetRound,
  getRoundCards: mockGetRoundCards,
  startRound: mockStartRound,
  nextCard: mockNextCard,
  buildQuestionCard: mockBuildQuestionCard,
  submitAnswer: mockSubmitAnswer,
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
    mockBuildQuestionCard.mockResolvedValue(question);
    mockSubmitAnswer.mockResolvedValue(true);
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
      expect(mockSubmitAnswer).toHaveBeenCalledWith(BigInt(1), {
        tag: 'Title',
        values: ['Thriller'],
      }),
    );
  });

  it('shows the remaining round time derived from the contract end_time', async () => {
    const endTime = BigInt(Math.floor(Date.now() / 1000) + 120);
    mockGetRound.mockResolvedValue({ ...round, end_time: endTime });

    render(<SinglePlayerPage />);

    const timeLeft = await screen.findByTestId('round-time-left');
    expect(timeLeft).toHaveTextContent('02:00');
  });

  it('reveals the answer and counts the card after answering', async () => {
    render(<SinglePlayerPage />);

    fireEvent.click(
      await screen.findByRole('button', { name: /option 1: thriller/i }),
    );

    expect(await screen.findByRole('button', { name: /next card/i })).toBeInTheDocument();
  });
});
