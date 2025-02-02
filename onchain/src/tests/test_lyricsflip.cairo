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
    let mut spy = spy_events();

    start_cheat_caller_address(lyricsflip.contract_address, OWNER());
    lyricsflip.set_role(ADMIN_ADDRESS(), ADMIN_ROLE, true);
    stop_cheat_caller_address(lyricsflip.contract_address);

    let is_admin = lyricsflip.is_admin(ADMIN_ROLE, ADMIN_ADDRESS());
    assert(is_admin == true, 'wrong is_admin value');
}

#[test]
#[should_panic]
fn test_set_role_should_panic_when_invalid_role_is_passed() {
    let lyricsflip = deploy();
    let mut spy = spy_events();

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

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
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
                        },
                    ),
                ),
            ],
        );

    stop_cheat_block_timestamp_global();
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
    assert(lyricsflip.is_round_player(round_id, PLAYER_2()), 'wrong is_player value');
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
#[should_panic(expected: ('Only round admin can start',))]
fn test_start_round_should_panic_with_only_admin() {
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
