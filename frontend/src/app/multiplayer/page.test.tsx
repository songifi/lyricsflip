import { render, screen, fireEvent } from "@testing-library/react";
import MultiplayerPage from "./page";

const push = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push }),
}));

describe("MultiplayerPage", () => {
  beforeEach(() => {
    push.mockClear();
  });

  it("renders the join-by-round-ID and create-round surfaces", () => {
    render(<MultiplayerPage />);

    expect(
      screen.getByRole("heading", { name: /multiplayer/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/round id/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /join round/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create round/i })
    ).toBeInTheDocument();
  });

  it("navigates to the lobby when joining by round ID", () => {
    render(<MultiplayerPage />);

    fireEvent.change(screen.getByLabelText(/round id/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /join round/i }));

    expect(push).toHaveBeenCalledWith("/multiplayer/123");
  });

  it("does not reference the hard-coded sample-room-id", () => {
    render(<MultiplayerPage />);

    expect(document.body.textContent).not.toMatch(/sample-room-id/i);
  });
});
