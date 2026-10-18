#![no_std]

mod errors;
mod types;

#[cfg(any(test, feature = "testutils"))]
pub mod testutils;

#[cfg(test)]
mod test;

pub use errors::Error;
pub use types::{Config, Round, RoundStatus};

use soroban_sdk::{contract, contractimpl, symbol_short, token, Address, Env, Vec};

/// Storage key for the protocol configuration (instance storage).
const CONFIG: soroban_sdk::Symbol = symbol_short!("CONFIG");
/// Storage key prefix for per-round data (persistent storage).
const ROUND: soroban_sdk::Symbol = symbol_short!("ROUND");
/// Denominator for basis-point fee calculations (100% = 10 000 bps).
const BPS_DENOM: i128 = 10_000;

// ---------------------------------------------------------------------------
// Contract
// ---------------------------------------------------------------------------

#[contract]
pub struct EscrowContract;

#[contractimpl]
impl EscrowContract {
    // -----------------------------------------------------------------------
    // Lifecycle
    // -----------------------------------------------------------------------

    /// One-time initialisation.
    ///
    /// * `owner`    – address of the game contract; the only caller allowed to
    ///               create or settle rounds.
    /// * `treasury` – address that receives the protocol fee on each payout.
    /// * `fee_bps`  – protocol fee in basis points (0–10 000).
    pub fn initialize(
        env: Env,
        owner: Address,
        treasury: Address,
        fee_bps: u32,
    ) -> Result<(), Error> {
        if env.storage().instance().has(&CONFIG) {
            return Err(Error::AlreadyInitialized);
        }
        if fee_bps > BPS_DENOM as u32 {
            return Err(Error::InvalidFee);
        }
        env.storage().instance().set(
            &CONFIG,
            &Config {
                owner,
                treasury,
                fee_bps,
            },
        );
        Ok(())
    }

    // -----------------------------------------------------------------------
    // Admin (owner = game contract)
    // -----------------------------------------------------------------------

    /// Update the protocol fee.  Requires the game-contract address to auth.
    pub fn set_fee(env: Env, fee_bps: u32) -> Result<(), Error> {
        let mut config = Self::load_config(&env)?;
        config.owner.require_auth();
        if fee_bps > BPS_DENOM as u32 {
            return Err(Error::InvalidFee);
        }
        config.fee_bps = fee_bps;
        env.storage().instance().set(&CONFIG, &config);
        Ok(())
    }

    /// Update the treasury address.  Requires the game-contract address to auth.
    pub fn set_treasury(env: Env, treasury: Address) -> Result<(), Error> {
        let mut config = Self::load_config(&env)?;
        config.owner.require_auth();
        config.treasury = treasury;
        env.storage().instance().set(&CONFIG, &config);
        Ok(())
    }

    // -----------------------------------------------------------------------
    // Round management (owner-gated)
    // -----------------------------------------------------------------------

    /// Register an escrow pot for a new round.
    ///
    /// Only the game contract (the `owner`) may call this.  Callers must
    /// transfer `pot` tokens to this contract's address before calling.
    ///
    /// * `round_id` – id of the matching on-chain round in the game contract.
    /// * `creator`  – address of the round creator in the game contract.
    /// * `token`    – SEP-41 token contract address used for the pot.
    /// * `pot`      – amount (in the token's base units) held in escrow.
    pub fn create_round(
        env: Env,
        round_id: u64,
        creator: Address,
        token: Address,
        pot: i128,
    ) -> Result<(), Error> {
        // Only the game contract is authorised to open an escrow round.
        let config = Self::load_config(&env)?;
        config.owner.require_auth();

        // Prevent overwriting an existing round.
        if env
            .storage()
            .persistent()
            .has(&(ROUND, round_id))
        {
            return Err(Error::RoundAlreadyExists);
        }

        env.storage().persistent().set(
            &(ROUND, round_id),
            &Round {
                id: round_id,
                creator,
                token,
                pot,
                status: RoundStatus::Open,
                winners: Vec::new(&env),
                claimed: Vec::new(&env),
            },
        );
        Ok(())
    }

