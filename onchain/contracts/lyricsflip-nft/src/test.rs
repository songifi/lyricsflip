//! Representative behavior-coverage tests ported from
//! `onchain/src/tests/test_lyricsflipNFT.cairo` (minter-gated minting, token
//! id increments, ownership lookups). Not `cargo test`-verified in this
//! environment (no Rust toolchain available).

use crate::{Error, LyricsFlipNFT, LyricsFlipNFTClient};
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

/// Clients map on these numeric codes; renumbering any of them is a breaking
/// change. Update `onchain/README.md` and `frontend/src/lib/stellar/errors.ts`
/// together with this test.
#[test]
fn error_codes_are_stable() {
    let expected = [
        (Error::AlreadyInitialized, 1),
        (Error::NotMinter, 2),
        (Error::TokenAlreadyExists, 3),
        (Error::TokenDoesNotExist, 4),
        (Error::IncorrectOwner, 5),
        (Error::InsufficientApproval, 6),
        (Error::InvalidLiveUntilLedger, 7),
        (Error::NotOwner, 8),
        (Error::NotPendingOwner, 9),
        (Error::BaseUriTooLong, 10),
    ];
    for (variant, code) in expected {
        assert_eq!(variant as u32, code, "{:?} was renumbered", variant);
    }
}

// ---------------------------------------------------------------------------
// LF-012 – persistent TokenOwner entries survive a ledger advance
// ---------------------------------------------------------------------------

/// After minting a token and advancing the ledger sequence far past Soroban's
/// default minimum TTL, `owner_of` must still succeed because `extend_ttl`
/// was called on the `TokenOwner` entry during `mint`.
#[test]
fn ttl_survival_token_owner_survives_ledger_advance() {
    use soroban_sdk::testutils::Ledger as _;

    let (env, client, _owner, minter) = setup();
    let recipient = Address::generate(&env);

    let token_id = client.mint(&minter, &recipient);
    assert_eq!(token_id, 1);

    // Advance ledger sequence well past the default minimum TTL (4 096).
    env.ledger().set_sequence_number(100_000);

    // TokenOwner must still be readable.
    let owner_after = client.owner_of(&token_id);
    assert_eq!(
        owner_after, recipient,
        "token owner should still be readable after ledger advance"
    );
}
#[test]
fn transfer_moves_token_and_updates_balances() {
    let (env, client, _owner, minter) = setup();
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    let token_id = client.mint(&minter, &alice);
    client.mint(&minter, &alice);
    assert_eq!(client.balance(&alice), 2);

    client.transfer(&alice, &bob, &token_id);

    assert_eq!(client.owner_of(&token_id), bob);
    assert_eq!(client.balance(&alice), 1);
    assert_eq!(client.balance(&bob), 1);
}

#[test]
fn transfer_by_non_owner_is_rejected() {
    let (env, client, _owner, minter) = setup();
    let alice = Address::generate(&env);
    let mallory = Address::generate(&env);
    let token_id = client.mint(&minter, &alice);

    let result = client.try_transfer(&mallory, &mallory, &token_id);
    assert_eq!(result, Err(Ok(Error::IncorrectOwner.into())));
    let result = client.try_transfer_from(&mallory, &alice, &mallory, &token_id);
    assert_eq!(result, Err(Ok(Error::InsufficientApproval.into())));
    assert_eq!(client.owner_of(&token_id), alice);
    assert_eq!(client.balance(&alice), 1);
}

#[test]
fn approved_spender_can_transfer_once() {
    let (env, client, _owner, minter) = setup();
    let alice = Address::generate(&env);
    let spender = Address::generate(&env);
    let bob = Address::generate(&env);
    let token_id = client.mint(&minter, &alice);

    client.approve(&alice, &spender, &token_id, &1000);
    assert_eq!(client.get_approved(&token_id), Some(spender.clone()));

    client.transfer_from(&spender, &alice, &bob, &token_id);
    assert_eq!(client.owner_of(&token_id), bob);
    assert_eq!(client.balance(&alice), 0);
    assert_eq!(client.balance(&bob), 1);
    // The per-token approval is cleared on transfer.
    assert_eq!(client.get_approved(&token_id), None);
    let result = client.try_transfer_from(&spender, &bob, &alice, &token_id);
    assert_eq!(result, Err(Ok(Error::InsufficientApproval.into())));
}

#[test]
fn operator_approved_for_all_can_transfer_and_approve() {
    let (env, client, _owner, minter) = setup();
    let alice = Address::generate(&env);
    let operator = Address::generate(&env);
    let bob = Address::generate(&env);
    let token_id = client.mint(&minter, &alice);

    client.approve_for_all(&alice, &operator, &1000);
    assert!(client.is_approved_for_all(&alice, &operator));
    client.approve(&operator, &bob, &token_id, &1000);
    assert_eq!(client.get_approved(&token_id), Some(bob.clone()));
    client.transfer_from(&operator, &alice, &bob, &token_id);
    assert_eq!(client.owner_of(&token_id), bob);

    client.approve_for_all(&alice, &operator, &0);
    assert!(!client.is_approved_for_all(&alice, &operator));
}

#[test]
fn approval_by_non_owner_is_rejected() {
    let (env, client, _owner, minter) = setup();
    let alice = Address::generate(&env);
    let mallory = Address::generate(&env);
    let token_id = client.mint(&minter, &alice);

    let result = client.try_approve(&mallory, &mallory, &token_id, &1000);
    assert_eq!(result, Err(Ok(Error::InsufficientApproval.into())));
}

