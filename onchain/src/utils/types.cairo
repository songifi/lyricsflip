use starknet::ContractAddress;

#[derive(Drop, Serde, starknet::Store)]
pub struct Card {
    pub card_id: u64,
    pub genre: Genre,
    pub artist: ByteArray,
    pub title: ByteArray,
    pub year: u64,
    pub lyrics: ByteArray,
}

#[derive(Drop, Copy, Serde, PartialEq, starknet::Store)]
pub enum Genre {
    HipHop,
    Pop,
    Rock,
    RnB,
    Electronic,
    Classical,
    Jazz,
    Country,
    Blues,
    Reggae,
    Afrobeat,
    Gospel,
    Folk,
}

#[derive(Drop, Hash)]
pub struct Entropy {
    pub seed: u64,
    pub block_number: u64,
    pub timestamp: u64,
    pub index: u64
}

// TODO
// #[derive(Drop, Copy, Serde, starknet::Store)]
// pub enum Mode {
// }

#[derive(Drop, Copy, Serde, starknet::Store)]
pub struct Round {
    pub round_id: u64,
    pub admin: ContractAddress,
    pub genre: Genre,
    // pub category: Category,
    pub wager_amount: u256,
    pub start_time: u64,
    pub is_started: bool,
    pub is_completed: bool,
    pub end_time: u64,
    pub next_card_index: u8,
}
