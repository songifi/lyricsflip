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
    /// Owner of this escrow contract — must be the game contract address.
    /// Only the owner is allowed to create and settle rounds.
    pub owner: Address,
    pub treasury: Address,
    /// Protocol fee in basis points (1 bps = 0.01%).
    pub fee_bps: u32,
}
