pub mod Errors {
    pub const NON_EXISTING_ROUND: felt252 = 'Round does not exists';
    pub const NOT_ROUND_ADMIN: felt252 = 'Only round admin can start';
    pub const ROUND_ALREADY_STARTED: felt252 = 'Round already started';
    pub const NON_EXISTING_GENRE: felt252 = 'Genre does not exists';
    pub const ROUND_ALREADY_JOINED: felt252 = 'You are already a player';
    pub const INVALID_CARDS_PER_ROUND: felt252 = 'Invalid cards per round';
    pub const ARTIST_CARDS_IS_ZERO: felt252 = 'Artist cards is zero';
    pub const EMPTY_YEAR_CARDS: felt252 = 'Year cards is zero';
}
