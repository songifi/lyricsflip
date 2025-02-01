use starknet::ContractAddress;

#[derive(Drop, Serde, starknet::Store)]
pub struct Card {
    pub card_id: u64,
    pub genre: Genre,
    pub artist: felt252, // TODO: review datatype in order to use ByteArray as key in map
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
    pub index: u64,
}

impl GenreIntoFelt252 of Into<Genre, felt252> {
    fn into(self: Genre) -> felt252 {
        match self {
            Genre::HipHop => 'HipHop',
            Genre::Pop => 'Pop',
            Genre::Rock => 'Rock',
            Genre::RnB => 'RnB',
            Genre::Electronic => 'Electronic',
            Genre::Classical => 'Classical',
            Genre::Jazz => 'Jazz',
            Genre::Country => 'Country',
            Genre::Reggae => 'Reggae',
            Genre::Blues => 'Blues',
            Genre::Afrobeat => 'Afrobeat',
            Genre::Gospel => 'Gospel',
            Genre::Folk => 'Folk',
        }
    }
}

impl Felt252TryIntoGenre of TryInto<felt252, Genre> {
    fn try_into(self: felt252) -> Option<Genre> {
        if self == 'HipHop' {
            Option::Some(Genre::HipHop)
        } else if self == 'Pop' {
            Option::Some(Genre::Pop)
        } else if self == 'Rock' {
            Option::Some(Genre::Rock)
        } else if self == 'RnB' {
            Option::Some(Genre::RnB)
        } else if self == 'Electronic' {
            Option::Some(Genre::Electronic)
        } else if self == 'Classical' {
            Option::Some(Genre::Classical)
        } else if self == 'Jazz' {
            Option::Some(Genre::Jazz)
        } else if self == 'Country' {
            Option::Some(Genre::Country)
        } else if self == 'Reggae' {
            Option::Some(Genre::Reggae)
        } else if self == 'Blues' {
            Option::Some(Genre::Blues)
        } else if self == 'Afrobeat' {
            Option::Some(Genre::Afrobeat)
        } else if self == 'Gospel' {
            Option::Some(Genre::Gospel)
        } else if self == 'Folk' {
            Option::Some(Genre::Folk)
        } else {
            Option::None
        }
    }
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