    /// Record the winners of a round and mark it as settled.
    ///
    /// Only the game contract (the `owner`) may call this.  After settlement
    /// each winner may call `claim_winnings`.
    pub fn settle_round(
        env: Env,
        round_id: u64,
        winners: Vec<Address>,
    ) -> Result<(), Error> {
        // Only the game contract is authorised to settle a round.
        let config = Self::load_config(&env)?;
        config.owner.require_auth();

        if winners.is_empty() {
            return Err(Error::NoWinners);
        }

        let mut round = Self::load_round(&env, round_id)?;

        if round.status == RoundStatus::Settled {
            return Err(Error::RoundAlreadySettled);
        }

        round.status = RoundStatus::Settled;
        round.winners = winners;
        env.storage()
            .persistent()
            .set(&(ROUND, round_id), &round);
        Ok(())
    }

    // -----------------------------------------------------------------------
    // Player actions
    // -----------------------------------------------------------------------

    /// Claim the caller's share of the pot for a settled round.
    ///
    /// The protocol fee is sent to the treasury on the **first** claim.
    /// Remaining tokens are split equally among winners; any integer remainder
    /// is distributed one unit at a time to the earliest winners (by index).
    pub fn claim_winnings(env: Env, caller: Address, round_id: u64) -> Result<i128, Error> {
        caller.require_auth();

        let config = Self::load_config(&env)?;
        let mut round = Self::load_round(&env, round_id)?;

        if round.status != RoundStatus::Settled {
            return Err(Error::RoundNotSettled);
        }

        // Locate the caller in the winners list.
        let winner_index = round
            .winners
            .iter()
            .position(|w| w == caller)
            .ok_or(Error::NotAWinner)? as i128;

        // Ensure the caller has not already claimed.
        if round.claimed.iter().any(|c| c == caller) {
            return Err(Error::AlreadyClaimed);
        }

        let winner_count = round.winners.len() as i128;
        let fee = round.pot * (config.fee_bps as i128) / BPS_DENOM;
        let distributable = round.pot - fee;
        let base_share = distributable / winner_count;
        let remainder = distributable - base_share * winner_count;

        // Deterministic dust: the first `remainder` winners receive one extra unit.
        let payout = if winner_index < remainder {
            base_share + 1
        } else {
            base_share
        };

        round.claimed.push_back(caller.clone());
        env.storage()
            .persistent()
            .set(&(ROUND, round_id), &round);

        let token_client = token::Client::new(&env, &round.token);

        if payout > 0 {
            token_client.transfer(&env.current_contract_address(), &caller, &payout);
        }

        // Send the protocol fee to the treasury exactly once — on the first claim.
        if fee > 0 && round.claimed.len() == 1 {
            token_client.transfer(
                &env.current_contract_address(),
                &config.treasury,
                &fee,
            );
        }

        env.events().publish(
            (symbol_short!("claimed"), caller.clone(), round_id),
            payout,
        );

        Ok(payout)
    }

    // -----------------------------------------------------------------------
    // Views
    // -----------------------------------------------------------------------

    /// Return the stored round, or `RoundNotFound`.
    pub fn get_round(env: Env, round_id: u64) -> Result<Round, Error> {
        Self::load_round(&env, round_id)
    }

    /// Return the current protocol configuration, or `NotInitialized`.
    pub fn get_config(env: Env) -> Result<Config, Error> {
        Self::load_config(&env)
    }

    // -----------------------------------------------------------------------
    // Helpers
    // -----------------------------------------------------------------------

    fn load_config(env: &Env) -> Result<Config, Error> {
        env.storage()
            .instance()
            .get(&CONFIG)
            .ok_or(Error::NotInitialized)
    }

    fn load_round(env: &Env, round_id: u64) -> Result<Round, Error> {
        env.storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok_or(Error::RoundNotFound)
    }
}
