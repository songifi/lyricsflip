use lyricsflip::utils::types::{Card, Genre, Round};
use starknet::ContractAddress;

#[starknet::interface]
pub trait ILyricsFlip<TContractState> {
    fn get_round(self: @TContractState, round_id: u64) -> Round;
    fn get_round_cards(self: @TContractState, round_id: u64) -> Span<u64>;
    fn get_round_players(self: @TContractState, round_id: u64) -> Span<ContractAddress>;
    fn get_players_round_count(self: @TContractState, round_id: u64) -> u256;
    fn is_round_player(
        self: @TContractState, round_id: u64, player_address: ContractAddress,
    ) -> bool;

    fn create_round(ref self: TContractState, genre: Option<Genre>, seed: u64) -> u64;
    fn start_round(ref self: TContractState, round_id: u64);
    fn join_round(ref self: TContractState, round_id: u64);
    fn set_cards_per_round(ref self: TContractState, value: u8);
    fn get_cards_per_round(self: @TContractState) -> u8;
    fn add_card(ref self: TContractState, card: Card);
    fn get_card(self: @TContractState, card_id: u64) -> Card;
    fn get_cards_of_genre(self: @TContractState, genre: Genre, seed: u64) -> Span<Card>;
    // // TODO
    // fn next_card(ref self: TContractState, round_id: u64) -> Card;

    // // TODO
    // fn get_cards_of_genre(self: @TContractState, genre: Genre) -> Span<Card>;

    // TODO
    fn get_cards_of_artist(self: @TContractState, artist: felt252, seed: u64) -> Span<Card>;
    fn set_role(
        ref self: TContractState, recipient: ContractAddress, role: felt252, is_enable: bool
    );
    fn is_admin(self: @TContractState, role: felt252, address: ContractAddress) -> bool;
    // //TODO
    fn get_cards_of_a_year(self: @TContractState, year: u64, seed: u64) -> Span<Card>;
}
