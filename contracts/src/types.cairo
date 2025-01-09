use starknet::ContractAddress;

#[derive(Drop, Serde, starknet::Store)]
pub struct Card {
    pub cardId: u64,
    pub genre: felt252,
    pub artist: ByteArray,
    pub title: ByteArray,
    pub year: u8,
    pub lyrics: ByteArray,
}

#[derive(Drop, Copy, Serde, starknet::Store)]
pub enum Genre {
    HipHop,
    Pop,
    Rock,
}

// TODO
// #[derive(Drop, Copy, Serde, starknet::Store)]
// pub enum Mode {
// }

#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Round {
    pub round_id: u64,
    pub player: ContractAddress,
    pub wager_amount: u256,
    pub start_time: u64,
    pub is_active: bool,
    pub end_time: u64,
}

