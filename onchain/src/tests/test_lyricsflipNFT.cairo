use core::array::ArrayTrait;
use core::byte_array::ByteArray;
use core::result::ResultTrait;
use core::traits::Into;
// use lyricsflip::contracts::lyricsflipNFT::LyricsFlipNFT;
use lyricsflip::contracts::lyricsflipNFT::{
    ILyricsFlipNFTDispatcher as NFTDispatcher, ILyricsFlipNFTDispatcherTrait as NFTDispatcherTrait,
    LyricsFlipNFT
};
use openzeppelin::token::erc721::interface::{IERC721Dispatcher, IERC721DispatcherTrait};
use openzeppelin_access::accesscontrol::interface::{
    IAccessControlDispatcher, IAccessControlDispatcherTrait
};
use snforge_std::{
    ContractClassTrait, DeclareResultTrait, EventSpyAssertionsTrait, declare, spy_events,
    start_cheat_caller_address, stop_cheat_caller_address,
};
use starknet::{ContractAddress, contract_address_const};

const MINTER_ROLE: felt252 = selector!("MINTER_ROLE");

// Account functions
fn owner() -> ContractAddress {
    contract_address_const::<'OWNER'>()
}

fn lyrics_flip() -> ContractAddress {
    contract_address_const::<'LYRICS_FLIP'>()
}

fn non_minter() -> ContractAddress {
    contract_address_const::<'NON_MINTER'>()
}

fn recipient() -> ContractAddress {
    contract_address_const::<'RECIPIENT'>()
}

fn zero_address_const() -> ContractAddress {
    '0x0'.try_into().unwrap()
}

fn deploy_lyrics_flip() -> ContractAddress {
    let lyrics_flip_contract = declare("LyricsFlip").unwrap().contract_class();
    let mut lyrics_flip_calldata = ArrayTrait::new();
    lyrics_flip_calldata.append(owner().into()); // Owner for LyricsFlip contract
    let (lyrics_flip_address, _) = lyrics_flip_contract.deploy(@lyrics_flip_calldata).unwrap();
    lyrics_flip_address
}

fn setup_nft_dispatcher(lyrics_flip_address: ContractAddress) -> (ContractAddress, NFTDispatcher) {
    let nft_contract = declare("LyricsFlipNFT").unwrap().contract_class();
    let mut nft_calldata: Array<felt252> = ArrayTrait::new();

    // Set owner and actual LyricsFlip contract address as minter
    nft_calldata.append(owner().into());
    nft_calldata.append(lyrics_flip_address.into());

    let name: ByteArray = "LyricNFT";
    let symbol: ByteArray = "LYFNFT";
    let base_uri: ByteArray = "baseuri";

    name.serialize(ref nft_calldata);
    symbol.serialize(ref nft_calldata);
    base_uri.serialize(ref nft_calldata);

    let (nft_address, _) = nft_contract.deploy(@nft_calldata).unwrap();

    (nft_address, NFTDispatcher { contract_address: nft_address })
}

#[test]
#[should_panic(expected: ('Result::unwrap failed.',))]
fn test_constructor_fails_with_zero_owner() {
    let contract = declare("LyricsFlipNFT").unwrap().contract_class();
    let mut calldata: Array<felt252> = ArrayTrait::new();

    // Set zero address as owner
    calldata.append(contract_address_const::<0>().into());
    calldata.append(lyrics_flip().into());

    let name: ByteArray = "TestNFT";
    let symbol: ByteArray = "LYNFT";
    let base_uri: ByteArray = "baseuri";

    name.serialize(ref calldata);
    symbol.serialize(ref calldata);
    base_uri.serialize(ref calldata);

    let (_, _) = contract.deploy(@calldata).unwrap();
}

#[test]
#[should_panic(expected: ('Result::unwrap failed.',))]
fn test_constructor_fails_with_zero_minter() {
    let contract = declare("LyricsFlipNFT").unwrap().contract_class();
    let mut calldata: Array<felt252> = ArrayTrait::new();

    // Set zero address as minter
    calldata.append(owner().into());
    calldata.append(contract_address_const::<0>().into());

    let name: ByteArray = "TestNFT";
    let symbol: ByteArray = "LYNFT";
    let base_uri: ByteArray = "baseuri";

    name.serialize(ref calldata);
    symbol.serialize(ref calldata);
    base_uri.serialize(ref calldata);

    let (_, _) = contract.deploy(@calldata).unwrap();
}

