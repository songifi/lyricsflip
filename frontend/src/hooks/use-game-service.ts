import { useStellar } from '@/lib/stellar/hooks/use-stellar';
import type { Genre } from '@/lib/stellar/types';
import { useModalStore } from '@/store/modal-store';
import { useStore } from '@/store';

export const useGameService = () => {
  const { systemCalls } = useStellar();
  const { closeModal } = useModalStore();
  const setRoundId = useStore((state) => state.game.setRoundId);

  const createRound = async (genre: Genre) => {
    if (!systemCalls) {
      throw new Error('System not initialized');
    }

    const roundId = await systemCalls.createRound(genre);
    setRoundId(roundId);
    closeModal();
    return roundId;
  };

  return {
    createRound
  };
};
