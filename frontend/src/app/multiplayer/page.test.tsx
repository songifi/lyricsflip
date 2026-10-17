import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MultiplayerPage from './page';

const mockPush = jest.fn();
const mockCreateRound = jest.fn();
const mockConnect = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock('@/lib/stellar/hooks/use-stellar', () => ({
  useStellar: () => ({
    systemCalls: { createRound: mockCreateRound },
    account: { address: 'GCREATOR' },
    connect: mockConnect,
  }),
}));

describe('MultiplayerPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateRound.mockResolvedValue(BigInt(42));
  });

  it('renders the join-by-round-ID and create-round surfaces', () => {
    render(<MultiplayerPage />);

    expect(
      screen.getByRole('heading', { name: /multiplayer/i }),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter round id/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /join round/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /create round/i }),
    ).toBeInTheDocument();
  });

  it('navigates to the lobby when joining by round ID', () => {
    render(<MultiplayerPage />);

    fireEvent.change(screen.getByPlaceholderText(/enter round id/i), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByRole('button', { name: /join round/i }));

    expect(mockPush).toHaveBeenCalledWith('/multiplayer/123');
  });

  it('rejects a non-numeric round ID instead of navigating', () => {
    render(<MultiplayerPage />);

    fireEvent.change(screen.getByPlaceholderText(/enter round id/i), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByRole('button', { name: /join round/i }));

    expect(mockPush).not.toHaveBeenCalled();
    expect(screen.getByText(/must be a number/i)).toBeInTheDocument();
  });

  it('creates a round and navigates to it', async () => {
    render(<MultiplayerPage />);

    fireEvent.click(screen.getByRole('button', { name: /create round/i }));

    await waitFor(() => expect(mockCreateRound).toHaveBeenCalled());
    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/multiplayer/42'));
  });

  it('does not reference the hard-coded sample-room-id', () => {
    render(<MultiplayerPage />);

    expect(document.body.textContent).not.toMatch(/sample-room-id/i);
  });
});
