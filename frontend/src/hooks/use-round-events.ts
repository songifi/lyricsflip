'use client';

import { useEffect, useRef, useState } from 'react';
import { nativeToScVal, rpc, scValToNative } from '@stellar/stellar-sdk';
import { createConfig } from '@/lib/stellar/stellar-config';

export interface RoundEventsState {
  /** Players seen in `RoundJoined` events. */
  joined: string[];
  /** Players seen in `PlayerReady` events. */
  ready: string[];
  /** True once a `RoundStarted` event has been observed. */
  started: boolean;
  error: string | null;
}

const POLL_INTERVAL_MS = 4000;
// How far back to look on the first poll (~1 day of ledgers at ~5s each).
const LOOKBACK_LEDGERS = 17280;
const TOPIC_ROUND_JOINED = 'round_joined';
const TOPIC_PLAYER_READY = 'player_ready';
const TOPIC_ROUND_STARTED = 'round_started';

/**
 * Polls `getEvents` for the lobby events of a single round (`RoundJoined`,
 * `PlayerReady`, `RoundStarted`), filtered by contract id and round-id topic.
 */
export function useRoundEvents(roundId: bigint | null): RoundEventsState {
  const [state, setState] = useState<RoundEventsState>({
    joined: [],
    ready: [],
    started: false,
    error: null,
  });
  const cursorRef = useRef<string | null>(null);

  useEffect(() => {
    if (roundId === null) return;

    const config = createConfig();
    const server = new rpc.Server(config.rpcUrl, {
      allowHttp: config.rpcUrl.startsWith('http://'),
    });
    const filters: rpc.Api.EventFilter[] = [
      {
        type: 'contract',
        contractIds: [config.lyricsflipContractId],
        topics: [
          ['*', nativeToScVal(roundId, { type: 'u64' }).toXDR('base64'), '*'],
        ],
      },
    ];
    let cancelled = false;
    cursorRef.current = null;
    setState({ joined: [], ready: [], started: false, error: null });

    const poll = async () => {
      try {
        let response: rpc.Api.GetEventsResponse;
        if (cursorRef.current) {
          response = await server.getEvents({
            filters,
            cursor: cursorRef.current,
          });
        } else {
          const { sequence } = await server.getLatestLedger();
          response = await server.getEvents({
            filters,
            startLedger: Math.max(1, sequence - LOOKBACK_LEDGERS),
          });
        }
        if (cancelled) return;
        cursorRef.current = response.cursor;

        const joined: string[] = [];
        const ready: string[] = [];
        let started = false;
        for (const event of response.events) {
          const [name, , address] = event.topic.map((t) => scValToNative(t));
          if (name === TOPIC_ROUND_JOINED) joined.push(String(address));
          else if (name === TOPIC_PLAYER_READY) ready.push(String(address));
          else if (name === TOPIC_ROUND_STARTED) started = true;
        }

        setState((prev) => ({
          joined: Array.from(new Set([...prev.joined, ...joined])),
          ready: Array.from(new Set([...prev.ready, ...ready])),
          started: prev.started || started,
          error: null,
        }));
      } catch (err) {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            error:
              err instanceof Error
                ? err.message
                : 'Failed to fetch round events',
          }));
        }
      }
    };

    poll();
    const timer = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [roundId]);

  return state;
}