#[test]
fn token_uri_appends_token_id_to_base_uri() {
    let (env, client, _owner, minter) = setup();
    let recipient = Address::generate(&env);
    client.mint(&minter, &recipient);

    assert_eq!(
        client.token_uri(&1),
        String::from_str(&env, "https://example.com/metadata/1")
    );
}

#[test]
fn token_uri_of_missing_token_fails() {
    let (_env, client, _owner, _minter) = setup();
    assert_eq!(
        client.try_token_uri(&1),
        Err(Ok(Error::TokenDoesNotExist.into()))
    );
}

#[test]
fn owner_can_set_base_uri_and_non_owner_cannot() {
    let (env, client, owner, minter) = setup();
    let recipient = Address::generate(&env);
    client.mint(&minter, &recipient);

    let new_uri = String::from_str(&env, "ipfs://cid/");
    assert_eq!(
        client.try_set_base_uri(&minter, &new_uri),
        Err(Ok(Error::NotOwner.into()))
    );
    client.set_base_uri(&owner, &new_uri);
    assert_eq!(client.token_uri(&1), String::from_str(&env, "ipfs://cid/1"));
}

#[test]
fn owner_can_rotate_minter_and_old_minter_cannot_mint() {
    let (env, client, owner, minter) = setup();
    let new_minter = Address::generate(&env);
    let recipient = Address::generate(&env);

    assert_eq!(
        client.try_set_minter(&minter, &new_minter),
        Err(Ok(Error::NotOwner.into()))
    );
    client.set_minter(&owner, &new_minter);
    assert_eq!(client.minter(), new_minter);
    assert_eq!(
        client.try_mint(&minter, &recipient),
        Err(Ok(Error::NotMinter.into()))
    );
    assert_eq!(client.mint(&new_minter, &recipient), 1);
}

#[test]
fn ownership_transfer_is_two_step() {
    let (env, client, owner, _minter) = setup();
    let new_owner = Address::generate(&env);
    let stranger = Address::generate(&env);

    client.transfer_ownership(&owner, &new_owner);
    assert_eq!(client.owner(), owner);
    assert_eq!(
        client.try_accept_ownership(&stranger),
        Err(Ok(Error::NotPendingOwner.into()))
    );
    client.accept_ownership(&new_owner);
    assert_eq!(client.owner(), new_owner);
    assert_eq!(client.pending_owner(), None);
    assert_eq!(
        client.try_set_minter(&owner, &stranger),
        Err(Ok(Error::NotOwner.into()))
    );
}

// ---------------------------------------------------------------------------
// LF-174 – emergency pause
// ---------------------------------------------------------------------------

#[test]
fn pause_blocks_mint_transfer_and_transfer_from() {
    let (env, client, owner, minter) = setup();
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);
    let token_id = client.mint(&minter, &alice);

    client.pause(&owner);
    assert!(client.paused());

    assert_eq!(
        client.try_mint(&minter, &bob),
        Err(Ok(Error::Paused.into()))
    );
    assert_eq!(
        client.try_transfer(&alice, &bob, &token_id),
        Err(Ok(Error::Paused.into()))
    );
    client.approve(&alice, &bob, &token_id, &1000);
    assert_eq!(
        client.try_transfer_from(&bob, &alice, &bob, &token_id),
        Err(Ok(Error::Paused.into()))
    );

    // State is untouched by the blocked calls.
    assert_eq!(client.owner_of(&token_id), alice);
    assert_eq!(client.balance(&alice), 1);
}

#[test]
fn unpause_restores_mint_and_transfer() {
    let (env, client, owner, minter) = setup();
    let alice = Address::generate(&env);
    let bob = Address::generate(&env);

    client.pause(&owner);
    assert_eq!(
        client.try_mint(&minter, &alice),
        Err(Ok(Error::Paused.into()))
    );

    client.unpause(&owner);
    assert!(!client.paused());

    let token_id = client.mint(&minter, &alice);
    client.transfer(&alice, &bob, &token_id);
    assert_eq!(client.owner_of(&token_id), bob);
    assert_eq!(client.balance(&bob), 1);
}

#[test]
fn pause_and_unpause_are_owner_only() {
    let (env, client, _owner, minter) = setup();

    assert_eq!(
        client.try_pause(&minter),
        Err(Ok(Error::NotOwner.into()))
    );
    client.pause(&_owner);
    assert_eq!(
        client.try_unpause(&minter),
        Err(Ok(Error::NotOwner.into()))
    );
    assert!(client.paused());
}

#[test]
fn upgrade_keeps_state_and_changes_version() {
    let (env, client, owner, minter) = setup();
    let recipient = Address::generate(&env);
    client.mint(&minter, &recipient);
    assert_eq!(client.version(), 1);

    let hash = env
        .deployer()
        .upload_contract_wasm(include_bytes!("../../../fixtures/upgrade_v2.wasm").as_slice());
    assert_eq!(
        client.try_upgrade(&minter, &hash),
        Err(Ok(Error::NotOwner.into()))
    );
    client.upgrade(&owner, &hash);

    assert_eq!(client.version(), 2);
    let stored_owner: Address = env.as_contract(&client.address, || {
        env.storage()
            .persistent()
            .get(&crate::DataKey::TokenOwner(1))
            .unwrap()
    });
    assert_eq!(stored_owner, recipient);
}
