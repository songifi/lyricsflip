'use client'
import React, { useEffect, useState } from 'react';
import { useStellar } from '@/lib/stellar/hooks/useStellar';
import { useStore } from '../store';

const GameComponent = () => {
  const { systemCalls, account } = useStellar();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roundId, setRoundId] = useState<bigint | null>(null);
  const [isPlayer, setIsPlayer] = useState(false);

  // Keep theme from store for now
  const { user: { preferences: { theme } } } = useStore();

  useEffect(() => {
    const initializeGame = async () => {
      setIsLoading(true);
      setError(null);

      if (!systemCalls || !account) {
        setError('System not initialized');
        setIsLoading(false);
        return;
      }

      try {
        const result = await systemCalls.createRound('HipHop'); 
        setRoundId(result);
        const isPlayerInRound = await systemCalls.isRoundPlayer(result, account.address);
        setIsPlayer(isPlayerInRound);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize game');
      } finally {
        setIsLoading(false);
      }
    };

    initializeGame();
  }, [systemCalls, account]);

  const handleCheckPlayer = async () => {
    if (!roundId) return;
    try {
      setIsLoading(true);
      setError(null);
      
      if (!systemCalls || !account) {
        setError('System not initialized');
        return;
      }

      const isPlayerInRound = await systemCalls.isRoundPlayer(roundId, account.address);
      setIsPlayer(isPlayerInRound);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to check player status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`game-container ${theme}`}>
      <h1>Game Component</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!roundId ? (
            <button onClick={() => {
              setIsLoading(true);
              setError(null);
              if (!systemCalls || !account) {
                setError('System not initialized');
                setIsLoading(false);
                return;
              }
              systemCalls.createRound('HipHop').then(result => {
                setRoundId(result);
                systemCalls.isRoundPlayer(result, account.address).then(isPlayerInRound => {
                  setIsPlayer(isPlayerInRound);
                });
              }).catch(err => {
                setError(err instanceof Error ? err.message : 'Failed to start game');
              }).finally(() => {
                setIsLoading(false);
              });
            }}>
              Start New Game
            </button>
          ) : !isPlayer ? (
            <button onClick={handleCheckPlayer}>
              Check Player Status
            </button>
          ) : (
            <div>
              <p>Game in progress...</p>
              <p>Round ID: {roundId}</p>
            </div>
          )}
        </>
      )}
      
      <button onClick={() => useStore.getState().user.toggleTheme()}>
        Toggle Theme
      </button>
    </div>
  );
};

export default GameComponent;