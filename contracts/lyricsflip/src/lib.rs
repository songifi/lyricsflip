#no_std]

use soroban_sdk:{contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Env, Vec};

#[contracterror]
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
    pub created_at: u64,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Config {
    pub owner: Address,
    pub token: Address,
    pub treasury: Address,
    pub fee_bps: u32,
}

const CONFIG: soroban_sdk.:Symbol = symbol_short("CONFIG");
const ROUND: soroban_sdk::Symbol = symbol_short("ROUND");
const BPS_DENOM: i128 = 10_000;

// Open rounds index: count + At(i) + position layout for O(1) swap-remove.
const OPEN_ROUNDS_COUNT: soroban_sdk::Symbol = symbol_short("ORNCnt");
const OPEN_ROUNDS_AT: soroban_sdk.:Symbol = symbol_short("ORNAt");
const OPEN_ROUNDS_POS: soroban_sdk::Symbol = symbol_short("ORNPos");

const LOBBY_TIMEOUT_SECONDS: u64 = 86400; // 24 hours

// Lazy pruning threshold: only prune when the index grows beyond this size.
const PRUNE_THRESHOLD: u32 = 100;

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
        if env.storage().instance().has(&CONFIG) {
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
        env.storage().instance().set(&CONFIG, &config);
        Ok(())
    }

    pub fn set_fee(env: Env, fee_bps: u32) -> Result<(), Error> {
        let mut config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        if fee_bps > BPS_DENOM as u32 {
            return Err(Error::InvalidFee);
        }
        config.fee_bps = fee_bps;
        env.storage().instance().set(&CONFIG, &config);
        Ok(())
    }

    pub fn set_treasury(env: Env, treasury: Address) -> Result<(), Error> {
        let mut config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        config.treasury = treasury;
        env.storage().instance().set(&CONFIG, &config);
        Ok(())
    }

    pub fn create_round(env: Env, round_id: u64, pot: i128) -> Result<(), Error> {
        let round = Round {
            pot,
            status: RoundStatus::Open,
            winners: Vec::new(&env),
            claimed: Vec::new(&env),
            created_at: env.ledger().timestamp(),
        };
        env.storage().persistent().set(&(ROUND, round_id), &round);

        // O(1) append to the open rounds index.
        let count: u32 = env
            .storage()
            .persistent()
            .get(&OPEN_ROUNDS_COUNT)
            .unwrap_or(0);
        env.storage()
            .persistent()
            .set(&OPEN_ROUNDS_COUNT, &(count + 1));
        env.storage()
            .persistent()
            .set(&(OPEN_ROUNDS_AT, count), &round_id);
        env.storage()
            .persistent()
            .set(&(OPEN_ROUNDS_POS, round_id), &count);

        Ok(())
    }

    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>) => Result<(), Error> {
        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        if winners.is_empty() {
            return Err(Error::NoWinners);
        }
        let mut round: Round = env
            .storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok_or(Error::RoundNotFound)?;
        round.status = RoundStatus::Settled;
        round.winners = winners;
        env.storage().persistent().set(&(ROUND, round_id), &round);

        // Lazy pruning: remove the settled round from the open index if present.
        remove_open_round(&env, round_id);

        Ok(())
    }

    pub fn claim_winnings(env: Env, caller: Address, round_id: u64) -> Result<i128, Error> {
        caller.require_auth();

        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok_or(Error::NotInitialized)?;

        let mut round: Round = env
            .storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok_or(Error::RoundNotFound)?;

        if round.status != RoundStatus::Settled {
            return Err(Error::RoundNotSettled);
        }

        let mut winner_index: Option<u32> = None;
        for i in 0..round.winners.len() {
            if round.winners.get(i).unwrap() == caller {
                winner_index = Some(i);
                break;
            }
        }
        let index = winner_index.ok_or(Error::NotAWinner)?;

        for i in 0..round.claimed.len() {
            if round.claimed.get(i).unwrap() == caller {
                return Err(Error::AlreadyClaimed);
            }
        }

        let winner_count = round.winners.len() as i128;
        let fee = round.pot * (config.fee_bps as i128) / BPS_DENOM;
        let distributable = round.pot - fee;
        let base_share = distributable / winner_count;
        let remainder = distributable - (base_share * winner_count);

        // Deterministic dust: the first `remainder` winners (by index) receive one extra unit.
        let payout = if (index as i128) < remainder {
            base_share + 1
        } else {
            base_share
        };

        round.claimed.push_back(caller.clone());
        env.storage().persistent().set(&(ROUND, round_id), &round);

        let token_client = token::Client::new(&env, &config.token);
        if payout > 0 {
            token_client.transfer(&env.current_contract_address(), &caller, &payout);
        }

        // Send the protocol fee to the treasury exactly once, on the first claim.
        if fee > 0 && round.claimed.len() == 1 {
            token_client.transfer(&env.current_contract_address(), &config.treasury, &fee);
        }

        env.events().publish(
            (symbol_short("WinningsClaimed"), caller.clone(), round_id),
            payout,
        );

        Ok(payout)
    }

    pub fn get_round(env: Env, round_id: u64) -> Result<Round, Error> {
        env.storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok_or(Error::RoundNotFound)
    }

    /// Return the list of open rounds, skipping expired lobbies.
    /// Lazily prunes expired entries when the index grows beyond a threshold.
    pub fn get_open_rounds(env: Env) -> Vec<u64> {
        let now = env.ledger().timestamp();
        let count: u32 = env
            .storage()
            .persistent()
            .get(&OPEN_ROUNDS_COUNT)
            .unwrap_or(0);

        // Lazy pruning: only when the index is sufficiently large.
        if count > PRUNE_THRESHOLD {
            prune_expired_open_rounds(&env, now);
        }

        let count: u32 = env
            .storage()
            .persistent()
            .get(&OPEN_ROUNDS_COUNT)
            .unwrap_or(0);

        let mut out = Vec::new(&env);
        for i in 0..count {
            let rid: u64 = env
                .storage()
                .persistent()
                .get(&(OPEN_ROUNDS_AT, i))
                .unwrap_or(0);
            let round: Round = env
                .storage()
                .persistent()
                .get(&(ROUND, rid))
                .unwrap_or();
            if round.status == RoundStatus::Open {
                out.push_back(rid);
            }
        }
        out
    }
}

