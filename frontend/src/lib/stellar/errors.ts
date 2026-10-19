// Numeric contract error codes, mirroring `onchain/contracts/lyricsflip/src/errors.rs`
// and the `Error` enum in `onchain/contracts/lyricsflip-nft/src/lib.rs`. The
// codes are stable (see the table in `onchain/README.md`); keep this file in
// sync when a variant is added.

export interface ContractErrorInfo {
  name: string;
  message: string;
}

export const LYRICSFLIP_ERRORS: Record<number, ContractErrorInfo> = {
  1: { name: 'AlreadyInitialized', message: 'The contract is already initialized.' },
  2: { name: 'NonExistingRound', message: 'That round does not exist.' },
  3: { name: 'RoundAlreadyStarted', message: 'That round has already started.' },
  4: { name: 'NonExistingGenre', message: 'Pick a genre to create a round.' },
  5: { name: 'RoundAlreadyJoined', message: 'You have already joined this round.' },
  6: { name: 'InvalidCardsPerRound', message: 'Cards per round must be greater than zero.' },
  7: { name: 'ArtistCardsIsZero', message: 'There are no cards for that artist yet.' },
  8: { name: 'EmptyYearCards', message: 'There are no cards for that year yet.' },
  9: { name: 'EmptyGenreCards', message: 'There are no cards for that genre yet.' },
  10: { name: 'RoundNotStarted', message: 'That round has not started yet.' },
  11: { name: 'RoundCompleted', message: 'That round is already finished.' },
  12: { name: 'NotAParticipant', message: 'You are not a player in this round.' },
  13: { name: 'AlreadyReady', message: 'You are already marked as ready.' },
  14: { name: 'NotAuthorized', message: 'You are not authorized to do that.' },
  15: { name: 'AmountExceedsLimit', message: 'Not enough cards to build a round.' },
  16: { name: 'LimitMustBeGreaterThanZero', message: 'No cards have been added yet.' },
  17: { name: 'NonExistingCard', message: 'That card does not exist.' },
  18: { name: 'RoundNotReady', message: 'The round is not ready to be finalized yet.' },
  19: { name: 'RoundAlreadyFinalized', message: 'That round has already been finalized.' },
  20: { name: 'NotEnoughDistinctCards', message: 'Not enough distinct answers to build a question card.' },
  21: { name: 'RoundFull', message: 'That round is full.' },
  22: { name: 'InvalidMaxPlayers', message: 'A round needs room for at least 2 players.' },
  23: { name: 'NftContractNotSet', message: 'NFT rewards are not configured yet.' },
  24: { name: 'MilestoneNotReached', message: 'You have not reached that milestone yet.' },
  25: { name: 'MilestoneAlreadyClaimed', message: 'You already claimed that reward.' },
  26: { name: 'InvalidCardTitle', message: 'A card needs a title.' },
  27: { name: 'InvalidCardArtist', message: 'A card needs an artist.' },
  28: { name: 'InvalidCardLyrics', message: 'A card needs lyrics.' },
  29: { name: 'InvalidCardYear', message: 'The card year must be between 1900 and this year.' },
  30: { name: 'LyricsTooLong', message: 'The lyrics are too long (max 1000 bytes).' },
  31: { name: 'DuplicateCard', message: 'A card with that title and artist already exists.' },
  32: { name: 'BatchTooLarge', message: 'Too many cards in one batch (max 20).' },
  33: { name: 'NotPendingOwner', message: 'You are not the pending owner of this contract.' },
  34: { name: 'NoMoreCards', message: 'All cards have been drawn; finalize the round.' },
  35: { name: 'RoundCancelled', message: 'That round was cancelled.' },
  36: { name: 'InvalidCardDifficulty', message: 'Card difficulty must be 1, 2, or 3.' },
  37: { name: 'InvalidDecade', message: 'Choose a decade beginning in a valid year.' },
  38: { name: 'NoActiveCard', message: 'No card has been drawn yet for this round.' },
  39: { name: 'AlreadyAnswered', message: 'You have already answered this card.' },
};

