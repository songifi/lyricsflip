import useSound from "use-sound";
import { useState } from "react";

export function useGameSounds() {
  const [isMuted, setIsMuted] = useState(false);

  const [playClick] = useSound("/assets/playsound.mpeg", {
    volume: isMuted ? 0 : 1,
  });
  const [playCorrect] = useSound("/assets/correct.wav", {
    volume: isMuted ? 0 : 1,
  });
  const [playIncorrect] = useSound("/assets/incorrect.wav", {
    volume: isMuted ? 0 : 1,
  });
  const [playBackground, { stop }] = useSound("/assets/backgroundSong.wav", {
    loop: true,
    volume: isMuted ? 0 : 1,
  });

  const toggleMute = () => setIsMuted((prev) => !prev);

  return {
    isMuted,
    toggleMute,
    playClick,
    playCorrect,
    playIncorrect,
    playBackground,
    stopBackground: stop,
  };
}
