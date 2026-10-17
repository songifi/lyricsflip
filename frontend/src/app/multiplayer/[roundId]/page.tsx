'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/atoms/button';
import ChallengeInvite from '@/components/organisms/challenge-invite';
import { useRoundEvents } from '@/hooks/use-round-events';
import { useStellar } from '@/lib/stellar/hooks/use-stellar';
import type { Round } from '@/lib/stellar/types';

function parseRoundId(raw: string): bigint | null {
  return /^\d+$/.test(raw) ? BigInt(raw) : null;
}

export default function MultiplayerRoundPage() {
  const router = useRouter();
  const params = useParams<{ roundId?: string | string[] }>();
  const rawRoundId = Array.isArray(params?.roundId)
    ? params.roundId[0]
    : params?.roundId ?? '';
  const roundId = parseRoundId(rawRoundId);
  const isValidId = roundId !== null;

  const { systemCalls, account, connect } = useStellar();
  const [round, setRound] = useState<Round | null>(null);
  const [players, setPlayers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(
    isValidId ? null : 'That invite link is not valid.',
  );

  const events = useRoundEvents(round ? roundId : null);
  const allPlayers = Array.from(new Set([...players, ...events.joined]));
  const isStarted = !!round?.is_started || events.started;
  const isReady = !!account && events.ready.includes(account.address);

  const loadRound = useCallback(async () => {
    if (!systemCalls || roundId === null) return null;
    try {
      const [roundData, roundPlayers] = await Promise.all([
        systemCalls.getRound(roundId),
        systemCalls.getRoundPlayers(roundId),
      ]);
      setRound(roundData);
      setPlayers(roundPlayers);
      return { roundData, roundPlayers };
    } catch {
      setError(`Round ${rawRoundId} does not exist or could not be loaded.`);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [systemCalls, roundId, rawRoundId]);

  useEffect(() => {
    if (!systemCalls || roundId === null) {
      if (roundId === null) setIsLoading(false);
      return;
    }

    const run = async () => {
      const loaded = await loadRound();
      if (!loaded || !account) return;
      const { roundData, roundPlayers } = loaded;
      if (roundData.is_cancelled || roundData.is_completed) {
        setError('This round is no longer open.');
        return;
      }
      if (roundData.is_started || roundPlayers.includes(account.address)) return;

      try {
        setIsBusy(true);
        await systemCalls.joinRound(roundId);
        await loadRound();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to join round');
      } finally {
        setIsBusy(false);
      }
    };

    void run();
  }, [systemCalls, roundId, account, loadRound]);

  const handleReady = useCallback(async () => {
    if (!systemCalls || roundId === null) return;
    setIsBusy(true);
    setError(null);
    try {
      await systemCalls.startRound(roundId);
      await loadRound();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark ready');
    } finally {
      setIsBusy(false);
    }
  }, [systemCalls, roundId, loadRound]);

  const shell = (content: ReactNode) => (
    <div className="container mx-auto mt-16 px-4 py-8 md:mt-20">
      <button
        onClick={() => router.push('/multiplayer')}
        className="mb-4 flex min-h-[44px] items-center text-gray-600"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </button>
      {content}
    </div>
  );

  if (!isValidId) {
    return shell(<p className="mx-auto max-w-md text-center text-red-500">{error}</p>);
  }

  if (!account) {
    return shell(
      <div className="mx-auto max-w-md text-center">
        <p className="mb-4">Connect your wallet to join round {rawRoundId}.</p>
        <Button onClick={() => connect()} className="min-h-[44px] w-full">
          Connect wallet
        </Button>
      </div>,
    );
  }

  if (isLoading) {
    return shell(<p className="text-gray-600">Loading round…</p>);
  }

  if (!round) {
    return shell(<p className="text-red-500">{error ?? 'Round not found.'}</p>);
  }

  if (error && (round.is_cancelled || round.is_completed)) {
    return shell(<p className="text-red-500">{error}</p>);
  }

  if (isStarted) {
    return shell(
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-2 text-2xl font-bold">Round {rawRoundId}</h1>
        <p className="text-gray-600">This round is in progress.</p>
      </div>,
    );
  }

  return shell(
    <>
      <div className="mx-auto mb-6 max-w-md">
        <h2 className="mb-2 text-xl font-bold">
          Players ({allPlayers.length})
        </h2>
        <ul className="space-y-1">
          {allPlayers.map((player) => (
            <li key={player} className="flex justify-between text-sm">
              <span className="mr-2 truncate">
                {player === account.address ? `${player} (you)` : player}
              </span>
              <span
                className={
                  events.ready.includes(player)
                    ? 'text-green-600'
                    : 'text-gray-500'
                }
              >
                {events.ready.includes(player) ? 'Ready' : 'Not ready'}
              </span>
            </li>
          ))}
        </ul>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {events.error && (
          <p className="mt-2 text-sm text-red-500">{events.error}</p>
        )}
      </div>
      <ChallengeInvite
        round={round}
        players={allPlayers}
        isReady={isReady}
        isBusy={isBusy}
        onReady={handleReady}
      />
    </>,
  );
}
