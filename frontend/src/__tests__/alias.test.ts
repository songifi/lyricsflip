// src/__tests__/alias.test.ts
import { render } from '@testing-library/react';
import GameComponent from "@/components/game-component";
import React from 'react';

// Mock the Stellar hooks
jest.mock('@/lib/stellar/hooks/use-stellar', () => ({
  useStellar: () => ({
    account: null,
    systemCalls: {},
    setup: null,
    isLoading: false,
    error: null,
  })
}));

describe('game-component', () => {
  test("GameComponent should be imported correctly", () => {
    expect(GameComponent).toBeDefined();
  });

  test("GameComponent should render without crashing", () => {
    const { container } = render(React.createElement(GameComponent));
    expect(container).toBeTruthy();
  });
});