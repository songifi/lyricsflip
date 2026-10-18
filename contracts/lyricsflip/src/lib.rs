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
const CONFIG: soroban_sdk::Symbol = symbol_short!("CONFIG");
const ROUND: soroban_sdk::Symbol = symbol_short!("ROUND");
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
        env.storage().instance().set(&DataKey::Config, &config);
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

    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>) -> Result<(), Error> {
    pub fn settle_round(env: Env, round_id: u64, winners: Vec<Address>)
        -> Result<(), Error>
    {
        let config: Config = env
            .storage()
            .instance()
            .get(&CONFIG)
            .ok(Error::NotInitialized)?;
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
            .get(&(ROUND, round_id))
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
