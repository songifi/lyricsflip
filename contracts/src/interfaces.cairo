use lyricsflip::types::{Genre, Round};

#[starknet::interface]
pub trait ILyricsFlip<TContractState> {
    fn create_round(ref self: TContractState, genre: Option<Genre>) -> u64;
    fn start_round(ref self: TContractState, round_id: u64);
    fn join_round(ref self: TContractState, round_id: u64);

    fn get_round_cards(self: @TContractState, round_id: u64) -> Span<u64>;
    fn get_round(self: @TContractState, round_id: u64) -> Round;
}
