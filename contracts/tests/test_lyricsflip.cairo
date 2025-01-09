use starknet::ContractAddress;

use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address
};

use lyricsflip::interfaces::{ILyricsFlipDispatcher, ILyricsFlipDispatcherTrait};
use lyricsflip::types::{Genre};

fn deploy_lyricsflip() -> ILyricsFlipDispatcher {
    let contract = declare("LyricsFlip").unwrap().contract_class();
    let (contract_address, _) = contract.deploy(@ArrayTrait::new()).unwrap();

    ILyricsFlipDispatcher { contract_address }
}

fn PLAYER_1() -> ContractAddress {
    'player_1'.try_into().unwrap()
}

fn PLAYER_2() -> ContractAddress {
    'player_1'.try_into().unwrap()
}

#[test]
fn test_create_round() {
    let lyricsflip = deploy_lyricsflip();

    start_cheat_caller_address(lyricsflip.contract_address, PLAYER_1());
    let round_id = lyricsflip.create_round(Option::Some(Genre::HipHop));
    stop_cheat_caller_address(lyricsflip.contract_address);

    let round = lyricsflip.get_round(round_id);

    assert(round.round_id == round_id, 'wrong round id');
    assert(round.player == PLAYER_1(), 'wrong player');
}

