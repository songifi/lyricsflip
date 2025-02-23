use LyricsFlip::{InternalFunctions, InternalFunctionsTrait};
use lyricsflip::contracts::lyricsflip::LyricsFlip;
use lyricsflip::interfaces::lyricsflip::{ILyricsFlipDispatcher, ILyricsFlipDispatcherTrait};
use lyricsflip::utils::types::{Card, Genre};
use snforge_std::{
    ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, declare, spy_events,
    start_cheat_block_timestamp_global, start_cheat_caller_address,
    stop_cheat_block_timestamp_global, stop_cheat_caller_address,
};
use starknet::{ContractAddress, get_block_timestamp};

fn OWNER() -> ContractAddress {
    'OWNER'.try_into().unwrap()
}

fn ADMIN_ADDRESS() -> ContractAddress {
    'ADMIN_ADDRESS'.try_into().unwrap()
}

fn PLAYER_1() -> ContractAddress {
    'PLAYER_1'.try_into().unwrap()
}

fn PLAYER_2() -> ContractAddress {
    'PLAYER_2'.try_into().unwrap()
}

const ADMIN_ROLE: felt252 = selector!("ADMIN_ROLE");
const INVALID_ROLE: felt252 = selector!("INVALID_ROLE");

fn deploy() -> ILyricsFlipDispatcher {
    let contract = declare("LyricsFlip").unwrap().contract_class();
    let mut constructor_calldata = array![];
    let owner: ContractAddress = OWNER().try_into().unwrap();
    owner.serialize(ref constructor_calldata);
    let (contract_address, _) = contract.deploy(@constructor_calldata).unwrap();

    ILyricsFlipDispatcher { contract_address }
}

#[test]
fn test_create_round() {
    let lyricsflip = deploy();
    let mut spy = spy_events();
    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
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
                        },
                    ),
                ),
            ],
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
fn test_set_role() {
    let lyricsflip = deploy();
    let mut _spy = spy_events();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    let is_admin = lyricsflip.is_admin(ADMIN_ROLE, ADMIN_ADDRESS());
    assert(is_admin == true, 'wrong is_admin value');
}

#[test]
#[should_panic(expected: "role not enable")]
fn test_set_role_should_panic_when_invalid_role_is_passed() {
    let lyricsflip = deploy();
    let mut _spy = spy_events();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), INVALID_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
#[should_panic(expected: ('Caller is not the owner',))]
fn test_set_role_should_panic_when_called_by_non_owner() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
fn test_start_round() {
    let lyricsflip = deploy();
    let mut spy = spy_events();

    start_cheat_block_timestamp_global(1736593692);

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);

    // Player 1 creates and join round
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), 1);
    stop_cheat_caller_address(lyricsflip.contract_address);

    // Player 2 joins round
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_2());
    lyricsflip.join_round(round_id);

    // Check round isn't started
    let round = lyricsflip.get_round(round_id);
    assert(!round.is_started, 'Round shouldnt be started yet');

    // Player 1 signals ready
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    lyricsflip.start_round(round_id);

    // Verify round still not started with only one player ready
    let round = lyricsflip.get_round(round_id);
    assert!(!round.is_started, "Round shouldnt start with 1 ready");

    // Player 2 signals ready
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_2());
    lyricsflip.start_round(round_id);

    // Verify round started after all players ready
    let round = lyricsflip.get_round(round_id);
    assert(round.is_started, 'Round should be started');

    spy
        .assert_emitted(
            @array![
                (
                    lyricsflip.contract_address,
                    LyricsFlip::Event::PlayerReady(
                        LyricsFlip::PlayerReady {
                            round_id, player: PLAYER_1(), ready_time: get_block_timestamp(),
                        }
                    )
                ),
                (
                    lyricsflip.contract_address,
                    LyricsFlip::Event::PlayerReady(
                        LyricsFlip::PlayerReady {
                            round_id, player: PLAYER_2(), ready_time: get_block_timestamp(),
                        }
                    )
                ),
                (
                    lyricsflip.contract_address,
                    LyricsFlip::Event::RoundStarted(
                        LyricsFlip::RoundStarted {
                            round_id, admin: round.admin, start_time: round.start_time,
                        }
                    )
                ),
            ],
        );

    stop_cheat_block_timestamp_global();
}

#[test]
#[should_panic(expected: ('Already signalled ready',))]
fn test_start_round_player_cannot_start_round_twice() {
    let lyricsflip = deploy();

    // Setup admin and cards
    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..5_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    lyricsflip.set_cards_per_round(5);
    stop_cheat_caller_address(lyricsflip.contract_address);

    // Create round
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), 1);

    // Try to start twice
    lyricsflip.start_round(round_id);
    lyricsflip.start_round(round_id); // Should panic
}

