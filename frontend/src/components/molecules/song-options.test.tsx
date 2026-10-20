import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SongOptions } from "./song-options";

const options = ["Option A", "Option B", "Option C", "Option D"];

function renderOptions(overrides: Partial<React.ComponentProps<typeof SongOptions>> = {}) {
  const onSelect = vi.fn();
  const props: React.ComponentProps<typeof SongOptions> = {
    options,
    selected: null,
    correct: null,
    disabled: false,
    onSelect,
    questionKind: "multiple-choice",
    ...overrides,
  };
  const utils = render(<SongOptions {...props} />);
  return { ...utils, onSelect };
}

describe("SongOptions", () => {
  it("renders a radio group with one radio per option", () => {
    renderOptions();
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(options.length);
  });

  it("selects an option on click", async () => {
    const user = userEvent.setup();
    const { onSelect } = renderOptions();
    await user.click(screen.getByRole("radio", { name: "Option B" }));
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it("marks the selected option as checked", () => {
    renderOptions({ selected: 2 });
    expect(screen.getByRole("radio", { name: "Option C" })).toHaveAttribute("aria-checked", "true");
  });

  it("supports arrow-key navigation and Enter/Space activation", async () => {
    const user = userEvent.setup();
    const { onSelect } = renderOptions({ selected: 0 });
    const first = screen.getByRole("radio", { name: "Option A" });
    first.focus();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("radio", { name: "Option B" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledWith(1);
    await user.keyboard("{Space}");
    expect(onSelect).toHaveBeenCalledWith(1);
  });

  it("does not fire onSelect when disabled", async () => {
    const user = userEvent.setup();
    const { onSelect } = renderOptions({ disabled: true });
    const option = screen.getByRole("radio", { name: "Option A" });
    expect(option).toHaveAttribute("aria-disabled", "true");
    await user.click(option);
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("highlights the correct and wrong answers after reveal", () => {
    renderOptions({ selected: 1, correct: 2 });
    expect(screen.getByRole("radio", { name: "Option C" })).toHaveAttribute("data-state", "correct");
    expect(screen.getByRole("radio", { name: "Option B" })).toHaveAttribute("data-state", "wrong");
    expect(screen.getByRole("radio", { name: "Option A" })).toHaveAttribute("data-state", "idle");
  });
});
