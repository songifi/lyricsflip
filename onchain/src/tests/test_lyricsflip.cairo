use lyricsflip::contracts::lyricsflip::LyricsFlip;
use lyricsflip::interfaces::lyricsflip::{ILyricsFlipDispatcher, ILyricsFlipDispatcherTrait};
use lyricsflip::utils::types::{Genre};
use snforge_std::{
    declare, spy_events, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address, start_cheat_block_timestamp_global,
    stop_cheat_block_timestamp_global, EventSpyAssertionsTrait
};
use starknet::{ContractAddress, get_block_timestamp};

fn PLAYER_1() -> ContractAddress {
    'PLAYER_1'.try_into().unwrap()
}

fn PLAYER_2() -> ContractAddress {
    'PLAYER_2'.try_into().unwrap()
}


fn deploy() -> ILyricsFlipDispatcher {
    let contract = declare("LyricsFlip").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@array![]).unwrap();

    ILyricsFlipDispatcher { contract_address }
}

#[test]
fn test_create_round() {
    let lyricsflip = deploy();
    let mut spy = spy_events();

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop));

    stop_cheat_caller_address(lyricsflip.contract_address);

    let round = lyricsflip.get_round(round_id);

    spy
        .assert_emitted(
            @array![
                (
                    lyricsflip.contract_address,
                    LyricsFlip::Event::RoundCreated(
                        LyricsFlip::RoundCreated {
                            round_id: round_id,
                            admin: PLAYER_1(),
                            created_time: get_block_timestamp(),
                        }
                    )
                )
            ]
        );

    assert(round.round_id == round_id, 'wrong round id');
    assert(round.genre == Genre::HipHop, 'wrong genre');
    assert(round.admin == PLAYER_1(), 'wrong player');
    assert(round.wager_amount == 0, 'wrong wager_amount');
    assert(round.start_time == 0, 'wrong start_time');
    assert(round.is_started == false, 'wrong is_started');
    assert(round.end_time == 0, 'wrong end_time');

    let round_cards = lyricsflip.get_round_cards(round_id);
    // Atm following assertions are hardcoded
    // Must be dynamic when the `get_random_cards()` function is coded
    assert(*round_cards.at(0) == 1, 'wrong card 0');
    assert(*round_cards.at(1) == 2, 'wrong card 1');
}

#[test]
fn test_start_round() {
    let lyricsflip = deploy();
    let mut spy = spy_events();

    start_cheat_block_timestamp_global(1736593692);
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop));
    lyricsflip.start_round(round_id);

    stop_cheat_caller_address(lyricsflip.contract_address);

    let round = lyricsflip.get_round(round_id);

    assert(round.start_time == get_block_timestamp(), 'wrong start_time');
    assert(round.is_started == true, 'wrong is_started');

    let round_players = lyricsflip.get_round_players(round_id);

    assert(lyricsflip.get_players_round_count(round_id) == 1, 'wrong players count');
    assert(*round_players.at(0) == PLAYER_1(), 'wrong player address');
    assert(lyricsflip.is_round_player(round_id, PLAYER_1()), 'wrong is_player value');

    spy
        .assert_emitted(
            @array![
                (
                    lyricsflip.contract_address,
                    LyricsFlip::Event::RoundStarted(
                        LyricsFlip::RoundStarted {
                            round_id: round_id,
                            admin: PLAYER_1(),
                            start_time: get_block_timestamp(),
                        }
                    )
                )
            ]
        );

    stop_cheat_block_timestamp_global();
}

#[test]
fn test_join_round() {
    let lyricsflip = deploy();
    let mut spy = spy_events();

    start_cheat_block_timestamp_global(1736593692);
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop));

    stop_cheat_caller_address(lyricsflip.contract_address);
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_2());

    lyricsflip.join_round(round_id);

    stop_cheat_caller_address(lyricsflip.contract_address);

    spy
        .assert_emitted(
            @array![
                (
                    lyricsflip.contract_address,
                    LyricsFlip::Event::RoundJoined(
                        LyricsFlip::RoundJoined {
                            round_id: round_id,
                            player: PLAYER_2(),
                            joined_time: get_block_timestamp(),
                        }
                    )
                )
            ]
        );

    stop_cheat_block_timestamp_global();

    let round_players = lyricsflip.get_round_players(round_id);

    assert(lyricsflip.get_players_round_count(round_id) == 2, 'wrong players count');
    assert(*round_players.at(1) == PLAYER_2(), 'wrong player address');
    assert(lyricsflip.is_round_player(round_id, PLAYER_2()), 'wrong is_player value');
}

#[test]
#[should_panic(expected: ('Genre does not exists',))]
fn test_create_round_should_panic_with_unknown_genre() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    lyricsflip.create_round(Option::None);

    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
#[should_panic(expected: ('Only round admin can start',))]
fn test_start_round_should_panic_with_only_admin() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop));

    stop_cheat_caller_address(lyricsflip.contract_address);
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_2());

    lyricsflip.start_round(round_id);

    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
#[should_panic(expected: ('Round does not exists',))]
fn test_start_round_should_panic_with_non_existing_round() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let round_id = 0;
    lyricsflip.start_round(round_id);

    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
#[should_panic(expected: ('Round already started',))]
fn test_join_round_should_panic_with_round_already_started() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop));
    lyricsflip.start_round(round_id);

    stop_cheat_caller_address(lyricsflip.contract_address);
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_2());

    lyricsflip.join_round(round_id);

    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
#[should_panic(expected: ('You are already a player',))]
fn test_join_round_should_panic_with_already_joined() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop));

    stop_cheat_caller_address(lyricsflip.contract_address);
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_2());

    lyricsflip.join_round(round_id);
    lyricsflip.join_round(round_id);

    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
#[should_panic(expected: ('Round does not exists',))]
fn test_join_round_should_panic_with_non_existing_round() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let round_id = 0;
    lyricsflip.join_round(round_id);

    stop_cheat_caller_address(lyricsflip.contract_address);
}


#[test]
fn test_set_cards_per_round() {
    let lyricsflip = deploy();
    let mut spy = spy_events();

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let valid_cards_per_round = 3;
    lyricsflip.set_cards_per_round(valid_cards_per_round);

    stop_cheat_caller_address(lyricsflip.contract_address);

    let cards_per_round = lyricsflip.get_cards_per_round();

    assert(cards_per_round == valid_cards_per_round, 'wrong cards_per_round');

    spy
        .assert_emitted(
            @array![
                (
                    lyricsflip.contract_address,
                    LyricsFlip::Event::SetCardPerRound(
                        LyricsFlip::SetCardPerRound {
                            old_value: cards_per_round, new_value: valid_cards_per_round,
                        }
                    )
                )
            ]
        );
}

#[test]
fn test_get_cards_per_round() {
    let lyricsflip = deploy();

    let initial_cards_per_round = 3;
    lyricsflip.set_cards_per_round(initial_cards_per_round);

    let retrieved_cards_per_round = lyricsflip.get_cards_per_round();
    assert(retrieved_cards_per_round == initial_cards_per_round, 'wrong cards_per_round value');
}

#[test]
#[should_panic(expected: ('Invalid cards per round',))]
fn test_set_cards_per_round_should_panic_with_invalid_value() {
    let lyricsflip = deploy();

    let invalid_cards_per_round = 0;
    lyricsflip.set_cards_per_round(invalid_cards_per_round);
}
