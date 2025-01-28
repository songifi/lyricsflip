use LyricsFlip::{InternalFunctions, InternalFunctionsTrait};
use lyricsflip::contracts::lyricsflip::LyricsFlip;
use lyricsflip::interfaces::lyricsflip::{ILyricsFlipDispatcher, ILyricsFlipDispatcherTrait};
use lyricsflip::utils::types::{Genre, Card};
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

    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum"
            };
            lyricsflip.add_card(card);
        };

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);

    let seed = 1;
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), seed);
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
    assert(round_cards.len() == valid_cards_per_round.into(), 'wrong cards count');

    let mut numbers: Felt252Dict<bool> = Default::default();
    for i in 0
        ..round_cards
            .len() {
                let card = *round_cards.at(i);
                assert(!numbers.get(card.into()), 'duplicate card');
                numbers.insert(card.into(), true);
            }
}

#[test]
fn test_start_round() {
    let lyricsflip = deploy();
    let mut spy = spy_events();

    start_cheat_block_timestamp_global(1736593692);

    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum"
            };
            lyricsflip.add_card(card);
        };

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);

    let seed = 1;
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), seed);
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

    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum"
            };
            lyricsflip.add_card(card);
        };

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);

    let seed = 1;
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), seed);

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

    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum"
            };
            lyricsflip.add_card(card);
        };

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);

    let seed = 1;
    lyricsflip.create_round(Option::None, seed);

    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
#[should_panic(expected: ('Only round admin can start',))]
fn test_start_round_should_panic_with_only_admin() {
    let lyricsflip = deploy();

    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum"
            };
            lyricsflip.add_card(card);
        };

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);

    let seed = 1;
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), seed);

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

    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum"
            };
            lyricsflip.add_card(card);
        };

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);

    let seed = 1;
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), seed);
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

    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum"
            };
            lyricsflip.add_card(card);
        };

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);

    let seed = 1;
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), seed);

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
    let old_value = lyricsflip.get_cards_per_round();
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
                            old_value: old_value, new_value: valid_cards_per_round,
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

#[test]
fn test_add_card() {
    let lyricsflip = deploy();

    let genre: Genre = Genre::Reggae;

    let card = Card {
        card_id: 1, genre: genre, artist: 'Bob Marley', title: "", year: 2000, lyrics: "Lorem Ipsum"
    };

    lyricsflip.add_card(card);

    let card_stored = lyricsflip.get_card(1);
    assert(card_stored.card_id == 1, 'Wrong card_id');
    assert(card_stored.year == 2000, 'Wrong card_id');
    assert(card_stored.artist == 'Bob Marley', 'Wrong card_id');
}

#[test]
fn test_generate_random_numbers() {
    let mut state = LyricsFlip::contract_state_for_testing();
    let for_index_random_numbers = state._get_random_numbers(1, 5, 5, true);
    let mut numbers: Felt252Dict<bool> = Default::default();
    for i in 0
        ..for_index_random_numbers
            .len() {
                let number = *for_index_random_numbers.at(i);
                assert(!numbers.get(number.into()), 'duplicate number');
                assert(number >= 0 && number < 5, 'number out of range');
                numbers.insert(number.into(), true);
            };

    let not_for_index_random_numbers = state._get_random_numbers(1, 5, 5, false);
    let mut numbers: Felt252Dict<bool> = Default::default();
    for i in 0
        ..not_for_index_random_numbers
            .len() {
                let number = *not_for_index_random_numbers.at(i);
                assert(!numbers.get(number.into()), 'duplicate number');
                assert(number > 0 && number <= 5, 'number out of range');
                numbers.insert(number.into(), true);
            }
}

#[test]
#[should_panic(expected: ('Amount exceeds limit',))]
fn test_generate_random_numbers_should_panic_with_invalid_amount() {
    let mut state = LyricsFlip::contract_state_for_testing();
    let for_index_random_numbers = state._get_random_numbers(1, 6, 5, true);
    let mut numbers: Felt252Dict<bool> = Default::default();
    for i in 0
        ..for_index_random_numbers
            .len() {
                let number = *for_index_random_numbers.at(i);
                assert(!numbers.get(number.into()), 'duplicate number');
                assert(number >= 0 && number < 5, 'number out of range');
                numbers.insert(number.into(), true);
            };
}
