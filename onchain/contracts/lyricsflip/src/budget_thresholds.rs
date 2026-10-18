//! Resource-budget ceilings for `test_budget`, measured with a 500-card
//! catalogue and 8 players (soroban-sdk 27 default budget). Each ceiling is
//! the measured value plus ~10% headroom; raise one only alongside a note in
//! the PR explaining the new cost.
//!
//! | Call                          | Measured CPU | Measured memory |
//! | ----------------------------- | ------------ | --------------- |
//! | `create_round`                | 20,003,252   | 6,763,970       |
//! | `start_round` (8th ready-up)  | 36,637,500   | 10,628,309      |
//! | `build_question_card` (Title) | 4,633,560    | 2,490,833       |

pub const CREATE_ROUND_MAX_CPU: u64 = 22_000_000;
pub const CREATE_ROUND_MAX_MEM: u64 = 7_450_000;

pub const START_ROUND_MAX_CPU: u64 = 40_300_000;
pub const START_ROUND_MAX_MEM: u64 = 11_700_000;

/// Covers every `QuestionKind`; Title is the most expensive.
pub const BUILD_QUESTION_CARD_MAX_CPU: u64 = 5_100_000;
pub const BUILD_QUESTION_CARD_MAX_MEM: u64 = 2_750_000;

// LF-163
pub const CREATE_SOLO_ROUND_MAX_CPU: u64 = 30_000_000;
pub const CREATE_SOLO_ROUND_MAX_MEM: u64 = 800_000;
