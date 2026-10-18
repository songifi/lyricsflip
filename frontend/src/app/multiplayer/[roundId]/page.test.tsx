import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MultiplayerRoundPage from "./page";

const mockUseRoundEvents = jest.fn();

jest.mock("@/hooks/useRoundEvents", () => ({
  useRoundEvents: (...args: unknown[]) => mockUseRoundEvents(...args),
}));

jest.mock("next/navigation", () => ({
  useParams: () => ({ roundId: "123" }),
}));

const baseRound = {
  id: "123",
  host: "GHOSTHOST",
  players: ["GPLAYER1", "GPLAYER2"],
  ready: ["GPLAYER1"],
  status: "lobby" as const,
};

describe("multiplayer/[roundId] lobby", () => {
  beforeEach(() => {
    mockUseRoundEvents.mockReset();
  });

  it("renders the lobby and lists players from contract state", () => {
    mockUseRoundEvents.mockReturnValue({
      round: baseRound,
      loading: false,
      error: null,
      startRound: jest.fn(),
      setReady: jest.fn(),
    });

    render(<MultiplayerRoundPage />);

    expect(screen.getByText(/lobby/i)).toBeInTheDocument();
    expect(screen.getByText("GPLAYER1")).toBeInTheDocument();
    expect(screen.getByText("GPLAYER2")).toBeInTheDocument();
  });

  it("shows the invite link for the round", () => {
    mockUseRoundEvents.mockReturnValue({
      round: baseRound,
      loading: false,
      error: null,
      startRound: jest.fn(),
      setReady: jest.fn(),
    });

    render(<MultiplayerRoundPage />);

    const invite = screen.getByRole("textbox", { name: /invite/i });
    expect(invite).toHaveValue(expect.stringContaining("/multiplayer/123"));
  });

  it("toggles ready state and starts the round", async () => {
    const setReady = jest.fn();
    const startRound = jest.fn();
    mockUseRoundEvents.mockReturnValue({
      round: baseRound,
      loading: false,
      error: null,
      startRound,
      setReady,
    });

    render(<MultiplayerRoundPage />);

    await userEvent.click(screen.getByRole("button", { name: /ready/i }));
    expect(setReady).toHaveBeenCalled();

    await userEvent.click(screen.getByRole("button", { name: /start/i }));
    expect(startRound).toHaveBeenCalled();
  });

  it("renders an error state when the round fails to load", async () => {
    mockUseRoundEvents.mockReturnValue({
      round: null,
      loading: false,
      error: "Round not found",
      startRound: jest.fn(),
      setReady: jest.fn(),
    });

    render(<MultiplayerRoundPage />);

    await waitFor(() =>
      expect(screen.getByText(/round not found/i)).toBeInTheDocument()
    );
  });
});
