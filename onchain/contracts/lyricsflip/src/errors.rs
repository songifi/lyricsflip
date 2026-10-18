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
    /// No round exists with the given id.
    NonExistingRound = 2,
    /// The round has already been started and can no longer be joined.
    RoundAlreadyStarted = 3,
    /// No genre exists with the given id.
    NonExistingGenre = 4,
    /// The calling player has already joined this round.
    RoundAlreadyJoined = 5,
    /// `cards_per_round` must be greater than zero.
    InvalidCardsPerRound = 6,
    /// A round must contain at least one artist card.
    ArtistCardsIsZero = 7,
    /// The year-cards pool for the round is empty.
    EmptyYearCards = 8,
    /// The genre-cards pool for the round is empty.
    EmptyGenreCards = 9,
    /// The round has not been started yet.
    RoundNotStarted = 10,
    /// The round has already been completed.
    RoundCompleted = 11,
    /// The caller is not a participant of this round.
    NotAParticipant = 12,
    /// The calling player has already marked themselves ready.
    AlreadyReady = 13,
    /// The caller is not authorized to perform this action.
    NotAuthorized = 14,
    /// The requested amount exceeds the configured limit.
    AmountExceedsLimit = 15,
    /// The limit must be greater than zero.
    LimitMustBeGreaterThanZero = 16,
    /// No card exists with the given id.
    NonExistingCard = 17,
    /// The round is not ready to be started or finalized yet.
    RoundNotReady = 18,
    /// The round has already been finalized.
    RoundAlreadyFinalized = 19,
    /// The round does not contain enough distinct cards to start.
    NotEnoughDistinctCards = 20,
    /// The round is full and cannot accept more players.
    RoundFull = 21,
    /// `max_players` is invalid (e.g. zero or below the current player count).
    InvalidMaxPlayers = 22,
    /// The NFT contract address has not been configured.
    NftContractNotSet = 23,
    /// The milestone has not been reached yet.
    MilestoneNotReached = 24,
    /// The milestone reward has already been claimed.
    MilestoneAlreadyClaimed = 25,
    /// The card title is invalid (empty or too long).
    InvalidCardTitle = 26,
    /// The card artist is invalid (empty or too long).
    InvalidCardArtist = 27,
    /// The card lyrics are invalid (empty or too long).
    InvalidCardLyrics = 28,
    /// The card year is invalid.
    InvalidCardYear = 29,
    /// The card lyrics exceed the maximum allowed length.
    LyricsTooLong = 30,
    /// A card with the same content already exists in the round.
    DuplicateCard = 31,
    /// The batch of cards exceeds the maximum allowed size.
    BatchTooLarge = 32,
    /// The caller is not the pending owner of the contract.
    NotPendingOwner = 33,
    /// All cards in the round have been drawn; call `finalize_round` to
    /// complete the round.
    NoMoreCards = 34,
    /// The calling player has already submitted an answer for this card in
    /// this round. A player may answer each card at most once.
    AlreadyAnswered = 39,
    NoActiveCard = 38,
    InvalidCardDifficulty = 36,
    InvalidDecade = 37,
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
    AlreadyAnswered = 35,
    NoActiveCard = 34,
    /// The contract is paused by the owner (LF-174). New rounds, joins and
    /// claims are blocked; refund and cancel paths stay open so funds can
    /// always leave the contract.
    Paused = 36,
    /// There is no active card to answer; call `next_card` first.
    NoActiveCard = 36,
    /// The round has been cancelled and no further actions are allowed.
    RoundCancelled = 37,
    AlreadyAnswered = 36,
    /// No active card is being played in this round.
    NoActiveCard = 37,
}
