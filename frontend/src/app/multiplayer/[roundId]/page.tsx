'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/atoms/button';
import { LyricCard } from '@/components/organisms/LyricCard';
import { StatisticsPanel } from '@/components/molecules/statistics-panel';
import { SongOptions } from '@/components/molecules/song-options';
import ChallengeInvite from '@/components/organisms/challenge-invite';
import { Button } from '@/components/atoms/button';
import ChallengeInvite from '@/components/organisms/challangeInvite';
import { useMultiplayerRoom } from '@/hooks/use-multiplayer-room';
import { useRoundEvents } from '@/hooks/useRoundEvents';
import { useStellar } from '@/lib/stellar/hooks/useStellar';
import type { Round } from '@/lib/stellar/types';
import { ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

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

  const { roomData, selectSong } = useMultiplayerRoom({
    roomId: isStarted ? rawRoundId : '',
    playerName: account?.address ?? 'Guest',
  });

  const loadRound = useCallback(async () => {
    if (!systemCalls || roundId === null) return;
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
      if (roundData.is_started || roundPlayers.includes(account.address))
        return;

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

    run();
  }, [systemCalls, roundId, account, loadRound]);

  const handleReady = async () => {
    if (!systemCalls || roundId === null) return;
    setIsBusy(true);
    setError(null);
    try {
      await systemCalls.startRound(roundId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to mark ready');
    } finally {
      setIsBusy(false);
    }
  };

  const handleBack = () => router.push('/multiplayer');

  const shell = (content: ReactNode) => (
    <div className="container mx-auto mt-16 px-4 py-8 md:mt-20">
    void loadRound();
  }, [systemCalls, roundId, loadRound]);

  const handleReady = useCallback(async () => {
    if (!systemCalls || roundId === null || !account) return;
    setIsBusy(true);
    try {
      await systemCalls.readyUp(roundId);
      await events.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to ready up');
    } finally {
      setIsBusy(false);
    }
  }, [systemCalls, roundId, account, events]);

  const handleBack = () => router.push('/multiplayer');

  const shell = (content: React.ReactNode) => (
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-20">
      <button
        onClick={handleBack}
        className="mb-4 flex min-h-[44px] items-center text-gray-600"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </button>
      {content}
    </div>
  );

  if (error && !round) {
    return shell(<p className="text-red-500">{error}</p>);
  }

  if (isLoading || !round) {
    return shell(<p>Loading round…</p>);
      <h1 className="text-3xl font-bold mb-4">Multiplayer Round</h1>
      <p className="text-gray-600 mb-4">Round ID: {rawRoundId || 'unknown'}</p>

      {content}
    </div>
  );

  if (!isValidId) {
    return shell(
      <div className="max-w-md mx-auto text-center">
        <p className="text-red-500">{error}</p>
      </div>,
    );
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

  if (!isStarted) {
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

  return shell(
    <>
      <h1 className="mb-6 text-2xl font-bold">
        {roomData?.name || `Round ${rawRoundId}`}
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="order-2 md:order-1 lg:col-span-1">
          <StatisticsPanel
            time={roomData?.timeLeft || '00:00'}
            potWin={round.wager_amount.toString()}
            potWin={`${round?.wager_amount.toString() ?? '0'}`}
            scores={`${roomData?.scores || 0}`}
          />
        </div>
        <div className="order-1 md:order-2 lg:col-span-1">
          <LyricCard
            lyrics={[
              {
                text:
                  roomData?.currentLyric?.text || 'Waiting for the first card…',
                title: roomData?.currentLyric?.title || '',
                artist: roomData?.currentLyric?.artist || '',
              },
            ]}
            isFlipped={false}
          />
        </div>
      </div>
      {roomData?.songOptions && (
        <SongOptions
          options={roomData.songOptions}
          onSelect={(_, index) => selectSong(index)}
        />
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </>,
  );
}
