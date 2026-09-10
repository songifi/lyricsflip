use soroban_sdk::{contracttype, Address, String};

/// Ported from `onchain/src/utils/types.cairo`. `felt252`/`ByteArray` fields
/// become `String`; Starknet's `u8` fields become `u32` since Soroban has no
/// native u8 contract type.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Card {
    pub card_id: u64,
    pub genre: Genre,
    pub artist: String,
    pub title: String,
    pub year: u64,
    pub lyrics: String,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PlayerStats {
    pub total_rounds: u64,
    pub rounds_won: u64,
    pub current_streak: u64,
    pub max_streak: u64,
}

impl PlayerStats {
    pub fn zero() -> Self {
        PlayerStats {
            total_rounds: 0,
            rounds_won: 0,
            current_streak: 0,
            max_streak: 0,
        }
    }
}

/// Explicit discriminants make this a "simple" contracttype enum, which
/// soroban-sdk encodes as a plain `u32` (and the JS SDK decodes to a plain
/// `number`) rather than the `{tag, values}` shape used for enums with
/// associated data (see `Answer` below). Keep `frontend/src/lib/stellar/types.ts`'s
/// `GENRE_VALUES` ordering in sync with these values.
#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum Genre {
    HipHop = 0,
    Pop = 1,
    Rock = 2,
    RnB = 3,
    Electronic = 4,
    Classical = 5,
    Jazz = 6,
    Country = 7,
    Blues = 8,
    Reggae = 9,
    Afrobeat = 10,
    Gospel = 11,
    Folk = 12,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Round {
    pub round_id: u64,
    pub admin: Address,
    pub genre: Genre,
    pub wager_amount: i128,
    pub start_time: u64,
    pub is_started: bool,
    pub is_completed: bool,
    pub end_time: u64,
    pub next_card_index: u32,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct QuestionCard {
    pub lyric: String,
    pub timestamp: u64,
    pub option_one: String,
    pub option_two: String,
    pub option_three: String,
    pub option_four: String,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum Answer {
    Artist(String),
    Year(u64),
    Title(String),
}

/// Mirrors Cairo's single `ADMIN_ROLE` selector. Kept as an enum (instead of
/// dropping the parameter entirely) so `set_role`/`is_admin` keep the same
/// call shape as the original `ILyricsFlip` interface.
#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum Role {
    Admin = 0,
}

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Owner,
    Admin(Address),
    RoundCount,
    CardsCount,
    CardsPerRound,
    Card(u64),
    GenreCards(Genre),
    ArtistCards(String),
    YearCards(u64),
    Round(u64),
    RoundPlayers(u64),
    RoundCards(u64),
    PlayerStats(Address),
    RoundReady((u64, Address)),
    RoundReadyCount(u64),
}
