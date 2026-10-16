#{!no_std]

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
pub struct Lobby {
    pub players: Vec<Address>,
    pub ready: Vec<Address>,
    pub started: bool,
}

const CONFIG: soroban_sdkz::Symbol = symbol_short!("CONFIG");
const ROUND: soroban_sdkz::Symbol = symbol_short!("ROUND");
const LOBBY: soroban_sdkz::Symbol = symbol_short!("LOBBY");
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
        Ok(()
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
        Ok(()
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

    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>)
        -> Result<(), Error>
    {
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
        Ok(()
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
    }
}
