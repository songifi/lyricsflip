use soroban_sdk::contracterror;

/// Contract error codes. Clients (see `frontend/src/lib/stellar/errors.ts`)
/// map on the numeric values, so they are part of the public ABI: never
/// renumber or reuse a code. New variants take the next free number, and the
/// table in `onchain/README.md` plus `test::error_codes_are_stable` must be
/// updated alongside.
#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    /// Defensive only: `__constructor` runs exactly once per deployment, so
    /// this is unreachable in practice.
    AlreadyInitialized = 1,
    NonExistingRound = 2,
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
    NonExistingCard = 17,
    RoundNotReady = 18,
    RoundAlreadyFinalized = 19,
    /// Round was cancelled and cannot accept further actions.
    RoundCancelled = 20,
    NotEnoughDistinctCards = 21,
    RoundFull = 22,
    InvalidMaxPlayers = 23,
    NftContractNotSet = 24,
    MilestoneNotReached = 25,
    MilestoneAlreadyClaimed = 26,
    InvalidCardTitle = 27,
    InvalidCardArtist = 28,
    InvalidCardLyrics = 29,
    InvalidCardYear = 30,
    LyricsTooLong = 31,
    DuplicateCard = 32,
    BatchTooLarge = 33,
    NotPendingOwner = 34,
    /// All cards in the round have been drawn; call `finalize_round` to
    /// complete the round. Replaces `RoundCompleted` in `next_card` so that
    /// the two states — deck exhausted vs round finalized — are distinct.
    NoMoreCards = 35,
    /// The calling player has already submitted an answer for this card in
    /// this round. A player may answer each card at most once. Prevents
    /// answer-farming and streak manipulation (LF-004).
    AlreadyAnswered = 36,
    /// No active card is being played in this round.
    NoActiveCard = 37,
}