#[test]
#[should_panic(expected: ('Not a participant',))]
fn test_start_round_only_participants_can_ready() {
    let lyricsflip = deploy();

    // Setup admin and cards
    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..5_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    lyricsflip.set_cards_per_round(5);
    stop_cheat_caller_address(lyricsflip.contract_address);

    // Player 1 creates round
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), 1);

    // Non-participant tries to ready
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_2());
    lyricsflip.start_round(round_id); // Should panic
}

#[test]
fn test_join_round() {
    let lyricsflip = deploy();
    let mut spy = spy_events();

    start_cheat_block_timestamp_global(1736593692);

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
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
                        },
                    ),
                ),
            ],
        );

    stop_cheat_block_timestamp_global();

    let round_players = lyricsflip.get_round_players(round_id);

    assert(lyricsflip.get_players_round_count(round_id) == 2, 'wrong players count');
    assert(*round_players.at(1) == PLAYER_2(), 'wrong player address');
}

#[test]
#[should_panic(expected: ('Genre does not exists',))]
fn test_create_round_should_panic_with_unknown_genre() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);
    let seed = 1;
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    lyricsflip.create_round(Option::None, seed);

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

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
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

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
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

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
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
                        },
                    ),
                ),
            ],
        );
}

#[test]
fn test_get_cards_per_round() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    let initial_cards_per_round = 3;
    lyricsflip.set_cards_per_round(initial_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);
    let retrieved_cards_per_round = lyricsflip.get_cards_per_round();
    assert(retrieved_cards_per_round == initial_cards_per_round, 'wrong cards_per_round value');
}

#[test]
#[should_panic(expected: ('Invalid cards per round',))]
fn test_set_cards_per_round_should_panic_with_invalid_value() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    let invalid_cards_per_round = 0;
    lyricsflip.set_cards_per_round(invalid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
fn test_add_card() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    let genre: Genre = Genre::Reggae;

    let card = Card {
        card_id: 1,
        genre: genre,
        artist: 'Bob Marley',
        title: "",
        year: 2000,
        lyrics: "Lorem Ipsum",
    };

    lyricsflip.add_card(card);
    stop_cheat_caller_address(lyricsflip.contract_address);
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

#[test]
fn test_get_cards_of_genre() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..5_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let seed = 1;
    stop_cheat_caller_address(lyricsflip.contract_address);
    let genre_cards = lyricsflip.get_cards_of_genre(Genre::HipHop, seed);
    assert(genre_cards.len() == valid_cards_per_round.into(), 'wrong cards count');
    for i in 0
        ..genre_cards.len() {
            assert(*genre_cards.at(i).genre == Genre::HipHop, 'wrong genre');
        }
}

#[test]
#[should_panic(expected: ('Not enough cards of this genre',))]
fn test_get_cards_of_genre_should_panic_with_not_enough_cards_of_this_genre() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let seed = 1;
    stop_cheat_caller_address(lyricsflip.contract_address);
    let genre_cards = lyricsflip.get_cards_of_genre(Genre::HipHop, seed);
    assert(genre_cards.len() == valid_cards_per_round.into(), 'wrong cards count');
    for i in 0
        ..genre_cards.len() {
            assert(*genre_cards.at(i).genre == Genre::HipHop, 'wrong genre');
        }
}

#[test]
fn test_get_cards_of_artist() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..5_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Tupac',
                title: "",
                year: 1990,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let seed = 1;
    stop_cheat_caller_address(lyricsflip.contract_address);
    let artist_cards = lyricsflip.get_cards_of_artist('Tupac', seed);
    assert(artist_cards.len() == valid_cards_per_round.into(), 'wrong cards count');
    for i in 0
        ..artist_cards.len() {
            assert(*artist_cards.at(i).artist == 'Tupac', 'wrong artist');
        }
}

#[test]
#[should_panic(expected: ('Artist cards is zero',))]
fn test_get_cards_of_artist_should_panic_with_zero_cards() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let seed = 1;
    let artist_cards = lyricsflip.get_cards_of_artist('Tupac', seed);
    assert(artist_cards.len() == valid_cards_per_round.into(), 'wrong cards count');
    for i in 0
        ..artist_cards.len() {
            assert(*artist_cards.at(i).artist == 'Tupac', 'wrong artist');
        }
}

