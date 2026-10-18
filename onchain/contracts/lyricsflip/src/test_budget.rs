//! Resource-budget regression tests (LF-033). Each test records CPU and
//! memory for one call with realistic data and fails if it exceeds the
//! ceiling in `budget_thresholds.rs`.

extern crate std;

use crate::budget_thresholds::*;
use crate::{Card, Genre, LyricsFlip, LyricsFlipClient, QuestionKind, MAX_ROUND_PLAYERS};
use soroban_sdk::{
    testutils::{Address as _, Ledger},
    Address, Env, String,
};

const CATALOGUE_SIZE: u64 = 500;

fn setup_catalogue<'a>() -> (Env, LyricsFlipClient<'a>, Address) {
    let env = Env::default();
    env.mock_all_auths();
    env.ledger().set_timestamp(1_780_000_000);
    env.cost_estimate().budget().reset_unlimited();

    let owner = Address::generate(&env);
    let contract_id = env.register(LyricsFlip, (owner.clone(),));
    let client = LyricsFlipClient::new(&env, &contract_id);

    for i in 0..CATALOGUE_SIZE {
        let card = Card {
            card_id: 0,
            genre: Genre::Pop,
            artist: String::from_str(&env, &std::format!("Artist {}", i)),
            title: String::from_str(&env, &std::format!("Title {}", i)),
            year: 1950 + (i % 70),
            difficulty: 2,
            lyrics: String::from_str(&env, "sample lyric line"),
        };
        client.add_card(&owner, &card);
    }
    (env, client, owner)
}

fn measure<F: FnOnce()>(env: &Env, name: &str, max_cpu: u64, max_mem: u64, call: F) {
    env.cost_estimate().budget().reset_default();
    call();
    let cpu = env.cost_estimate().budget().cpu_instruction_cost();
    let mem = env.cost_estimate().budget().memory_bytes_cost();
    std::println!("{name}: cpu={cpu} mem={mem}");
    assert!(cpu <= max_cpu, "{name} CPU {cpu} exceeds {max_cpu}");
    assert!(mem <= max_mem, "{name} memory {mem} exceeds {max_mem}");
    env.cost_estimate().budget().reset_unlimited();
}

#[test]
fn create_round_budget() {
    let (env, client, owner) = setup_catalogue();
    measure(
        &env,
        "create_round",
        CREATE_ROUND_MAX_CPU,
        CREATE_ROUND_MAX_MEM,
        || {
            client.create_round(&owner, &Some(Genre::Pop), &42u64);
        },
    );
}

#[test]
fn start_round_budget() {
    let (env, client, owner) = setup_catalogue();
    let round_id = client.create_round(&owner, &Some(Genre::Pop), &42u64);
    let mut players = std::vec::Vec::new();
    for _ in 1..MAX_ROUND_PLAYERS {
        let player = Address::generate(&env);
        client.join_round(&player, &round_id);
        players.push(player);
    }
    for player in players.iter() {
        client.start_round(player, &round_id);
    }
    // The last ready-up starts the round for all 8 players.
    measure(
        &env,
        "start_round",
        START_ROUND_MAX_CPU,
        START_ROUND_MAX_MEM,
        || {
            client.start_round(&owner, &round_id);
        },
    );
}

#[test]
fn build_question_card_budget() {
    let (env, client, _owner) = setup_catalogue();
    let card = client.get_card(&1u64);
    for kind in [
        QuestionKind::Title,
        QuestionKind::Artist,
        QuestionKind::Year,
    ] {
        measure(
            &env,
            "build_question_card",
            BUILD_QUESTION_CARD_MAX_CPU,
            BUILD_QUESTION_CARD_MAX_MEM,
            || {
                client.build_question_card(&card, &7u64, &kind);
            },
        );
    }
}
