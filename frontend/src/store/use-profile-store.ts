'use client';

/**
 * Profile store backed by the backend user-profile API (LF-230).
 *
 * Usernames are keyed by wallet address and shared across players via the
 * backend:
 *   - `setUsername` persists the username with `PATCH /me/profile`.
 *   - `getUsername` reads from a local cache that is populated lazily with
 *     `GET /players/:address`.
 *
 * A localStorage-backed fallback is kept for offline use and for addresses
 * whose profile has not been fetched yet, so the consumer API
 * (`setUsername` / `getUsername`) stays unchanged.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

interface PlayerProfile {
  address: string;
  username?: string;
  avatar?: string;
}

interface ProfileState {
  /** The address → username mapping cached locally. */
  usernames: Record<string, string>;
  /** Addresses whose profile has already been fetched from the backend. */
  fetched: Record<string, boolean>;
  /** Set a username for a given Stellar address (persists to the backend). */
  setUsername: (address: string, username: string) => Promise<void>;
  /** Retrieve the username for a given address, or undefined. */
  getUsername: (address: string) => string | undefined;
  /** Fetch a player's profile from the backend and cache the username. */
  fetchProfile: (address: string) => Promise<PlayerProfile | undefined>;
}

async function patchProfile(
  address: string,
  username: string,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/me/profile`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      // The backend resolves the caller from the wallet address header.
      'x-wallet-address': address,
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    let message = `Failed to update profile (${response.status})`;
    try {
      const body = (await response.json()) as { message?: string };
      if (body?.message) message = body.message;
    } catch {
      // Ignore non-JSON error bodies.
    }
    throw new Error(message);
  }
}

async function fetchPlayerProfile(
  address: string,
): Promise<PlayerProfile | undefined> {
  const response = await fetch(
    `${API_BASE_URL}/players/${encodeURIComponent(address)}`,
  );

  if (!response.ok) return undefined;

  try {
    return (await response.json()) as PlayerProfile;
  } catch {
    return undefined;
  }
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      usernames: {},
      fetched: {},

      setUsername: async (address, username) => {
        // Optimistically update the local cache so the UI reacts immediately.
        set((state) => ({
          usernames: { ...state.usernames, [address]: username },
          fetched: { ...state.fetched, [address]: true },
        }));

        try {
          await patchProfile(address, username);
        } catch (error) {
          // Keep the local fallback so the username is not lost offline.
          console.warn('Failed to persist username to backend:', error);
          throw error;
        }
      },

      getUsername: (address) => get().usernames[address],

      fetchProfile: async (address) => {
        const profile = await fetchPlayerProfile(address);
        if (profile?.username) {
          set((state) => ({
            usernames: { ...state.usernames, [address]: profile.username! },
            fetched: { ...state.fetched, [address]: true },
          }));
        } else {
          set((state) => ({
            fetched: { ...state.fetched, [address]: true },
          }));
        }
        return profile;
      },
    }),
    {
      name: 'lyricsflip-profiles',
      // Only persist the cache; `fetched` is re-derived per session.
      partialize: (state) => ({ usernames: state.usernames }),
    },
  ),
);
</｜｜DSML｜｜ parameter>