import { useCallback, useState } from 'react';
import { LyricsFlipClient } from '@/lib/contracts/lyricsflip';

export interface UseCreateRoundResult {
  createRound: (params: { roundId: bigint; pot: bigint }) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook for creating a round. The contract draws cards using the
 * network PRNG, so the caller no longer supplies a seed (no more
 * `BigInt(Date.now())`).
 */
export function useCreateRound(contractId: string, publicKey?: string): UseCreateRoundResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createRound = useCallback(
    async (params: { roundId: bigint; pot: bigint }) => {
      setLoading(true);
      setError(null);
      try {
        const client = new LyricsFlipClient(contractId, publicKey);
        await client.createRound({
          roundId: params.roundId,
          pot: params.pot,
        });
      } catch (e) {
        setError(e as Error);
        throw e;
      } finally {
        setLoading(false);
      }
    },
    [contractId, publicKey],
  );

  return { createRound, loading, error };
}
