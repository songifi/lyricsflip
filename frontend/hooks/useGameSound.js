
import useSound from "use-sound";
import { useState } from "react";

export function useGameSounds() {
  const [isMuted, setIsMuted] = useState(false);

  const soundOptions = { volume: isMuted ? 0 : 1 };

  const [playClick] = useSound("/assets/playsound.mpeg", soundOptions);
  const [playCorrect] = useSound("/assets/correct.wav", soundOptions);
  const [playIncorrect] = useSound("/assets/incorrect.wav", soundOptions);
  const [playBackground, { stop: stopBackground }] = useSound(
    "/assets/backgroundSong.wav",
    { ...soundOptions, loop: true }
  );

  const toggleMute = () => setIsMuted((prev) => !prev);

  return {
    isMuted,
    toggleMute,
    playClick,
    playCorrect,
    playIncorrect,
    playBackground,
    stopBackground,
  };
}

export default useGameSounds;
