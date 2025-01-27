import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import { useGameStore } from "@/store/gameStore";

const GameCompletion = () => {
  const { points, questions, resetGame } = useGameStore();
  const [showConfetti, setShowConfetti] = useState(false);
  const [containerSize, setContainerSize] = useState({
    width: 0,
    height: 0,
  });
  const containerRef = React.useRef(null);

  // Calculate score percentage
  const maxPossiblePoints = questions.length * 10;
  const scorePercentage = (points / maxPossiblePoints) * 100;
  const isHighScore = scorePercentage >= 60;

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    if (isHighScore) {
      setTimeout(() => setShowConfetti(true), 100);
    }

    return () => window.removeEventListener("resize", updateSize);
  }, [isHighScore]);

  const getEmoji = () => {
    if (scorePercentage >= 80) return "🎉";
    if (scorePercentage >= 60) return "🔥";
    if (scorePercentage >= 40) return "😊";
    return "🤔";
  };

  const getMessage = () => {
    if (scorePercentage >= 80) return "You are amazinggg!";
    if (scorePercentage >= 60) return "Great job!";
    if (scorePercentage >= 40) return "Not bad!";
    return "You can do better";
  };

  const getIcon = () => {
    if (scorePercentage >= 60) {
      return (
        <div className="w-52 h-52 mb-4 mx-auto">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M116.033 73.9166V58.7166L83.1498 39.7332L69.9166 32.0999L56.6666 24.4499L49.8164 20.4999V35.6832L23.3333 20.3999V43.1999C23.3333 52.8166 26.1333 62.8166 31.7 73.1832C37.2666 83.5499 44.1999 91.6999 52.4666 97.6166C54.4499 104.583 57.5663 111.233 61.8163 117.55C65.1163 122.45 68.7498 126.8 72.7331 130.583C73.8998 131.7 75.0833 132.767 76.2999 133.783V157.333L49.8164 142.05V157.25L116.033 195.467V180.283L89.5499 164.983V141.433C94.9499 143.167 99.7831 143.317 104.033 141.917C104.916 141.617 105.766 141.267 106.55 140.817C107.1 140.517 107.633 140.183 108.133 139.8C108.65 139.4 109.15 138.983 109.633 138.517C111.15 137 112.417 135.083 113.383 132.783C115.267 133.617 117.067 134.25 118.817 134.683H118.833C120.233 135.033 121.583 135.25 122.883 135.35C126.067 135.583 129 135.067 131.65 133.8L132.3 133.467C132.933 133.15 133.55 132.767 134.15 132.333C137.1 130.25 139.283 127.367 140.666 123.683C141.9 120.433 142.517 116.533 142.517 112V89.1999L116.033 73.9166ZM49.8164 79.7499C45.8498 75.8166 42.6498 71.2166 40.2164 65.9499C37.7998 60.6832 36.5832 55.6499 36.5832 50.8332V43.2332L49.8164 50.8832V79.7499ZM129.266 104.35C129.266 109.167 128.05 112.8 125.633 115.267C123.2 117.717 120 118.633 116.033 117.983V89.1166L129.266 96.7499V104.35Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M49.8169 50.8836V79.7501C45.8502 75.8167 42.6502 71.2167 40.2169 65.9501C37.8002 60.6834 36.5837 55.6502 36.5837 50.8336V43.2334L49.8169 50.8836Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M129.267 96.75V104.35C129.267 109.167 128.05 112.8 125.633 115.267C123.2 117.717 120 118.633 116.033 117.983V89.1167L129.267 96.75Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M149.367 163.617V178.8L116.033 195.467V180.284L135.267 170.667L149.367 163.617Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M149.367 163.617L135.267 170.667L116.033 180.284L89.55 164.984L108.767 155.367L122.883 148.317L149.367 163.617Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M122.883 135.35V148.317L108.767 155.367L89.55 164.984V141.433C94.95 143.167 99.7832 143.317 104.033 141.917C104.917 141.617 105.767 141.267 106.55 140.817L108.333 139.917L109.633 139.283L118.817 134.684H118.833C120.233 135.034 121.583 135.25 122.883 135.35Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M175.85 72.5332V95.3332C175.85 104.95 173.067 111.733 167.483 115.667C166.767 116.167 166.033 116.617 165.283 117H165.25L132.3 133.467C132.933 133.15 133.55 132.767 134.15 132.333C137.1 130.25 139.283 127.367 140.666 123.683C141.9 120.433 142.517 116.533 142.517 112V89.1999L149.366 85.7832L161.733 79.5832L175.85 72.5332Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M149.367 42.0498V57.2498L116.033 73.9165V58.7165L149.367 42.0498Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M175.85 72.5333L161.734 79.5833L149.367 85.7833L142.517 89.2L116.033 73.9167L149.367 57.25L175.85 72.5333Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M69.0498 10.8834L56.6666 17.0834L49.8164 20.5001V35.6834L23.3333 20.4001L56.6666 3.7334L69.0498 10.8834Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M149.366 42.0502L116.033 58.7168L83.1493 39.7335L69.9161 32.1002L56.6662 24.4502L49.8159 20.5002L56.6662 17.0835L69.0494 10.8835L83.1493 3.8335L149.366 42.0502Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M76.2996 133.783V157.334L49.8159 142.05L72.7326 130.583C73.8993 131.7 75.0829 132.767 76.2996 133.783Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M118.816 134.683L109.633 139.283L108.333 139.917L106.55 140.817C107.1 140.517 107.633 140.183 108.133 139.8C108.649 139.4 109.15 138.983 109.633 138.517C111.15 137 112.416 135.083 113.383 132.783C115.266 133.617 117.066 134.25 118.816 134.683Z"
              fill="#490878"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M106.55 140.816L106.017 141.083L106.55 140.816Z"
              fill="#490878"
            />
            <path
              d="M106.55 140.816L106.017 141.083"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M131.65 133.8L131.317 133.966L131.65 133.8Z"
              fill="#490878"
            />
            <path
              d="M131.65 133.8L131.317 133.966"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-52 h-52 mb-4 mx-auto text-red-500">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M73.3447 20.8027V125.54L93.6398 137.246V32.5077L73.3447 20.8027ZM73.3447 160.442V183.721L93.6398 195.426V172.147L73.3447 160.442Z"
              fill="#CE0000"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M126.427 16.1151L93.6398 32.5085L73.3447 20.8035L106.132 4.41016L126.427 16.1151Z"
              fill="#CE0000"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M126.426 16.1143V120.852L93.6394 137.245V32.5077L126.426 16.1143Z"
              fill="#CE0000"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M126.427 155.754L93.6398 172.147L73.3447 160.442L106.132 144.049L126.427 155.754Z"
              fill="#CE0000"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M126.426 155.754V179.033L93.6394 195.426V172.147L126.426 155.754Z"
              fill="#CE0000"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative h-full flex items-center justify-center"
    >
      {showConfetti && (
        <ReactConfetti
          width={containerSize.width}
          height={containerSize.height}
          colors={["#92f2da", "#490878", "#70E3C7", "#2EAE4E"]}
          recycle={false}
          numberOfPieces={200}
          confettiSource={{
            x: containerSize.width / 2,
            y: containerSize.height / 2,
          }}
        />
      )}

      <div className="p-8 rounded-[24px] w-full text-center">
        {getIcon()}

        <div className="flex items-center justify-center gap-4 mb-2">
          <div className="text-[#70E3C7] text-[24px] font-bold">
            {points} Points
          </div>

          <div className="text-[24px] text-[#000000]">
            - {getMessage()} {getEmoji()}
          </div>
        </div>

        <div className="text-gray-600 mb-6 text-sm">
          {scorePercentage.toFixed(1)}% Accuracy
        </div>

        <button
          onClick={resetGame}
          className="w-[80%] px-6 py-3 bg-[#92f2da] text-[#490878] rounded-[1000px] 
            text-lg font-bold hover:bg-[#70E3C7] transition-colors duration-200"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameCompletion;