export const LYRICSFLIP_NFT_ERRORS: Record<number, ContractErrorInfo> = {
  1: { name: 'AlreadyInitialized', message: 'The NFT contract is already initialized.' },
  2: { name: 'NotMinter', message: 'Only the minter can mint rewards.' },
  3: { name: 'TokenAlreadyExists', message: 'That token has already been minted.' },
  4: { name: 'TokenDoesNotExist', message: 'That token does not exist.' },
  5: { name: 'IncorrectOwner', message: 'That token is not owned by this account.' },
  6: { name: 'InsufficientApproval', message: 'You are not approved to manage that token.' },
  7: { name: 'InvalidLiveUntilLedger', message: 'That approval expiry is already in the past.' },
  8: { name: 'NotOwner', message: 'Only the contract owner can do that.' },
  9: { name: 'NotPendingOwner', message: 'You are not the pending owner of this contract.' },
  10: { name: 'BaseUriTooLong', message: 'That base URI is too long.' },
  11: { name: 'InsufficientBalance', message: 'Balance is insufficient or missing.' },
};

/**
 * Extracts the numeric code from a Soroban contract error, which surfaces in
 * simulation/submission messages as `Error(Contract, #<code>)`.
 */
export function getContractErrorCode(error: unknown): number | undefined {
  const text = error instanceof Error ? error.message : String(error);
  const match = /Error\(Contract, #(\d+)\)/.exec(text);
  return match ? Number(match[1]) : undefined;
}

export function describeContractError(
  error: unknown,
  table: Record<number, ContractErrorInfo> = LYRICSFLIP_ERRORS,
): ContractErrorInfo | undefined {
  const code = getContractErrorCode(error);
  return code === undefined ? undefined : table[code];
}

/** True when the user dismissed or declined the signature request in their wallet. */
export function isUserRejection(error: unknown): boolean {
  const text = error instanceof Error ? error.message : String(error);
  return /reject|declin|denied|cancel/i.test(text);
}

/**
 * Well-known Horizon REST API and Soroban RPC error strings that indicate
 * wallet/account funding problems. These appear in simulation and submission
 * responses before a contract error code is available.
 *
 * Patterns are tested case-insensitively against the full error message.
 */
const HORIZON_RPC_ERROR_PATTERNS: Array<{ pattern: RegExp; message: string }> = [
  // Horizon 404 for an account that doesn't exist on-chain yet
  {
    pattern: /account not found|404.*account|account.*404/i,
    message: 'This account does not exist on-chain yet. Fund it with Friendbot (testnet) or send XLM to it first.',
  },
  // Soroban simulation: source account not found
  {
    pattern: /source account not found/i,
    message: 'Your account has no XLM and cannot be found on-chain. Fund it to continue.',
  },
  // Transaction submission: insufficient balance to cover fee + base reserve
  {
    pattern: /txInsufficientBalance|insufficient balance|insufficient_balance/i,
    message: 'Your XLM balance is too low to cover transaction fees. Add XLM to your wallet.',
  },
  // Horizon result code: fee bump failed due to low fee
  {
    pattern: /txInsufficientFee|insufficient_fee/i,
    message: 'Transaction fee is too low. Try again.',
  },
  // General balance/fee messages from RPC error responses
  {
    pattern: /balance.*insufficient|not enough.*balance|no.*xlm/i,
    message: 'Your XLM balance is too low to complete this transaction.',
  },
  // Soroban ledger entry / TTL errors that can look like account issues
  {
    pattern: /entry.*not found|ledger.*not found/i,
    message: 'An on-chain entry was not found. The account or contract data may be missing.',
  },
];

/**
 * Returns a friendly message when the error text matches a known Horizon or
 * Soroban RPC error pattern, or `undefined` if no pattern matches.
 */
export function parseHorizonRpcError(error: unknown): string | undefined {
  const text = error instanceof Error ? error.message : String(error);
  for (const { pattern, message } of HORIZON_RPC_ERROR_PATTERNS) {
    if (pattern.test(text)) return message;
  }
  return undefined;
}

/**
 * Turns an SDK/wallet error into a message fit for the UI:
 *  1. A known contract error code maps to its friendly message.
 *  2. A declined signature says so.
 *  3. Known Horizon / RPC error strings are mapped to helpful guidance.
 *  4. Anything else falls back to the original message.
 */
export function parseContractError(
  error: unknown,
  table: Record<number, ContractErrorInfo> = LYRICSFLIP_ERRORS,
): { code?: number; message: string } {
  const code = getContractErrorCode(error);
  if (code !== undefined) {
    return { code, message: table[code]?.message ?? `Contract error #${code}.` };
  }
  if (isUserRejection(error)) {
    return { message: 'You rejected the signature request.' };
  }
  const horizonMessage = parseHorizonRpcError(error);
  if (horizonMessage) {
    return { message: horizonMessage };
  }
  const text = error instanceof Error ? error.message : String(error);
  return { message: text || 'Something went wrong.' };
}
