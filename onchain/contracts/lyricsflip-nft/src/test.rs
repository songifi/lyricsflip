//! Representative behavior-coverage tests ported from
//! `onchain/src/tests/test_lyricsflipNFT.cairo` (minter-gated minting, token
//! id increments, ownership lookups). Not `cargo test`-verified in this
//! environment (no Rust toolchain available).

use crate::{LyricsFlipNFT, LyricsFlipNFTClient};
use soroban_sdk::{testutils::Address as _, Address, Env, String};

fn setup<'a>() -> (Env, LyricsFlipNFTClient<'a>, Address, Address) {
    let env = Env::default();
    env.mock_all_auths();
    let owner = Address::generate(&env);
    let minter = Address::generate(&env);
    let contract_id = env.register(
        LyricsFlipNFT,
        (
            owner.clone(),
            minter.clone(),
            String::from_str(&env, "LyricsFlip"),
            String::from_str(&env, "LFLIP"),
            String::from_str(&env, "https://example.com/metadata/"),
        ),
    );
    let client = LyricsFlipNFTClient::new(&env, &contract_id);
    (env, client, owner, minter)
}

#[test]
fn mint_by_minter_succeeds_and_sets_owner() {
    let (env, client, _owner, minter) = setup();
    let recipient = Address::generate(&env);

    let token_id = client.mint(&minter, &recipient);
    assert_eq!(token_id, 1);
    assert_eq!(client.owner_of(&token_id), recipient);
}

#[test]
fn mint_by_non_minter_fails() {
    let (env, client, owner, _minter) = setup();
    let recipient = Address::generate(&env);

    let result = client.try_mint(&owner, &recipient);
    assert!(result.is_err(), "only the configured minter may mint");
}

#[test]
fn token_ids_increment_across_mints() {
    let (env, client, _owner, minter) = setup();
    let recipient_a = Address::generate(&env);
    let recipient_b = Address::generate(&env);

    let first = client.mint(&minter, &recipient_a);
    let second = client.mint(&minter, &recipient_b);

    assert_eq!(first, 1);
    assert_eq!(second, 2);
    assert_eq!(client.owner_of(&first), recipient_a);
    assert_eq!(client.owner_of(&second), recipient_b);
}

#[test]
fn owner_of_unminted_token_fails() {
    let (_env, client, _owner, _minter) = setup();
    let result = client.try_owner_of(&999u128);
    assert!(result.is_err());
}
