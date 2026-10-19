// src/components/GameTimerDisplay.tsx
import { useEffect } from 'react';
import { useStore } from '@/store';
import { useGameTimer } from '../../features/game/hooks/use-game-timer';

export const GameTimerDisplay = () => {
  const { score, level, isPlaying } = useStore(state => state.game);
  const { 
    timeLeft, 
    isTimerRunning,
    startGame, 
    endGame,
    startTimer,
    stopTimer,
    resetTimer,
  } = useGameTimer();

  // Show alert when time runs out
  useEffect(() => {
    if (timeLeft === 0 && isPlaying) {
      endGame();
      alert("Time's up! Game over!");
    }
  }, [timeLeft, isPlaying, endGame]);

  const buttonStyle = {
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '14px',
    margin: '4px',
    opacity: 1,
    transition: 'opacity 0.2s',
    ':disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  };

  const dangerButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#dc3545',
  };

  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      padding: '20px',
      maxWidth: '500px',
      margin: '0 auto',
    }}>
      <h1 style={{ textAlign: 'center' }}>Game Timer</h1>
      
      <div style={{ 
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}>
        <h2>Game State</h2>
        <p>Score: {score}</p>
        <p>Level: {level}</p>
        <p>Status: {isPlaying ? (
          <span style={{ color: 'green' }}>Playing</span>
        ) : (
          <span style={{ color: 'red' }}>Game Over</span>
        )}</p>
        <p>Time Left: <span style={{ 
          fontWeight: 'bold',
          color: timeLeft <= 5 ? 'red' : 'black',
        }}>{timeLeft}s</span></p>
      </div>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
      }}>
        <button 
          onClick={() => {
            resetTimer();
            startGame();
          }}
          disabled={isPlaying}
          style={buttonStyle}
        >
          Start New Game
        </button>
        
        <button 
          onClick={endGame}
          disabled={!isPlaying}
          style={dangerButtonStyle}
        >
          End Game Early
        </button>
      </div>

      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
      }}>
        <h2>Timer Controls</h2>
        <button 
          onClick={startTimer}
          disabled={!isPlaying || isTimerRunning}
          style={buttonStyle}
        >
          Resume Timer
        </button>
        
        <button 
          onClick={stopTimer}
          disabled={!isPlaying || !isTimerRunning}
          style={dangerButtonStyle}
        >
          Pause Timer
        </button>
        
        <button 
          onClick={() => resetTimer()}
          disabled={!isPlaying}
          style={buttonStyle}
        >
          Reset Timer
        </button>
      </div>

      {/* Visual timer bar */}
      <div style={{
        width: '100%',
        height: '20px',
        backgroundColor: '#e9ecef',
        borderRadius: '10px',
        overflow: 'hidden',
        marginTop: '20px',
      }}>
        <div 
          style={{
            width: `${(timeLeft / 15) * 100}%`,
            height: '100%',
            backgroundColor: timeLeft <= 5 ? '#dc3545' : '#28a745',
            transition: 'width 1s linear, background-color 0.3s',
          }}
        />
      </div>
    </div>
  );
};