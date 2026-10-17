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

/// A wagered round with an escrowed pot.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Round {
    pub id: u64,
    pub creator: Address,
    pub token: Address,
    pub pot: i128,
    pub status: RoundStatus,
    pub winners: Vec<Address>,
    pub claimed: Vec<Address>,
}

/// Protocol configuration, owner-configurable.
#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Config {
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
}
