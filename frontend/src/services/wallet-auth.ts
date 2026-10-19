import { post } from './api';
import type { components } from './generated/openapi';

// Talks to the backend's wallet-based auth endpoints (backend/src/auth/auth.controller.ts
// `challenge`/`verify`). NEXT_PUBLIC_API_URL must point at the bare backend
// origin (e.g. `http://localhost:4000`) - the backend has no `/api` prefix.

type Schemas = components['schemas'];

/** Nonce string to sign with the wallet (e.g. StellarWalletsKit.signMessage). */
export type WalletChallengeResponse = Schemas['WalletChallengeResponse'];

export type WalletAuthTokens = Schemas['WalletAuthTokens'];

/** Requests a one-time challenge for `address` to sign with its Stellar wallet. */
export const requestWalletChallenge = (
  address: string,
): Promise<WalletChallengeResponse> =>
  post<WalletChallengeResponse>('/auth/challenge', { address });

/**
 * Verifies a signed challenge and returns access/refresh tokens for the
 * (upserted) account tied to that Stellar address.
 */
export const verifyWalletChallenge = (
  address: string,
  signedChallenge: string,
): Promise<WalletAuthTokens> =>
  post<WalletAuthTokens>('/auth/verify', { address, signedChallenge });