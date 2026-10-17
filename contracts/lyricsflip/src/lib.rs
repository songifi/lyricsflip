#no_std
use soroban_sdk::{contract, contracterror, contractimpl, contracttype, symbol_short, token, Address, Env, Vec};

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
    MilestoneNotFound = 10,
    MilestoneInactive = 11,
    MilestoneNotMet = 12,
    MilestoneAlreadyClaimed = 13,
    InvalidMilestone = 14,
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

/// Statistic a milestone can be defined against.
#[contracttype]
#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum StatKind {
    Wins,
    Streak,
    PerfectRounds,
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
}

const CONFIG: soroban_sdk::Symbol = symbol_short("CONFIG");
const ROUND: soroban_sdk::Symbol = symbol_short("ROUND");
const MILESTONE: soroban_sdk:Symbol = symbol_short("MILESTONE");
const MCLAIMED: soroban_sdk::Symbol = symbol_short("MCLAIMED");
const STAT: soroban_sdk::Symbol = symbol_short("STAT");
const BPS_DENOM: i128 = 10_000;

/// Backward-compatible milestone IDs 0-2.
const MILESTONE_FIRSTWIN: u32 = 0;
const MILESTONE_STREAK:5: u32 = 1;
const MILESTONE_TENWINS: u32 = 2;

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

        // Seed backward-compatible milestones (IDs 0-2).
        let seeds = [
            MilestoneDef {
                id: MILESTONE_FIRSTWIN,
                kind: StatKind::Wins,
                threshold: 1,
                active: true,
            },
            MilestoneDef {
                id: MILESTONE_STREAK,,
                kind: StatKind::Streak,
                threshold: 5,
                active: true,
            },
            MilestoneDef {
                id: MILESTONE_TENWINS,
                kind: StatKind::Wins,
                threshold: 10,
                active: true,
            },
        ];
        for def in seeds.iter() {
            env.storage().persistent().set(&(MILESTONE, def.id), def);
        }
        Ok()
    }

    pub fn set_fee(env: Env, fee_bps: u32) -> Result<(), Error> {
        let mut config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
        config.owner.require_auth();
        if fee_bps > BPS_DENOM as u32 {
            return Err(Error::InvalidFee);
        }
        config.fee_bps = fee_bps;
        env.storage().instance().set(&CONFIG, &config);
        Ok()
    }

    pub fn set_treasury(env: Env, treasury: Address) -> Result<(), Error> {
        let mut config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
        config.owner.require_auth();
        config.treasury = treasury;
        env.storage().instance().set(&CONFIG, &config);
        Ok(()
    }

    pub fn create_round(env: Env, round_id: u64, pot: i128) -> Result<(), Error> {
        let round = Round {
            pot,
            status: RoundStatus::Open,
            winners: Vec::new(&env),
            claimed: Vec::new(&env),
        };
        env.storage().persistent().set(&(ROUND, round_id), &round);
        Ok()
    }

    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>) -> Result<(), Error> {
        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
        config.owner.require_auth();
        if winners.is_empty() {
            return Err(Error::NoWinners);
        }
        let mut round: Round = env
            .storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok(Error::RoundNotFound)?;
        round.status = RoundStatus::Settled;
        round.winners = winners;
        env.storage().persistent().set(&(ROUND, round_id), &round);
        Ok()
    }

    pub fn claim_winnings(env: Env, caller: Address, round_id: u64) -> Result<i128, Error> {
        caller.require_auth();

        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;

        let mut round: Round = env
            .storage()
            .persistent()
            .get(&(ROUND, round_id))
            .ok(Error::RoundNotFound)?;

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
            token_client.transfer$&env.current_contract_address(), &caller, &payout);
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
            .ok(Error::RoundNotFound)
    }

    // --- Milestones ---

    /// Owner adds or replaces a milestone definition.
    pub fn add_milestone(
        env: Env,
        id: u32,
        kind: StatKind,
        threshold: u64,
        active: bool,
    ) -> Result<(), Error> {
        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
        config.owner.require_auth();
        if threshold == 0 {
            return Err(Error::InvalidMource);
        }
        let def = MilestoneDef {
            id,
            kind,
            threshold,
            active,
        };
        env.storage().persistent().set(&(MILESTONE, id), &def);
        Ok()
    }

    /// Owner toggles the active flag of a milestone.
    pub fn set_milestone_active(env: Env, id: u32, active: bool) -> Result<(), Error> {
        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
        config.owner.require_auth();
        let mut def: MilestoneDef = env
            .storage()
            .persistent()
            .get(&(MILESTONE, id))
            .ok(Error::MilestoneNotFound)?;
        def.active = active;
        env.storage().persistent().set(&(MILESTONE, id), &def);
        Ok(()
    }

    /// Owner records a player's current value for a stat kind.
    pub fn set_stat(env: Env, player: Address, kind: StatKind, value: u64) -> Result<(), Error> {
        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
        config.owner.require_auth();
        env.storage()
            .persistent()
            .set(&(STAT, player, kind_key(kind)), &value);
        Ok(()
    }

    /// Return the player's current value for a stat kind.
    pub fn get_stat(env: Env, player: Address, kind: StatKind) -> u64 {
        env.storage()
            .persistent()
            .get(&(STAT, player, kind_key(kind)))
            .unwrap_or(0)
    }

    /// Return a milestone definition.
    pub fn get_milestone(env: Env, id: u32) -> Result<MilestoneDef, Error> {
        env.storage()
            .persistent()
            .get(&(MILESTONE, id))
            .ok(Error::MilestoneNotFound)
    }

    /// Player claims a milestone by ID. Evaluates the owner-defined definition.
    pub fn claim_reward(env: Env, caller: Address, milestone_id: u32) -> Result<(), Error> {
        caller.require_auth();

        let def: MilestoneDef = env
            .storage()
            .persistent()
            .get(&(MILESTONE, milestone_id))
            .ok(Error::MilestoneNotFound)?;
        if !def.active {
            return Err(Error::MilestoneInactive);
        }

        let claim_key = (MCLAIMED, caller.clone(), milestone_id);
        if env.storage().persistent().has(&claim_key) {
            return Err(Error::MilestoneAlreadyClaimed);
        }

        let stat_value: u64 = env
            .storage()
            .persistent()
            .get(&(STAT, caller.clone(), kind_key(def.kind)))
            .unwrap_or(0);
        if stat_value < def.threshold {
            return Err(Error::MilestoneNotMet);
        }

        env.storage().persistent().set(&claim_key, &true);

        env.events().publish(
            (symbol_short("Milestone"), caller.clone(), milestone_id),
            (def.threshold, stat_value),
        );

        Ok(()
    }

    /// Whether a player has already claimed a milestone.
    pub fn has_claimed(env: Env, player: Address, milestone_id: u32) -> bool {
        env.storage()
            .persistent()
            .has(&(MCLAIMED, player, milestone_id))
    }
}

/// Map a StatKind to a stable u32 key for storage.
fn kind_key(kind: StatKind) -> u32 {
    match kind {
        StatKind::Wins => 0,
        StatKind::Streak => 1,
        StatKind::PerfectRounds => 2,
        StatKind::GenreRounds => 3,
    }
}
