import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SinglePlayerPage from './page';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, replace: jest.fn(), prefetch: jest.fn() }),
  useSearchParams: () => new URLSearchParams('roundId=round-1'),
}));

const mockSystemCalls = {
  getRound: jest.fn().mockResolvedValue({
    id: 'round-1',
    question: 'Which artist released the album "Thriller"?',
    options: ['Michael Jackson', 'Prince', 'Madonna', 'Whitney Houston'],
    correctAnswer: 'Michael Jackson',
  }),
  submitAnswer: jest.fn().mockResolvedValue({ correct: true }),
};

jest.mock('@/hooks/useStellar', () => ({
  useStellar: () => ({ systemCalls: mockSystemCalls }),
}));

jest.mock('@/hooks/useGameTimer', () => ({
  useGameTimer: () => ({ remaining: 60, isRunning: true, start: jest.fn(), stop: jest.fn() }),
}));

describe('SinglePlayerPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads a round and renders a question with four options', async () => {
    render(<SinglePlayerPage />);

    await waitFor(() => {
      expect(mockSystemCalls.getRound).toHaveBeenCalledWith('round-1');
    });

    expect(
      await screen.findByText(/which artist released the album/i)
    ).toBeInTheDocument();

    expect(screen.getAllByRole('button', { name: /michael jackson|prince|madonna|whitney houston/i })).toHaveLength(4);
  });

  it('accepts an answer', async () => {
    render(<SinglePlayerPage />);

    const option = await screen.findByRole('button', { name: /michael jackson/i });
    fireEvent.click(option);

    await waitFor(() => {
      expect(mockSystemCalls.submitAnswer).toHaveBeenCalled();
    });
  });
});
