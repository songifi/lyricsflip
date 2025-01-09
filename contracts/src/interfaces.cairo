use lyricsflip::types::{Card, Genre, Round};

#[starknet::interface]
pub trait ILyricsFlip<TContractState> {
    fn start_round(ref self: TContractState, genre: Option<Genre>);
}