#[test]
#[should_panic(expected: ('Cannot mint to zero address',))]
fn test_mint_to_zero_address_should_fail() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(lyrics_flip_address);
    let zero_address: ContractAddress = contract_address_const::<0>();

    start_cheat_caller_address(nft_address, lyrics_flip_address);
    dispatcher.mint(zero_address);
    stop_cheat_caller_address(nft_address);
}

#[test]
#[should_panic(expected: ('Caller is missing role',))]
fn test_mint_by_owner_should_fail() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(lyrics_flip_address);

    // Try to mint as owner (should fail)
    start_cheat_caller_address(nft_address, owner());
    dispatcher.mint(recipient());
    stop_cheat_caller_address(nft_address);
}

#[test]
#[should_panic(expected: ('Caller is missing role',))]
fn test_mint_by_non_minter_should_fail() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(lyrics_flip_address);

    // Try to mint as random address (should fail)
    start_cheat_caller_address(nft_address, non_minter());
    dispatcher.mint(recipient());
    stop_cheat_caller_address(nft_address);
}

#[test]
fn test_successful_mint_by_lyrics_flip() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(lyrics_flip_address);

    // Mint using deployed LyricsFlip contract address
    start_cheat_caller_address(nft_address, lyrics_flip_address);
    dispatcher.mint(recipient());
    stop_cheat_caller_address(nft_address);

    let erc721 = IERC721Dispatcher { contract_address: nft_address };
    assert(erc721.owner_of(1) == recipient(), 'Wrong owner');
    assert(erc721.balance_of(recipient()) == 1, 'Wrong balance');
}

#[test]
fn test_mint_event_emission() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(lyrics_flip_address);

    // Start spying on events
    let mut spy = spy_events();

    // Mint token
    start_cheat_caller_address(nft_address, lyrics_flip_address);
    dispatcher.mint(recipient());
    stop_cheat_caller_address(nft_address);

    // Assert event was emitted with correct parameters and in the right order
    spy
        .assert_emitted(
            @array![
                (
                    nft_address,
                    LyricsFlipNFT::Event::NFTMinted(
                        LyricsFlipNFT::NFTMinted { token_id: 1, recipient: recipient(), },
                    ),
                ),
            ],
        );
}

#[test]
fn test_multiple_mint_events() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(lyrics_flip_address);
    let recipient2 = contract_address_const::<'RECIPIENT2'>();

    // Start spying on events
    let mut spy = spy_events();

    start_cheat_caller_address(nft_address, lyrics_flip_address);

    // Mint first token
    dispatcher.mint(recipient());

    // Mint second token
    dispatcher.mint(recipient2);
    stop_cheat_caller_address(nft_address);

    // Assert both events were emitted with correct parameters
    spy
        .assert_emitted(
            @array![
                (
                    nft_address,
                    LyricsFlipNFT::Event::NFTMinted(
                        LyricsFlipNFT::NFTMinted { token_id: 1, recipient: recipient(), },
                    ),
                ),
                (
                    nft_address,
                    LyricsFlipNFT::Event::NFTMinted(
                        LyricsFlipNFT::NFTMinted { token_id: 2, recipient: recipient2, },
                    ),
                ),
            ]
        );
}

#[test]
fn test_minter_role_assignment() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, _) = setup_nft_dispatcher(lyrics_flip_address);
    let access_control = IAccessControlDispatcher { contract_address: nft_address };

    // Verify LyricsFlip contract has minter role
    assert(
        access_control.has_role(MINTER_ROLE, lyrics_flip_address), 'LyricsFlip should be minter'
    );

    // Verify owner does not have minter role
    assert(!access_control.has_role(MINTER_ROLE, owner()), 'Owner should not be minter');

    // Verify random address does not have minter role
    assert(!access_control.has_role(MINTER_ROLE, non_minter()), 'Non-minter should not have role');
}

#[test]
fn test_sequential_minting() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(lyrics_flip_address);
    let erc721 = IERC721Dispatcher { contract_address: nft_address };

    start_cheat_caller_address(nft_address, lyrics_flip_address);

    // Mint first token
    dispatcher.mint(recipient());
    assert(erc721.owner_of(1) == recipient(), 'Wrong owner of first token');

    // Mint second token
    dispatcher.mint(recipient());
    assert(erc721.owner_of(2) == recipient(), 'Wrong owner of second token');

    // Confirm correct recipient balance
    assert(erc721.balance_of(recipient()) == 2, 'Wrong final balance');

    stop_cheat_caller_address(nft_address);
}

