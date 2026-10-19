// Numeric contract error codes, mirroring `onchain/contracts/lyricsflip/src/errors.rs`
// and the `Error` enum in `onchain/contracts/lyricsflip-nft/src/lib.rs`. The
// codes are stable (see the table in `onchain/README.md`); keep this file in
// sync when a variant is added.

export interface ContractErrorInfo {
  name: string;
  message: string;
}

/**
 * Mapping of numeric error code to contract Error enum variant name for lyricsflip.
 * Stable ABI codes 1..40 matching `onchain/contracts/lyricsflip/src/errors.rs`.
 */
export const CONTRACT_ERROR_NAMES: Record<number, string> = {
  1: 'AlreadyInitialized',
  2: 'NonExistingRound',
  3: 'RoundAlreadyStarted',
  4: 'NonExistingGenre',
  5: 'RoundAlreadyJoined',
  6: 'InvalidCardsPerRound',
  7: 'ArtistCardsIsZero',
  8: 'EmptyYearCards',
  9: 'EmptyGenreCards',
  10: 'RoundNotStarted',
  11: 'RoundCompleted',
  12: 'NotAParticipant',
  13: 'AlreadyReady',
  14: 'NotAuthorized',
  15: 'AmountExceedsLimit',
  16: 'LimitMustBeGreaterThanZero',
  17: 'NonExistingCard',
  18: 'RoundNotReady',
  19: 'RoundAlreadyFinalized',
  20: 'NotEnoughDistinctCards',
  21: 'RoundFull',
  22: 'InvalidMaxPlayers',
  23: 'NftContractNotSet',
  24: 'MilestoneNotReached',
  25: 'MilestoneAlreadyClaimed',
  26: 'InvalidCardTitle',
  27: 'InvalidCardArtist',
  28: 'InvalidCardLyrics',
  29: 'InvalidCardYear',
  30: 'LyricsTooLong',
  31: 'DuplicateCard',
  32: 'BatchTooLarge',
  33: 'NotPendingOwner',
  34: 'NoMoreCards',
  35: 'RoundCancelled',
  36: 'InvalidCardDifficulty',
  37: 'InvalidDecade',
  38: 'NoActiveCard',
  39: 'AlreadyAnswered',
  40: 'Paused',
};

/**
 * Hand-written user-friendly UI messages keyed by contract error name.
 */
export const LYRICSFLIP_ERROR_MESSAGES: Record<string, string> = {
  AlreadyInitialized: 'The contract is already initialized.',
  NonExistingRound: 'That round does not exist.',
  RoundAlreadyStarted: 'That round has already started.',
  NonExistingGenre: 'Pick a genre to create a round.',
  RoundAlreadyJoined: 'You have already joined this round.',
  InvalidCardsPerRound: 'Cards per round must be greater than zero.',
  ArtistCardsIsZero: 'There are no cards for that artist yet.',
  EmptyYearCards: 'There are no cards for that year yet.',
  EmptyGenreCards: 'There are no cards for that genre yet.',
  RoundNotStarted: 'That round has not started yet.',
  RoundCompleted: 'That round is already finished.',
  NotAParticipant: 'You are not a player in this round.',
  AlreadyReady: 'You are already marked as ready.',
  NotAuthorized: 'You are not authorized to do that.',
  AmountExceedsLimit: 'Not enough cards to build a round.',
  LimitMustBeGreaterThanZero: 'No cards have been added yet.',
  NonExistingCard: 'That card does not exist.',
  RoundNotReady: 'The round is not ready to be finalized yet.',
  RoundAlreadyFinalized: 'That round has already been finalized.',
  NotEnoughDistinctCards: 'Not enough distinct answers to build a question card.',
  RoundFull: 'That round is full.',
  InvalidMaxPlayers: 'A round needs room for at least 2 players.',
  NftContractNotSet: 'NFT rewards are not configured yet.',
  MilestoneNotReached: 'You have not reached that milestone yet.',
  MilestoneAlreadyClaimed: 'You already claimed that reward.',
  InvalidCardTitle: 'A card needs a title.',
  InvalidCardArtist: 'A card needs an artist.',
  InvalidCardLyrics: 'A card needs lyrics.',
  InvalidCardYear: 'The card year must be between 1900 and this year.',
  LyricsTooLong: 'The lyrics are too long (max 1000 bytes).',
  DuplicateCard: 'A card with that title and artist already exists.',
  BatchTooLarge: 'Too many cards in one batch (max 20).',
  NotPendingOwner: 'You are not the pending owner of this contract.',
  NoMoreCards: 'All cards have been drawn; finalize the round.',
  RoundCancelled: 'That round was cancelled.',
  InvalidCardDifficulty: 'Card difficulty must be 1, 2, or 3.',
  InvalidDecade: 'Choose a decade beginning in a valid year.',
  NoActiveCard: 'No card has been drawn yet for this round.',
  AlreadyAnswered: 'You have already answered this card.',
  Paused: 'The game is temporarily paused.',
};

/**
 * Builds a numeric error table from a code-to-name mapping and a friendly messages map.
 */
export function buildErrorTable(
  codeToName: Record<number, string>,
  friendlyMessages: Record<string, string>,
): Record<number, ContractErrorInfo> {
  const table: Record<number, ContractErrorInfo> = {};
  for (const [codeStr, name] of Object.entries(codeToName)) {
    const code = Number(codeStr);
    const message = friendlyMessages[name] ?? `Contract error: ${name}`;
    table[code] = { name, message };
  }
  return table;
}

export const LYRICSFLIP_ERRORS: Record<number, ContractErrorInfo> = buildErrorTable(
  CONTRACT_ERROR_NAMES,
  LYRICSFLIP_ERROR_MESSAGES,
);

export const NFT_ERROR_NAMES: Record<number, string> = {
  1: 'AlreadyInitialized',
  2: 'NotMinter',
  3: 'TokenAlreadyExists',
  4: 'TokenDoesNotExist',
  5: 'IncorrectOwner',
  6: 'InsufficientApproval',
  7: 'InvalidLiveUntilLedger',
  8: 'NotOwner',
  9: 'NotPendingOwner',
  10: 'BaseUriTooLong',
  11: 'InsufficientBalance',
};

export const NFT_ERROR_MESSAGES: Record<string, string> = {
  AlreadyInitialized: 'The NFT contract is already initialized.',
  NotMinter: 'Only the minter can mint rewards.',
  TokenAlreadyExists: 'That token has already been minted.',
  TokenDoesNotExist: 'That token does not exist.',
  IncorrectOwner: 'That token is not owned by this account.',
  InsufficientApproval: 'You are not approved to manage that token.',
  InvalidLiveUntilLedger: 'That approval expiry is already in the past.',
  NotOwner: 'Only the contract owner can do that.',
  NotPendingOwner: 'You are not the pending owner of this contract.',
  BaseUriTooLong: 'That base URI is too long.',
  InsufficientBalance: 'Balance is insufficient or missing.',
};

export const LYRICSFLIP_NFT_ERRORS: Record<number, ContractErrorInfo> = buildErrorTable(
  NFT_ERROR_NAMES,
  NFT_ERROR_MESSAGES,
);

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
 * Turns an SDK/wallet error into a message fit for the UI: a known contract
 * error code maps to its friendly message, a declined signature says so, and
 * anything else falls back to the original message.
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
  const text = error instanceof Error ? error.message : String(error);
  return { message: text || 'Something went wrong.' };
}
