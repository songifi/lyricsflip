#`![no_std]

mod types;

use soroban_sdk:{contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Env, Vec};
use types:{PlayerResult, PlayerStats};

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
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Config {
    pub owner: Address,
    pub token: Address,
    pub treasury: Address,
    pub fee_bps: u32,
}

const CONFIG: soroban_sdk:Symbol = symbol_short!("CONFIG");
const ROUND: soroban_sdk::Symbol = symbol_short!("ROUND");
const PLAYERS: soroban_sdk:Symbol = symbol_short!("PLAYERS");
const BPS_DENOM: i128 = 10_000;

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
        };
        env.storage().persistent().set(&(ROUND, round_id), &round);
        Ok(())
    }

    /// Record or update a player's stats for a round. Owner-authorized.
    pub fn record_player(
        env: Env,
        round_id: u64,
        player: Address,
        points: u32,
        correct: u32,
        total_time: u64,
    ) -> Result<(), Error> {
        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        if !env.storage().persistent().has(&(ROUND, round_id)) {
            return Err(Error::RoundNotFound);
        }
        let mut stats: Vec<PlayerStats> = env
            .storage()
            .persistent()
            .get(&(PLAYERS, round_id))
            .unwrap_or(Vec::new(&env));
        let mut found = false;
        for i in 0..stats.len() {
            let mut s: PlayerStats = stats.get(i).unwrap();
            if s.player == player {
                s.points = points;
                s.correct = correct;
                s.total_time = total_time;
                stats.set(i, s);
                found = true;
                break;
            }
        }
        if !found {
            stats.push_back(PlayerStats {
                player,
                points,
                correct,
                total_time,
            });
        }
        env.storage().persistent().set(&(PLAYERS, round_id), &stats);
        Ok(())
    }

    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>) -> Result<(), Error> {
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
            (symbol_short!("WinningsClaimed"), caller.clone(), round_id),
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

    /// Return per-player results for a round, sorted by rank using the same
    /// tie-break as `determine_round_winners`: higher points, then more correct,
    /// then lower total time, then address ascending for determinism.
    pub fn get_round_results(env: Env, round_id: u64) -> Result<Vec<PlayerResult>, Error> {
        let round: Round = env
            .storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok_or(Error::RoundNotFound)?;

        let stats: Vec<PlayerStats> = env
            .storage()
            .persistent()
            .get(&(PLAYERS, round_id))
            .unwrap_or(Vec::new(&env));

        // Insertion sort by the winner tie-break.
        let mut ordered: Vec<PlayerStats> = Vec::new(&env);
        for i in 0..stats.len() {
            let current = stats.get(i).unwrap();
            let mut insert_at = ordered.len();
            for j in 0..ordered.len() {
                let existing = ordered.get(j).unwrap();
                if stats_before(&current, &existing) {
                    insert_at = j;
                    break;
                }
            }
            ordered.insert(insert_at, current);
        }

        let mut results: Vec<PlayerResult> = Vec::new(&env);
        for i in 0..ordered.len() {
            let s = ordered.get(i).unwrap();
            let mut claimed = false;
            for k in 0..round.claimed.len() {
                if round.claimed.get(k).unwrap() == s.player {
                    claimed = true;
                    break;
                }
            }
            results.push_back(PlayerResult {
                player: s.player,
                points: s.points,
                correct: s.correct,
                total_time: s.total_time,
                rank: i + 1,
                claimed,
            });
        }
        Ok(results)
    }
}

/// Returns true if `should_come_before` should sort before `existing` under the
/// winner tie-break: higher points, then more correct, then lower total time,
/// then address ascending.
fn stats_before(should_come_before: &PlayerStats, existing: &PlayerStats) -> bool {
    if should_come_before.points != existing.points {
        return should_come_before.points > existing.points;
    }
    if should_come_before.correct != existing.correct {
        return should_come_before.correct > existing.correct;
    }
    if should_come_before.total_time != existing.total_time {
        return should_come_before.total_time < existing.total_time;
    }
    should_come_before.player < existing.player
}
