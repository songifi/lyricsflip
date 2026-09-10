import { useStellar } from '@/lib/stellar/hooks/useStellar';
import type { Genre } from '@/lib/stellar/types';
import { useModalStore } from '@/store/modal-store';
import { useGameStore } from '@/store/game';

export const useGameService = () => {
  const { systemCalls } = useStellar();
  const { closeModal } = useModalStore();
  const { setRoundId } = useGameStore();

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
