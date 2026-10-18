use soroban_sdk::{contracttype, Address, Symbol, Vec};

/// Status of a wagered round.
#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum RoundStatus {
    Open,
    Locked,
    Settled,
    Cancelled,
}

/// Configuration for the wager token and bounds.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct WagerConfig {
    pub token: Address,
    pub min_wager: i128,
    pub max_wager: i128,
}

/// A wagered round with an escrowed pot.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Round {
    pub id: u64,
    pub creator: Address,
    pub token: Address,
    pub wager_amount: i128,
    pub pot: i128,
    pub status: RoundStatus,
    pub winners: Vec<Address>,
    pub claimed: Vec<Address>,
    pub players: Vec<Address>,
}

/// Protocol configuration, owner-configurable.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Config {
    /// Owner of this escrow contract — must be the game contract address.
    /// Only the owner is allowed to create and settle rounds.
    pub owner: Address,
    pub treasury: Address,
    /// Protocol fee in basis points (1 bps = 0.01%).
    pub fee_bps: u32,
}

/// Event emitted when a winner claims their share of the pot.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct WinningsClaimed {
    pub round_id: u64,
    pub caller: Address,
    pub amount: i128,
    pub fee: i128,
}

/// A question card with its stored options.
///
/// Options are generated once when the card is first drawn in a round
/// and persisted under `DataKey::RoundCardOptions((round_id, card_index))`,
/// so every player sees the same choices.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct QuestionCard {
    /// The question prompt.
    pub prompt: Symbol,
    /// The ordered options offered to players (0-4 entries).
    pub options: Vec<Symbol>,
    /// Index into `options` of the correct answer.
    pub correct_index: u32,
}

/// An answer submission referencing a stored option by index (0-3).
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Answer {
    pub round_id: u64,
    pub card_index: u32,
    pub player: Address,
    /// Index into the stored options for this card (0-3).
    pub option_index: u32,
/// Statistic a milestone can be defined against.
#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum StatKind {
    /// Total wins accumulated by the player.
    Wins,
    /// Current winning streak.
    Streak,
    /// Perfect rounds completed.
    PerfectRounds,
    /// Rounds played in a specific genre.
    GenreRounds,
}

/// Owner-configurable milestone definition.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct MilestoneDef {
    pub id: u32,
    pub kind: StatKind,
    pub threshold: u64,
    pub active: bool,
}

/// Event emitted when a player claims a milestone.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct MilestoneClaimed {
    pub milestone_id: u32,
    pub caller: Address,
    pub threshold: u64,
    pub stat_value: u64,
/// Per-player stats for a round, used to derive results and winners.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PlayerStats {
    pub player: Address,
    pub points: u32,
    pub correct: u32,
    pub total_time: u64,
}

/// A single player's result in a round, as returned by `get_round_results`.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct PlayerResult {
    pub player: Address,
    pub points: u32,
    pub correct: u32,
    pub total_time: u64,
    /// 1-based rank, sorted by the same tie-break as `determine_round_winners`.
    pub rank: u32,
    pub claimed: bool,
/// Event emitted when a player deposits a wager into escrow.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct WagerDeposited {
    pub round_id: u64,
    pub player: Address,
    pub amount: i128,
}
