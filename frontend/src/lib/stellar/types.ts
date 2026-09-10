// Mirrors `onchain/contracts/lyricsflip/src/types.rs`. Replaces
// `frontend/src/lib/dojo/typescript/models.gen.ts` (Dojo/Cairo codegen).
// Soroban u64/i128 values decode to JS `bigint` via @stellar/stellar-sdk's
// `scValToNative`; u32 values (and "simple" contracttype enums with explicit
// discriminants, like `Genre`/`Role`) decode to a plain `number`.

export type Genre =
  | 'HipHop'
  | 'Pop'
  | 'Rock'
  | 'RnB'
  | 'Electronic'
  | 'Classical'
  | 'Jazz'
  | 'Country'
  | 'Blues'
  | 'Reggae'
  | 'Afrobeat'
  | 'Gospel'
  | 'Folk';

/** Ordering must match the explicit discriminants on `Genre` in `onchain/contracts/lyricsflip/src/types.rs`. */
export const GENRE_VALUES: readonly Genre[] = [
  'HipHop',
  'Pop',
  'Rock',
  'RnB',
  'Electronic',
  'Classical',
  'Jazz',
  'Country',
  'Blues',
  'Reggae',
  'Afrobeat',
  'Gospel',
  'Folk',
];

/** Converts a friendly `Genre` into the `u32` the contract actually expects on the wire. */
export const genreToWire = (genre: Genre): number => GENRE_VALUES.indexOf(genre);

/** Converts a `u32` genre discriminant (as decoded from the contract) back into a friendly `Genre`. */
export const genreFromWire = (value: number): Genre => {
  const genre = GENRE_VALUES[value];
  if (!genre) {
    throw new Error(`Unknown Genre discriminant: ${value}`);
  }
  return genre;
};

/** Matches the single `Role::Admin = 0` variant in the ported contract. */
export const ROLE_ADMIN = 0;

export interface Card {
  card_id: bigint;
  genre: Genre;
  artist: string;
  title: string;
  year: bigint;
  lyrics: string;
}

/** Raw shape returned by the contract, before `genreFromWire` is applied. */
export interface WireCard extends Omit<Card, 'genre'> {
  genre: number;
}

export interface Round {
  round_id: bigint;
  admin: string;
  genre: Genre;
  wager_amount: bigint;
  start_time: bigint;
  is_started: boolean;
  is_completed: boolean;
  end_time: bigint;
  next_card_index: number;
}

/** Raw shape returned by the contract, before `genreFromWire` is applied. */
export interface WireRound extends Omit<Round, 'genre'> {
  genre: number;
}

export interface PlayerStats {
  total_rounds: bigint;
  rounds_won: bigint;
  current_streak: bigint;
  max_streak: bigint;
}

export interface QuestionCard {
  lyric: string;
  timestamp: bigint;
  option_one: string;
  option_two: string;
  option_three: string;
  option_four: string;
}

export type Answer =
  | { tag: 'Artist'; values: [string] }
  | { tag: 'Year'; values: [bigint] }
  | { tag: 'Title'; values: [string] };

export const Answer = {
  artist: (value: string): Answer => ({ tag: 'Artist', values: [value] }),
  year: (value: bigint | number): Answer => ({ tag: 'Year', values: [BigInt(value)] }),
  title: (value: string): Answer => ({ tag: 'Title', values: [value] }),
};

export interface StellarAccount {
  address: string;
}
