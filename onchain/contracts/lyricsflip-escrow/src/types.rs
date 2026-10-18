use soroban_sdk::{contracttype, Address, Vec};

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