#[test]
fn test_mint_to_different_recipients() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(lyrics_flip_address);
    let erc721 = IERC721Dispatcher { contract_address: nft_address };
    let recipient2 = contract_address_const::<'RECIPIENT2'>();

    start_cheat_caller_address(nft_address, lyrics_flip_address);

    // Mint to first recipient and check balance
    dispatcher.mint(recipient());
    assert(erc721.owner_of(1) == recipient(), 'Wrong owner of first token');
    assert(erc721.balance_of(recipient()) == 1, 'Wrong balance for recipient1');

    // Mint to second recipient and check balance
    dispatcher.mint(recipient2);
    assert(erc721.owner_of(2) == recipient2, 'Wrong owner of second token');
    assert(erc721.balance_of(recipient2) == 1, 'Wrong balance for recipient2');

    stop_cheat_caller_address(nft_address);
}

#[test]
#[should_panic(expected: ('Caller is missing role',))]
fn test_mint_by_new_lyrics_flip_contract_should_fail() {
    // Deploy first LyricsFlip contract
    let first_lyrics_flip = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(first_lyrics_flip);

    // Deploy second LyricsFlip contract
    let second_lyrics_flip = deploy_lyrics_flip();

    // Mint using the second LyricsFlip contract (should fail)
    start_cheat_caller_address(nft_address, second_lyrics_flip);
    dispatcher.mint(recipient());
    stop_cheat_caller_address(nft_address);
}

#[test]
fn test_mint_after_transfer() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(lyrics_flip_address);
    let erc721 = IERC721Dispatcher { contract_address: nft_address };
    let new_owner = contract_address_const::<'NEWOWNER'>();
    // Mint token
    start_cheat_caller_address(nft_address, lyrics_flip_address);
    dispatcher.mint(recipient());
    stop_cheat_caller_address(nft_address);

    // Transfer token
    start_cheat_caller_address(nft_address, recipient());
    erc721.transfer_from(recipient(), new_owner, 1);
    stop_cheat_caller_address(nft_address);

    // Verify transfer
    assert(erc721.owner_of(1) == new_owner, 'Wrong owner after transfer');
    assert(erc721.balance_of(new_owner) == 1, 'Wrong balance after transfer');
    assert(erc721.balance_of(recipient()) == 0, 'Old owner should have 0');

    // Verify can still mint after transfer
    start_cheat_caller_address(nft_address, lyrics_flip_address);
    dispatcher.mint(recipient());
    stop_cheat_caller_address(nft_address);

    assert(erc721.owner_of(2) == recipient(), 'Wrong owner of new token');
}

#[test]
fn test_concurrent_minting() {
    let lyrics_flip_address = deploy_lyrics_flip();
    let (nft_address, dispatcher) = setup_nft_dispatcher(lyrics_flip_address);
    let erc721 = IERC721Dispatcher { contract_address: nft_address };

    // Simulate concurrent minting by rapidly minting multiple tokens
    start_cheat_caller_address(nft_address, lyrics_flip_address);

    let mut recipients = array![
        contract_address_const::<'RECIPIENT3'>(),
        contract_address_const::<'RECIPIENT4'>(),
        contract_address_const::<'RECIPIENT5'>(),
        contract_address_const::<'RECIPIENT6'>(),
        contract_address_const::<'RECIPIENT7'>(),
        contract_address_const::<'RECIPIENT8'>(),
        contract_address_const::<'RECIPIENT9'>(),
        contract_address_const::<'RECIPIENT10'>()
    ];

    // Mint tokens to different recipients rapidly
    let mut i: u32 = 0;
    loop {
        if i >= recipients.len() {
            break;
        }
        dispatcher.mint(*recipients.at(i.into()));
        i += 1;
    };

    stop_cheat_caller_address(nft_address);

    // Verify all tokens were minted correctly and sequentially
    let mut j: u32 = 0;
    loop {
        if j >= recipients.len() {
            break;
        }
        let token_id = j + 1;
        let recipient = *recipients.at(j.into());
        assert(erc721.owner_of(token_id.into()) == recipient, 'Wrong token owner');
        assert(erc721.balance_of(recipient) == 1, 'Wrong recipient balance');
        j += 1;
    };
}
