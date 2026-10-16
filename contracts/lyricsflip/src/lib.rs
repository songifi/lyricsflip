#{!no_std]

use soroban_sdk::{contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Env, Vec};

mod events;

use events::WinningsClaimed;

#contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq)]
#[repr(u32)]
pub enum Error {
    AlreadyInitialized = 1,
    NotInitialized = 2,
    Unauthorized = 3,
    RoundNotFound = 4,
    RoundNotSettled = 5,
    AlreadyClaimed = 6,
    NotAWinner = 7,
    InvalidFee = 8,
    NoWinners = 9,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum RoundStatus {
    Open,
    Settled,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Round {
    pub pot: i128,
    pub status: RoundStatus,
    pub winners: Vec<Address>,
    pub claimed: Vec<Address>,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Config {
    pub owner: Address,
    pub token: Address,
    pub treasury: Address,
    pub fee_bps: u32,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DataKey {
    Config,
    Round(u64),
    Claimed((u64, Address)),
}

const B8S_DENOM: i128 = 10_000;

#[contract]
pub struct LyricsFlipContract;

#[contractimpl]
impl LyricsFlipContract {
    pub fn initialize(
        env: Env,
        owner: Address,
        token: Address,
        treasury: Address,
        fee_bps: u32,
    ) -> Result<(), Error> {
        if env.storage().instance().has(&DataKey::Config) {
            return Err(Error::AlreadyInitialized);
        }
        if fee_bps > BPS_DENOM as u32 {
            return Err(Error::InvalidFee);
        }
        let config = Config {
            owner,
            token,
            treasury,
            fee_bps,
        };
        env.storage().instance().set(&DataKey::Config, &config);
        Ok()
    }

    pub fn set_fee(env: Env, fee_bps: u32) -> Result<(), Error> {
        let mut config: Config = env
            .storage()
            .instance()
            .get(&DataKey::Config)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        if fee_bps > BPS_DENOM as u32 {
            return Err(Error::InvalidFee);
        }
        config.fee_bps = fee_bps;
        env.storage().instance().set(&DataKey::Config, &config);
        Ok(()
    }

    pub fn set_treasury(env: Env, treasury: Address) -> Result<(), Error> {
        let mut config: Config = env
            .storage()
            .instance()
            .get(&DataKey::Config)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        config.treasury = treasury;
        env.storage().instance().set(&DataKey::Config, &config);
        Ok()
    }

    pub fn create_round(env: Env, round_id: u64, pot: i128) -> Result<(), Error> {
        let round = Round {
            pot,
            status: RoundStatus::Open,
            winners: Vec::new(&env),
            claimed: Vec::new(&env),
        };
        env.storage().persistent().set(&DataKey::Round(round_id), &round);
        Ok()
    }

    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>) -> Result<(), Error> {
        let config: Config = env
            .storage()
            .instance()
            .get(&DataKey::Config)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        if winners.is_empty() {
            return Err(Error::NoWinners);
        }
        let mut round: Round = env
            .storage()
            .persistent()
            .get(&DataKey::Round(round_id))
            .ok_or(Error::RoundNotFound)?;
        round.status = RoundStatus::Settled;
        round.winners = winners;
        env.storage().persistent().set(&DataKey::Round(round_id), &round);
        Ok(()
    }

    pub fn claim_winnings(env: Env, caller: Address, round_id: u64) -> Result<i128, Error> {
        caller.require_auth();

        let config: Config = env
            .storage()
            .instance()
            .get(&DataKey::Config)
            .ok_or(Error::NotInitialized)?;

        let mut round: Round = env
            .storage()
            .persistent()
            .get(&DataKey::Round(round_id))
            .ok_or(Error::RoundNotFound)?;

        if round.status != RoundStatus::Settled {
            return Err(Error::RoundNotSettled);
        }

        let claimed_key = DataKey::Claimed((round_id, caller.clone()));
        if env.storage().persistent().has(&claimed_key) {
            return Err(Error::AlreadyClaimed);
        }

        let fee = round.pot * (config.fee_bps as i128) / BPS_DENOM;
        let distributable = round.pot - fee;

        let payout = if round.winners.is_empty() {
            // No winners: every player receives a refund of their own stake.
            // With no winner list, the full pot is available for refunds.
            distributable
        } else {
            let mut winner_index: Option<u32> = None;
            for i in 0..round.winners.len() {
                if round.winners.get(i).unwrap() == caller {
                    winner_index = Some(i);
                    break;
                }
            }
            if winner_index.is_none() {
                return Err(Error::NotAWinner);
            }
            let winner_count = round.winners.len() as i128;
            distributable / winner_count
        };

        // Checks-effects-interactions: mark as claimed before any transfer.
        env.storage().persistent().set(&claimed_key, &true);
        round.claimed.push_back(caller.clone());
        env.storage().persistent().set(&DataKey::Round(round_id), &round);

        let token_client = token::Client::new(&env, &config.token);
        if payout > 0 {
            token_client.transfer(&env.current_contract_address(), &caller, &payout);
        }

        // Send the protocol fee to the treasury exactly once, on the first claim.
        if fee > 0 && round.claimed.len() == 1 {
            token_client.transfer(&env.current_contract_address(), &config.treasury, &fee);
        }

        WinningsClaimed {
            round_id,
            player: caller.clone(),
            amount: payout,
        }
        .publish(&env);

        Ok(payout)
    }

    pub fn get_round(env: Env, round_id: u64) -> Result<Round, Error> {
        env
            .storage()
            .persistent()
            .get(&DataKey::Round(round_id))
            .ok_or(Error::RoundNotFound)
    }
}
