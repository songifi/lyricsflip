import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import MultiplayerRoundPage from './page';

const mockPush = jest.fn();
const mockGetRound = jest.fn();
const mockGetRoundPlayers = jest.fn();
const mockJoinRound = jest.fn();
const mockStartRound = jest.fn();

jest.mock('next/navigation', () => ({
  useParams: () => ({ roundId: '123' }),
  useRouter: () => ({ push: mockPush, back: jest.fn() }),
}));

jest.mock('@/lib/stellar/hooks/use-stellar', () => ({
  useStellar: () => ({
    systemCalls: {
      getRound: mockGetRound,
      getRoundPlayers: mockGetRoundPlayers,
      joinRound: mockJoinRound,
      startRound: mockStartRound,
    },
    account: { address: 'GPLAYER1' },
    connect: jest.fn(),
  }),
}));

jest.mock('@/hooks/use-round-events', () => ({
  useRoundEvents: () => ({
    joined: ['GPLAYER2'],
    ready: [],
    started: false,
    error: null,
  }),
}));

const baseRound = {
  round_id: BigInt(123),
  admin: 'GHOSTHOST',
  genre: 'Pop' as const,
  wager_amount: BigInt(0),
  start_time: BigInt(0),
  is_started: false,
  is_completed: false,
  end_time: BigInt(0),
  next_card_index: 0,
  is_cancelled: false,
};

describe('multiplayer/[roundId] lobby', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetRound.mockResolvedValue(baseRound);
    mockGetRoundPlayers.mockResolvedValue(['GPLAYER1', 'GPLAYER2']);
    mockJoinRound.mockResolvedValue(undefined);
    mockStartRound.mockResolvedValue(undefined);
  });

  it('lists the players from contract state', async () => {
    render(<MultiplayerRoundPage />);

    expect(await screen.findByText('GPLAYER1 (you)')).toBeInTheDocument();
    expect(screen.getByText('GPLAYER2')).toBeInTheDocument();
    expect(screen.getByText(/Players \(2\)/)).toBeInTheDocument();
  });

  it('readies up through start_round', async () => {
    render(<MultiplayerRoundPage />);

    const ready = await screen.findByRole('button', { name: /ready/i });
    fireEvent.click(ready);

    await waitFor(() =>
      expect(mockStartRound).toHaveBeenCalledWith(BigInt(123)),
    );
  });

  it('joins the round when the wallet is not a participant yet', async () => {
    mockGetRoundPlayers.mockResolvedValue(['GPLAYER2']);

    render(<MultiplayerRoundPage />);

    await waitFor(() =>
      expect(mockJoinRound).toHaveBeenCalledWith(BigInt(123)),
    );
  });

  it('shows an error when the round cannot be loaded', async () => {
    mockGetRound.mockRejectedValue(new Error('boom'));

    render(<MultiplayerRoundPage />);

    expect(
      await screen.findByText(/does not exist or could not be loaded/i),
    ).toBeInTheDocument();
  });
});
