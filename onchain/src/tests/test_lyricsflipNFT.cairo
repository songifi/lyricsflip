use core::array::ArrayTrait;
use core::byte_array::ByteArray;
use core::result::ResultTrait;
use core::traits::Into;
use lyricsflip::contracts::lyricsflipNFT::{
    ILyricsFlipNFTDispatcher as NFTDispatcher, ILyricsFlipNFTDispatcherTrait as NFTDispatcherTrait
};
use openzeppelin::token::erc721::interface::{IERC721Dispatcher, IERC721DispatcherTrait};
use snforge_std::{
    declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address,
    stop_cheat_caller_address
};
use starknet::{ContractAddress, contract_address_const};

// Account functions
fn owner() -> ContractAddress {
    contract_address_const::<'OWNER'>()
}

fn caller() -> ContractAddress {
    contract_address_const::<'CALLER'>()
}

fn setup_dispatcher() -> (ContractAddress, NFTDispatcher) {
    // Declare the contract
    let contract = declare("LyricsFlipNFT").unwrap().contract_class();

    // Prepare constructor calldata
    let mut calldata: Array<felt252> = ArrayTrait::new();

    // Add constructor arguments
    calldata.append(owner().into());

    let name: ByteArray = "TestNFT";
    let symbol: ByteArray = "LYNFT";
    let base_uri: ByteArray = "baseuri";

    name.serialize(ref calldata);
    symbol.serialize(ref calldata);
    base_uri.serialize(ref calldata);

    // Deploy contract
    let (address, _) = contract.deploy(@calldata).unwrap();

    // Create dispatcher
    (address, NFTDispatcher { contract_address: address })
}

#[test]
fn test_successful_mint() {
    let (contract_address, dispatcher) = setup_dispatcher();
    let recipient = contract_address_const::<'RECIPIENT'>();

    start_cheat_caller_address(contract_address, owner());
    dispatcher.mint(recipient);
    stop_cheat_caller_address(contract_address);

    let erc721 = IERC721Dispatcher { contract_address };
    assert(erc721.owner_of(1) == recipient, 'Wrong owner');
    assert(erc721.balance_of(recipient) == 1, 'Wrong balance');
}

#[test]
#[should_panic(expected: ('Caller is not the owner',))]
fn test_mint_not_owner() {
    let (contract_address, dispatcher) = setup_dispatcher();
    let recipient = contract_address_const::<'RECIPIENT'>();

    start_cheat_caller_address(contract_address, caller());
    dispatcher.mint(recipient);
    stop_cheat_caller_address(contract_address);
}
