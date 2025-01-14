use lyricsflip::utils::types::{Genre, Round};
use starknet::ContractAddress;

#[starknet::interface]
pub trait ILyricsFlip<TContractState> {
    fn get_round(self: @TContractState, round_id: u64) -> Round;
    fn get_round_cards(self: @TContractState, round_id: u64) -> Span<u64>;
    fn get_round_players(self: @TContractState, round_id: u64) -> Span<ContractAddress>;
    fn get_players_round_count(self: @TContractState, round_id: u64) -> u256;
    fn is_round_player(
        self: @TContractState, round_id: u64, player_address: ContractAddress
    ) -> bool;

    fn create_round(ref self: TContractState, genre: Option<Genre>) -> u64;
    fn start_round(ref self: TContractState, round_id: u64);
    fn join_round(ref self: TContractState, round_id: u64);
}
