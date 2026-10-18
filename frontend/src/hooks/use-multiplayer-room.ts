'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { io, type Socket } from 'socket.io-client';
import { env } from '@/env';
import type {
  ClientToServerEvents,
  RoomData,
  ServerToClientEvents,
} from '@/types/realtime';

export type { Player, RoomData } from '@/types/realtime';

export interface UseMultiplayerRoomProps {
  roomId: string;
  playerName: string;
  /** Auth token sent in the Socket.IO handshake (LF-093). */
  token?: string | null;
}

// Define WebSocket message event type
interface WebSocketMessageEvent {
  data: string;
}

type RoomSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

const WS_URL = env.NEXT_PUBLIC_WS_URL;

export function useMultiplayerRoom({
  roomId,
  playerName,
  token,
}: UseMultiplayerRoomProps) {
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const socketRef = useRef<RoomSocket | null>(null);

  useEffect(() => {
    if (!roomId) return;

    const socket: RoomSocket = io(WS_URL, {
      auth: token ? { token } : undefined,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });
    socketRef.current = socket;

    const update = (fn: (prev: RoomData) => RoomData) =>
      setRoomData((prev) => (prev ? fn(prev) : prev));
    socket.on('connect', () => {
      setIsConnected(true);
      setError(null);
      // Re-join on every (re)connect so the server restores room membership.
      socket.emit('join_room', { roomId, playerName });
    });
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('connect_error', () =>
      setError('Failed to connect to the game server'),
    );

    socket.on('room_data', (payload) => setRoomData(payload));
    socket.on('player_joined', (player) =>
      update((prev) => ({
        ...prev,
        players: [...prev.players.filter((p) => p.id !== player.id), player],
      })),
    );
    socket.on('player_left', ({ playerId }) =>
      update((prev) => ({
        ...prev,
        players: prev.players.filter((p) => p.id !== playerId),
      })),
    );
    socket.on('score_update', ({ playerId, score, totalScore }) =>
      update((prev) => ({
        ...prev,
        players: prev.players.map((p) =>
          p.id === playerId ? { ...p, score } : p,
        ),
        scores: totalScore,
      })),
    );
    socket.on('time_update', ({ timeLeft }) =>
      update((prev) => ({ ...prev, timeLeft })),
    );
    socket.on('new_lyric', ({ lyric, songOptions }) =>
      update((prev) => ({ ...prev, currentLyric: lyric, songOptions })),
    );
    socket.on('room_error', ({ message }) => setError(message));

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId, playerName, token]);

  const selectSong = useCallback(
    (songIndex: number) => {
      socketRef.current?.emit('select_song', { roomId, songIndex });
    },
    [roomId],
  );

  const leaveRoom = useCallback(() => {
    const socket = socketRef.current;
    if (!socket) return;
    socket.emit('leave_room', { roomId });
    socket.disconnect();
    socketRef.current = null;
  }, [roomId]);

  return {
    roomData,
    isConnected,
    error,
    selectSong,
    leaveRoom,
  };
}
