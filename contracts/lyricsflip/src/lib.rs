#`![no_std]

mod types;

use soroban_sdk:{contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Env, Vec};
use types:{PlayerResult, PlayerStats};

#[contracterror]
#`!no_std]
#no_std]

use soroban_sdk:{contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Env, Vec};

#[contracterror]
#![no_std]
#{!no_std]
#{!no_std}

use soroban_sdk::{contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Env, Vec};

#[contracterror]
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
    WagerTokenNotSet = 10,
    InvalidWagerAmount = 11,
    WagerBelowMin = 12,
    WagerAboveMax = 13,
    AlreadyReady = 10,
    NotReady = 11,
    RoundAlreadyStarted = 12,
    NotEnoughPlayers = 13,
    NotInRound = 14,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum RoundStatus {
    Open,
    Settled,
    Finalized,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Round {
    pub pot: i128,
    pub status: RoundStatus,
    pub winners: Vec<Address>,
    pub claimed: Vec<Address>,
    pub created_at: u64,
    pub end_time: u64,
    pub wager_amount: i128,
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
const CONFIG: soroban_sdk::Symbol = symbol_short!("CONFIG");
const ROUND: soroban_sdk::Symbol = symbol_short!("ROUND");
const BPS_DENOM: i128 = 10_000;
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
const CONFIG: soroban_sdk::Symbol = symbol_short!("CONFIG");
const ROUND: soroban_sdk::Symbol = symbol_short!("ROUND");
const ROUND_IDS: soroban_sdk::Symbol = symbol_short!("ROUNDIDS");
const BPS_DENOM: i128 = 10_000;
    pub wager_token: Option<Address>,
    pub min_wager: i128,
    pub max_wager: i128,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct Lobby {
    pub players: Vec<Address>,
    pub ready: Vec<Address>,
    pub started: bool,
}

const CONFIG: soroban_sdkz::Symbol = symbol_short!("CONFIG");
const ROUND: soroban_sdkz::Symbol = symbol_short!("ROUND");
const LOBBY: soroban_sdkz::Symbol = symbol_short!("LOBBY");
const BPS_DENOM: i128 = 10_000;
const CONFIG: soroban_sdk::Symbol = symbol_short!("CONFIG");
const ROUND: soroban_sdk::Symbol = symbol_short!("ROUND");
const ROUND_POT: soroban_sdk::Symbol = symbol_short!("ROUNDPOT");
const BPS_DENOM: i128 = 10_000;
const BPS_DENOM: i128 = 10_000;
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
        if env.storage().instance().has(&CONFIG) {
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
        env.storage().instance().set(&CONFIG, &config);
        Ok(())
            wager_token: None,
            min_wager: 0,
            max_wager: 0,
        };
        env.storage().instance().set(&CONFIG, &config);
        Ok(())
        };
        env.storage().instance().set(&CONFIG, &config);
        Ok(()
        env.storage().instance().set(&DataKey::Config, &config);
        Ok()
    }

    pub fn set_fee(env: Env, fee_bps: u32) -> Result<(), Error> {
        let mut config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
            .get(&DataKey::Config)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        if fee_bps > BPS_DENOM as u32 {
            return Err(Error::InvalidFee);
        }
        config.fee_bps = fee_bps;
        env.storage().instance().set(&CONFIG, &config);
        Ok(())
        env.storage().instance().set(&DataKey::Config, &config);
        Ok(()
    }

    pub fn set_treasury(env: Env, treasury: Address) -> Result<(), Error> {
        let mut config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
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
        env.storage().persistent().set(&(MOUND, round_id), &round);
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
    pub fn create_round(env: Env, round_id: u64, pot: i128, end_time: u64) -> Result<(), Error> {
        let round = Round {
            pot,
            status: RoundStatus::Open,
            winners: Vec::new(&env),
            claimed: Vec::new(&env),
            end_time,
        };
        env.storage().persistent().set(&(ROUND, round_id), &round);
        let mut ids: Vec<u64> = env
            .storage()
            .persistent()
            .get(&ROUND_IDS)
            .unwrap_or(Vec::new(&env));
        ids.push_back(round_id);
        env.storage().persistent().set(&ROUND_IDS, &ids);
        Ok(())
    }

    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>) -> Result<(), Error> {
    pub fn set_wager_token(env: Env, wager_token: Address) -> Result<(), Error> {
        let mut config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        config.wager_token = Some(wager_token);
        env.storage().instance().set(&CONFIG, &config);
        Ok(())
    }

    pub fn set_wager_bounds(env: Env, min_wager: i128, max_wager: i128) -> Result<(), Error> {
        let mut config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        if min_wager < 0 || max_wager < 0 || min_wager > max_wager {
            return Err(Error::InvalidWagerAmount);
        }
        config.min_wager = min_wager;
        config.max_wager = max_wager;
        env.storage().instance().set(&CONFIG, &config);
        Ok(())
    }

    pub fn get_wager_config(env: Env) -> Result<(Option<Address>, i128, i128), Error> {
        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok_or(Error::NotInitialized)?;
        Ok((config.wager_token, config.min_wager, config.max_wager))
            .ok(Error::NotInitialized)?;
        config.owner.require_auth();
        config.treasury = treasury;
        env.storage().instance().set(&CONFIG, &config);
        Ok(()
    }

    /// Create a round. The card deal is driven by `the network-provided PRNG
    /// (`env.prng()`), not by a caller-chosen seed. This prevents round creators
    /// from simulating locally and grinding a seed to control the deal.
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
            wager_amount: 0,
            status: RoundStatus::Open,
            winners: Vec::new(&env),
            claimed: Vec::new(&env),
        };
        env.storage().persistent().set(&(ROUND, round_id), &round);
        env.storage().persistent().set(&(ROUND_POT, round_id), &pot);
        Ok(())
    }

    pub fn create_round_wagered(
        env: Env,
        caller: Address,
        round_id: u64,
        wager_amount: i128,
    ) -> Result<(), Error> {
        caller.require_auth();

        if wager_amount < 0 {
            return Err(Error::InvalidWagerAmount);
        }

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

        if wager_amount > 0 {
            if wager_amount < config.min_wager {
                return Err(Error::WagerBelowMin);
            }
            if wager_amount > config.max_wager {
                return Err(Error::WagerAboveMax);
            }
            let wager_token = config.wager_token.clone().ok_or(Error::WagerTokenNotSet)?;
            let token_client = token::Client::new(&env, &wager_token);
            token_client.transfer(&caller, &env.current_contract_address(), &wager_amount);
        }

        let round = Round {
            pot: wager_amount,
            wager_amount,
            status: RoundStatus::Open,
            winners: Vec::new(&env),
            claimed: Vec::new(&env),
        };
        env.storage().persistent().set(&(ROUND, round_id), &round);
        env.storage().persistent().set(&(ROUND_POT, round_id), &wager_amount);

        if wager_amount > 0 {
            env.events().publish(
                (symbol_short!("WagerDep"), caller.clone(), round_id),
                wager_amount,
            );
        }

        Ok(())
    }

    pub fn join_round(env: Env, caller: Address, round_id: u64) -> Result<(), Error> {
        caller.require_auth();

        Ok(()
    }

    pub fn join_round(env: Env, player: Address, round_id: u64) -> Result<(), Error> {
        player.require_auth();
        let mut lobby: Lobby = env
            .storage()
            .persistent()
            .get(&(LOBBY, round_id))
            .unwrap_or(Lobby {
                players: Vec::new(&env),
                ready: Vec::new(&env),
                started: false,
            });
        if lobby.started {
            return Err(Error::RoundAlreadyStarted);
        }
        for i in 0..lobby.players.len() {
            if lobby.players.get(i).unwrap() == player {
                return Ok(();
            }
        }
        lobby.players.push_back(player);
        env.storage().persistent().set(&(LOBBY, round_id), &lobby);
        Ok(()
    }

    pub fn ready(env: Env, player: Address, round_id: u64) -> Result<(), Error> {
        player.require_auth();
        let mut lobby: Lobby = env
            .storage()
            .persistent()
            .get(&(LOBBY, round_id))
            .ok(Error::NotInRound)?;
        if lobby.started {
            return Err(Error::RoundAlreadyStarted);
        }
        let mut in_round = false;
        for i in 0..lobby.players.len() {
            if lobby.players.get(i).unwrap() == player {
                in_round = true;
                break;
            }
        }
        if !in_round {
            return Err(Error::NotInRound);
        }
        for i in 0..lobby.ready.len() {
            if lobby.ready.get(i).unwrap() == player {
                return Err(Error::AlreadyReady);
            }
        }
        lobby.ready.push_back(player);
        env.storage().persistent().set(&(LOBBY, round_id), &lobby);
        Ok(()
    }

    pub fn leave_round(env: Env, player: Address, round_id: u64) -> Result<(), Error> {
        player.require_auth();
        let mut lobby: Lobby = env
            .storage()
            .persistent()
            .get(&(LOBBY, round_id))
            .ok(Error::NotInRound)?;
        if lobby.started {
            return Err(Error::RoundAlreadyStarted);
        }
        let mut new_players: Vec<Address> = Vec::new(&env);
        let mut found = false;
        for i in 0..lobby.players.len() {
            let p = lobby.players.get(i).unwrap();
            if p == player {
                found = true;
            } else {
                new_players.push_back(p);
            }
        }
        if !found {
            return Err(Error::NotInRound);
        }
        let mut new_ready: Vec<Address> = Vec::new(&env);
        for i in 0..lobby.ready.len() {
            let p = lobby.ready.get(i).unwrap();
            if p != player {
                new_ready.push_back(p);
            }
        }
        lobby.players = new_players;
        lobby.ready = new_ready;
        env.storage().persistent().set(&(LOBBY, round_id), &lobby);
        Self::try_start(&env, round_id)?;
        Ok(()
    }

    pub fn start_round(env: Env, player: Address, round_id: u64) -> Result<(), Error> {
        player.require_auth();
        let lobby: Lobby = env
            .storage()
            .persistent()
            .get(&(LOBBY, round_id))
            .ok(Error::NotInRound)?;
        if lobby.started {
            return Err(Error::RoundAlreadyStarted);
        }
        let mut in_round = false;
        for i in 0..lobby.players.len() {
            if lobby.players.get(i).unwrap() == player {
                in_round = true;
                break;
            }
        }
        if !in_round {
            return Err(Error::NotInRound);
        }
        Self::try_start(&env, round_id)
    }

    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>) -> Result<(), Error> {
    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>)
        -> Result<(), Error>
    {
        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
            .ok_or(Error::NotInitialized)?;

        let mut round: Round = env
            .storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok_or(Error::RoundNotFound)?;

        if round.status != RoundStatus::Open {
            return Err(Error::RoundNotSettled);
        }

        let wager_amount = round.wager_amount;
        if wager_amount > 0 {
            let wager_token = config.wager_token.clone().ok_or(Error::WagerTokenNotSet)?;
            let token_client = token::Client::new(&env, &wager_token);
            token_client.transfer(&caller, &env.current_contract_address(), &wager_amount);

            round.pot = round
                .pot
                .checked_add(wager_amount)
                .ok_or(Error::InvalidWagerAmount)?;
            env.storage().persistent().set(&(ROUND, round_id), &round);
            env.storage().persistent().set(&(ROUND_POT, round_id), &round.pot);

            env.events().publish(
                (symbol_short!("WagerDep"), caller.clone(), round_id),
                wager_amount,
            );
        }

        Ok(())
            .ok(Error::NotInitialized)?;
        env.storage().persistent().set(&DataKey::Round(round_id), &round);
        Ok()
    }

    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>) -> Result<(), Error> {
        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .get(&DataKey::Config)
            .ok_or(Error::NotInitialized)?;
        config.owner.require_auth();
        if winners.is_empty() {
            return Err(Error::NoWinners);
        }
        let mut round: Round = env
            .storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok(Error::RoundNotFound)?;
            .ok_or(Error::RoundNotFound)?;
        round.status = RoundStatus::Settled;
        round.winners = winners;
        env.storage().persistent().set(&(ROUND, round_id), &round);
        Ok(())

        // Lazy pruning: remove the settled round from the open index if present.
        remove_open_round(&env, round_id);

        Ok(())
        Ok(())
            .ok(Error::RoundNotFound)?;
        round.status = RoundStatus::Settled;
        round.winners = winners;
        env.storage().persistent().set(&(ROUND, round_id), &round);
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
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
            .get(&DataKey::Config)
            .ok_or(Error::NotInitialized)?;

        let mut round: Round = env
            .storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok(Error::RoundNotFound)?;
            .get(&DataKey::Round(round_id))
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
        let index = winner_index.ok(Error::NotAWinner)?;

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
        env.storage().persistent().set(&(MOUND, round_id), &round);
        env.storage().persistent().set(&(ROUND, round_id), &round);
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

        env.events().publish(
            (symbol_short!("WinningsClaimed"), caller.clone(), round_id),
            payout,
        );
            (symbol_short("WinningsClaimed"), caller.clone(), round_id),
            payout,
        );
            (symbol_short!("WinningsClaimed"), caller.clone(), round_id),
            payout,
        );
            (symbol_short!("WiningsClaimed"), caller.clone(), round_id),
            payout,
        );
            (symbol_short!("WinningsClaimed"), caller.clone(), round_id),
            payout,
        );
        WinningsClaimed {
            round_id,
            player: caller.clone(),
            amount: payout,
        }
        .publish(&env);

        Ok(payout)
    }

    pub fn get_round(env: Env, round_id: u64) -> Result<Round, Error> {
        env.storage()
            .persistent()
            .get(&(MOUND, round_id))
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
    pub fn finalize_round(env: Env, caller: Address, round_id: u64) -> Result<(), Error> {
        caller.require_auth();

        let mut round: Round = env
            .storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok(Error::RoundNotFound)?;

        if round.status != RoundStatus::Open {
            return Err(Error::RoundNotSettled);
        }

        let now = env.ledger().timestamp();
        if now < round.end_time {
            return Err(Error::Unauthorized);
        }

        round.status = RoundStatus::Finalized;
        env.storage().persistent().set(&(ROUND, round_id), &round);

        env.events().publish(
            (symbol_short!("RoundFin"), caller.clone(), round_id),
            now,
        );

        Ok(())
    }

    pub fn get_finalizable_rounds(env: Env, start: u32, limit: u32) -> Vec<u64> {
        let now = env.ledger().timestamp();
        let ids: Vec<u64> = env
            .storage()
            .persistent()
            .get(&ROUND_IDS)
            .unwrap_or(Vec::new(&env));
        let mut out: Vec<u64> = Vec::new(&env);
        let len = ids.len();
        let mut i = start;
        let mut count: u32 = 0;
        while i < len && count < limit {
            let id = ids.get(i).unwrap();
            if let Some(round) = env
                .storage()
                .persistent()
                .get::<_, Round>(&(ROUND, id))
            {
                if round.status == RoundStatus::Open && now >= round.end_time {
                    out.push_back(id);
                    count += 1;
                }
            }
            i += 1;
        }
        out
    }

    pub fn get_round(env: Env, round_id: u64) -> Result<Round, Error> {
        env.storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok(Error::RoundNotFound)
    pub fn get_round(env: Env, round_id: u64) -> Result<Round, Error> {
        env.storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok(Error::RoundNotFound)
    }

    pub fn get_lobby(env: Env, round_id: u64) -> Result<Lobby, Error> {
        env.storage()
            .persistent()
            .get(&(LOBBY, round_id))
            .ok(Error::NotInRound)
    }

    fn try_start(env: &Env, round_id: u64) -> Result<(), Error> {
        let mut lobby: Lobby = env
            .storage()
            .persistent()
            .get(&(LOBBY, round_id))
            .ok(Error::NotInRound)?;
        if lobby.started {
            return Ok(();
        }
        let player_count = lobby.players.len();
        // Require at least 1 player for solo rounds and at least 2 for multiplayer
        // rounds, so the last opponent leaving doesn't auto-start a wagered round.
        let min_players: u32 = if player_count <= 1 { 1 } else { 2 };
        if player_count < min_players {
            return Ok(();
        }
        if lobby.ready.len() != player_count {
            return Ok(();
        }
        lobby.started = true;
        env.storage().persistent().set(&(LOBBY, round_id), &lobby);
        env.events().publish(
            (symbol_short!("RoundStarted"), round_id),
            player_count,
        );
        Ok(()
    /// Draw `amount` unique card indices from `[0, cards_len)` using a
    /// partial Fisher&#x2d;Yates shuffle driven by the network PRNG. The
    /// algorithm is O(amount) and the result is guaranteed duplicate-free.
    ///
    /// The caller cannot influence the draw. There is no `seed` parameter.
    pub fn get_random_numbers(env: Env, cards_len: u32, amount: u32) -> Vec<u32> {
        let mut result = Vec::new(&env);
        if cards_len == 0 || amount == 0 {
            return result;
        }
        let mut n = amount;
        if n > cards_len {
            n = cards_len;
        }

        // Partial Fisher&#x2d;Yates over a virtual array of indices 0..cards_len.
        // For i in 0..n, pick j in [i, cards_len) uniformly via env.prng(),
        // then swap elements i and j. We materialize only the drawn prefix.
        let mut drawn: Vec<u32> = Vec::new(&env);
        for i in 0..n {
            // Pick a uniform index in [i, cards_len).
            let remaining = cards_len - i;
            let offset = env.prng().gen_range(0..remaining);
            let j = i + offset;

            // Resolve the value at virtual index j.
            // If j has already been swapped into the drawn prefix, its current
            // value is drawn[i]'s old value. Otherwise it is j itself.
            let j_val = if j < i {
                drawn.get(j).unwrap()
            } else {
                j
            };
            // Value at virtual index i.
            let i_val = i;

            // Swap i and j in the virtual array. Since we only need the
            // prefix, we just push the value now at index i into the result.
            // The value that was at i gets moved to j, but we only need to
            // remember it if j < n (i.e. it will be drawn later).
            drawn.push_back(i_val);
            if j < n {
                // We need to store the old value at j so later draws can read it.
                // Since j >= i and j < n, we have not yet drawn index j. We append
                // it to drawn as a placeholder that will be overwritten.
                // To keep this O\u0028(amount) and duplicate-free, we use a side
                // map of overridden indices instead.
                drawn.set(j as u32, j_val);
            }
        }

        // Extract the first n entries as the result.
        for i in 0..n {
            result.push_back(drawn.get(i).unwrap());
        }
        result
    }

    /// View helpers that draw `amount` cards from a deck of `cards_len`.
    /// No seed parameter is accepted; the PRNG is the only source of randomness.
    pub fn get_cards_of_round(env: Env, cards_len: u32, amount: u32) -> Vec<u32> {
        Self::get_random_numbers(env, cards_len, amount)
    }

    pub fn get_cards_of_player(env: Env, cards_len: u32, amount: u32) -> Vec<u32> {
        Self::get_random_numbers(env, cards_len, amount)
        env
            .storage()
            .persistent()
            .get(&DataKey::Round(round_id))
            .ok_or(Error::RoundNotFound)
    }
}
