#![no_std]

#[cfg(test)]
mod test;

use soroban_sdk::{contract, contracterror, contractevent, contractimpl, contracttype, panic_with_error, Address, Env, String};

#[contractevent]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct NftMinted {
    #[topic]
    pub token_id: u128,
    pub recipient: Address,
}

/// Ported from `onchain/src/contracts/lyricsflipNFT.cairo`. Soroban has no
/// ERC721-equivalent standard bundled the way OpenZeppelin Cairo provides
/// one, and no `SRC5`-style interface introspection, so this keeps only the
/// surface the original contract actually used: minter-gated `mint`, a
/// monotonically increasing token id, and per-token ownership.
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    AlreadyInitialized = 1,
    NotMinter = 2,
    TokenAlreadyExists = 3,
    TokenDoesNotExist = 4,
}

#[contracttype]
#[derive(Clone)]
enum DataKey {
    Owner,
    Minter,
    TokenName,
    TokenSymbol,
    BaseUri,
    TokenCount,
    TokenOwner(u128),
}

#[contract]
pub struct LyricsFlipNFT;

#[contractimpl]
impl LyricsFlipNFT {
    pub fn __constructor(
        env: Env,
        owner: Address,
        minter: Address,
        token_name: String,
        token_symbol: String,
        base_uri: String,
    ) {
        if env.storage().instance().has(&DataKey::Owner) {
            panic_with_error!(env, Error::AlreadyInitialized);
        }
        env.storage().instance().set(&DataKey::Owner, &owner);
        env.storage().instance().set(&DataKey::Minter, &minter);
        env.storage().instance().set(&DataKey::TokenName, &token_name);
        env.storage().instance().set(&DataKey::TokenSymbol, &token_symbol);
        env.storage().instance().set(&DataKey::BaseUri, &base_uri);
        env.storage().instance().set(&DataKey::TokenCount, &0u128);
    }

    pub fn mint(env: Env, caller: Address, recipient: Address) -> u128 {
        caller.require_auth();

        let minter: Address = env.storage().instance().get(&DataKey::Minter).unwrap();
        if caller != minter {
            panic_with_error!(env, Error::NotMinter);
        }

        let count: u128 = env.storage().instance().get(&DataKey::TokenCount).unwrap_or(0);
        let token_id = count + 1;

        if env.storage().persistent().has(&DataKey::TokenOwner(token_id)) {
            panic_with_error!(env, Error::TokenAlreadyExists);
        }

        env.storage().persistent().set(&DataKey::TokenOwner(token_id), &recipient);
        env.storage().instance().set(&DataKey::TokenCount, &token_id);

        NftMinted { token_id, recipient }.publish(&env);

        token_id
    }

    pub fn owner_of(env: Env, token_id: u128) -> Address {
        env.storage()
            .persistent()
            .get(&DataKey::TokenOwner(token_id))
            .unwrap_or_else(|| panic_with_error!(env, Error::TokenDoesNotExist))
    }

    pub fn token_name(env: Env) -> String {
        env.storage().instance().get(&DataKey::TokenName).unwrap()
    }

    pub fn token_symbol(env: Env) -> String {
        env.storage().instance().get(&DataKey::TokenSymbol).unwrap()
    }

    pub fn base_uri(env: Env) -> String {
        env.storage().instance().get(&DataKey::BaseUri).unwrap()
    }

    pub fn token_count(env: Env) -> u128 {
        env.storage().instance().get(&DataKey::TokenCount).unwrap_or(0)
    }
}
