use soroban_sdk::contracterror;

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    AlreadyInitialized = 1,
    NonExistingRound = 2,
    NonExistingCard = 17,
    RoundAlreadyStarted = 3,
    NonExistingGenre = 4,
    RoundAlreadyJoined = 5,
    InvalidCardsPerRound = 6,
    ArtistCardsIsZero = 7,
    EmptyYearCards = 8,
    EmptyGenreCards = 9,
    RoundNotStarted = 10,
    RoundCompleted = 11,
    NotAParticipant = 12,
    AlreadyReady = 13,
    NotAuthorized = 14,
    AmountExceedsLimit = 15,
    LimitMustBeGreaterThanZero = 16,
}
