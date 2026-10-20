import { useStellar } from '@/lib/stellar/hooks/use-stellar';
import type { Genre } from '@/lib/stellar/types';
import { useModalStore } from '@/store/modal-store';
import { useCreateRound } from '@/lib/react-query';

export const useGameService = () => {
  const { systemCalls } = useStellar();
  const { closeModal } = useModalStore();
  const createRoundMutation = useCreateRound();

  const createRound = async (genre: Genre) => {
    if (!systemCalls) {
      throw new Error('System not initialized');
    }

    const roundId = await createRoundMutation.mutateAsync(genre);
    closeModal();
    return roundId;
  };

  return {
    createRound
  };
};