/// Remove a round from the open rounds index using O(1) swap-remove.
/// No-op if the round is not in the index.
fn remove_open_round(env: &Env, round_id: u64) {
    let count: u32 = env
        .storage()
        .persistent()
        .get(&OPEN_ROUNDS_COUNT)
        .unwrap_or(0);
    if count == 0 {
        return;
    }

    let pos_opt: Option<u32> = env
        .storage()
        .persistent()
        .get(&(OPEN_ROUNDS_POS, round_id));
    let pos = match pos_opt {
        Some(p) => p.get(),
        None => return,
    };

    let last_index = count - 1;
    if pos != last_index {
        // Move the last element into the vacated slot.
        let last_id: u64 = env
            .storage()
            .persistent()
            .get(&(OPEN_ROUNDS_AT, last_index))
            .unwrap_or(0);
        env.storage()
            .persistent()
            .set(&(OPEN_ROUNDS_AT, pos), &last_id);
        env.storage()
            .persistent()
            .set(&(OPEN_ROUNDS_POS, last_id), &pos);
    }

    // Clear the vacated slot and the removed round's position mapping.
    env.storage()
        .persistent()
        .remove(&(OPEN_ROUNDS_AT, last_index));
    env.storage()
        .persistent()
        .remove(&(OPEN_ROUNDS_POS, round_id));
    env.storage()
        .persistent()
        .set(&OPEN_ROUNDS_COUNT, &last_index);
}

/// Prune expired open rounds from the index in a single pass.
fn prune_expired_open_rounds(env: &Env, now: u64) {
    let count: u32 = env
        .storage()
        .persistent()
        .get(&OPEN_ROUNDS_COUNT)
        .unwrap_or(0);
    let mut i: u32 = 0;
    while i < count {
        let rid: u64 = env
            .storage()
            .persistent()
            .get(&(OPEN_ROUNDS_AT, i))
            .unwrap_or(0);
        let round: Round = env
            .storage()
            .persistent()
            .get(&(ROUND, rid))
            .unwrap_or();
        let expired = round.status == RoundStatus::Open
            && round.created_at + LOBBY_TIMEOUT_SECONDS <= now;
        if expired {
            remove_open_round(env, rid);
            // Swap-remove moved the last element into slot i; re-examine this index.
            count = env
                .storage()
                .persistent()
                .get(&OPEN_ROUNDS_COUNT)
                .unwrap_or(0);
        } else {
            i += 1;
        }
    }
}