#[test]
fn test_get_cards_of_a_year() {
    // Deploy contract
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    let target_year = 2000;
    for i in 0
        ..5_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Paris Paloma',
                title: "Labour",
                year: target_year,
                lyrics: "For somebody",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    let seed = 1;
    stop_cheat_caller_address(lyricsflip.contract_address);

    let year_cards = lyricsflip.get_cards_of_a_year(target_year, seed);

    assert(year_cards.len() == valid_cards_per_round.into(), 'wrong cards count');

    for i in 0..year_cards.len() {
        assert(*year_cards.at(i).year == target_year, 'wrong year');
    }
}

#[test]
#[should_panic(expected: 'Year cards is zero')]
fn test_get_cards_of_a_year_should_panic_with_empty_year() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    let seed = 1;
    stop_cheat_caller_address(lyricsflip.contract_address);

    let non_existent_year = 1999;
    let _year_cards = lyricsflip.get_cards_of_a_year(non_existent_year, seed);
}

#[test]
fn test_get_cards_of_a_year_random_distribution() {
    let lyricsflip = deploy();
    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    let target_year = 2000;
    let total_cards = 10_u64;
    for i in 0
        ..total_cards {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Paris Paloma',
                title: "Labour",
                year: target_year,
                lyrics: "For somebody",
            };
            lyricsflip.add_card(card);
        };

    let cards_per_round = 5;
    lyricsflip.set_cards_per_round(cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);

    let cards_set1 = lyricsflip.get_cards_of_a_year(target_year, 1);
    let cards_set2 = lyricsflip.get_cards_of_a_year(target_year, 2);

    let mut all_same = true;
    for i in 0
        ..cards_set1
            .len() {
                if *cards_set1.at(i).card_id != *cards_set2.at(i).card_id {
                    all_same = false;
                    break;
                }
            };
    assert(!all_same, 'Different seeds give same cards');
}

#[test]
fn test_next_card() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..5_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);

    // Create and start a round
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let seed = 1;
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), seed);
    lyricsflip.start_round(round_id);

    // Get all cards and verify round completion
    let mut all_cards = array![];

    // Get cards until round is completed
    for i in 0
        ..valid_cards_per_round {
            let card = lyricsflip.next_card(round_id);
            all_cards.append(card);
            let round = lyricsflip.get_round(round_id);
            if i == valid_cards_per_round - 1 {
                assert(round.is_completed == true, 'round should be completed');
            } else {
                assert(round.is_completed == false, 'round should not be completed');
            }
        };

    assert(all_cards.len() == valid_cards_per_round.into(), 'wrong number of cards');

    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
#[should_panic(expected: ('Round does not exists',))]
fn test_next_card_should_panic_with_non_existing_round() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let non_existent_round_id = 999;
    lyricsflip.next_card(non_existent_round_id);
    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
#[should_panic(expected: ('Round not started',))]
fn test_next_card_should_panic_with_non_started_round() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..5_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);

    // Create round but don't start it
    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let seed = 1;
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), seed);

    // Try to get next card without starting round
    lyricsflip.next_card(round_id);
    stop_cheat_caller_address(lyricsflip.contract_address);
}

#[test]
#[should_panic(expected: ('Round already completed',))]
fn test_next_card_should_panic_with_completed_round() {
    let lyricsflip = deploy();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..5_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let seed = 1;
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), seed);
    lyricsflip.start_round(round_id);

    // Get all cards to complete the round
    for _ in 0..valid_cards_per_round {
        let _ = lyricsflip.next_card(round_id);
    };

    // Try to get one more card after round is completed
    lyricsflip.next_card(round_id);
    stop_cheat_caller_address(lyricsflip.contract_address);
}


#[test]
fn test_start_round_updates_player_stats() {
    let lyricsflip = deploy();

    start_cheat_block_timestamp_global(1736593692);

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, ADMIN_ADDRESS());
    for i in 0
        ..10_u64 {
            let card = Card {
                card_id: i.into(),
                genre: Genre::HipHop,
                artist: 'Bob Marley',
                title: "",
                year: 2000,
                lyrics: "Lorem Ipsum",
            };
            lyricsflip.add_card(card);
        };

    let valid_cards_per_round = 5;
    lyricsflip.set_cards_per_round(valid_cards_per_round);
    stop_cheat_caller_address(lyricsflip.contract_address);

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let seed = 1;
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop), seed);

    let player_stats = lyricsflip.get_player_stat(PLAYER_1());

    assert(player_stats.total_rounds == 0, 'total rounds not zero');
    lyricsflip.start_round(round_id);

    stop_cheat_caller_address(lyricsflip.contract_address);

    let round = lyricsflip.get_round(round_id);

    let player_stats = lyricsflip.get_player_stat(PLAYER_1());

    assert(player_stats.total_rounds == 1, 'Player stats not updated');

    stop_cheat_block_timestamp_global();
}
