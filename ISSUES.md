# LyricsFlip Issue Backlog

This file tracks known issues, features, and improvements for the LyricsFlip project. Each entry has a unique `LF-NNN` identifier, an area tag, a priority, a task list, and acceptance criteria.

For the full list of all 125+ tracked issues, see the [GitHub Issues](https://github.com/Stellar-songifi/lyricsflip/issues) tab.

---

## Frontend

### LF-200 · Pre-check XLM balance and offer Friendbot on testnet

**Area:** Frontend · **Priority:** P2 · **Type:** Feature · **Effort:** S  
**Files:** `frontend/src/lib/stellar/hooks/useXlmBalance.ts`, `frontend/src/components/molecules/wallet-status-banner.tsx`

**Description**

New wallets that don't exist on-chain, or don't hold enough XLM for fees, fail with opaque simulation errors (`account not found`, `txInsufficientBalance`). This issue wires up a friendly UX path so a brand-new testnet player never has to leave the app.

**Tasks**

- [x] Detect an unfunded account (`useXlmBalance` → `isUnfunded`, Horizon 404) and show a `WalletStatusBanner` with a **Fund with Friendbot** button on testnet.
- [x] Detect low balance (`isBelowMinFee`) and show a banner with a top-up prompt / Friendbot button on testnet.
- [x] Before every mutating transaction, compare the balance with the minimum fee threshold and surface a friendly error (`assertSufficientBalance` in `toast.ts` → `withTxToast`).
- [x] Map known Horizon / Soroban RPC error strings (`account not found`, `txInsufficientBalance`, `source account not found`, etc.) in `parseContractError` via a new `parseHorizonRpcError` helper in `errors.ts`.
- [x] Expose `isBelowRequired(required: bigint)` on `useXlmBalance` for future wager pre-checks.
- [x] Render `WalletStatusBanner` in `app/layout.tsx` below the `Navbar` so it appears on every route.

**Acceptance criteria**

- A brand-new testnet wallet can go from connecting to playing without leaving the app:
  1. Connect an unfunded wallet → orange banner appears immediately with **Fund with Friendbot**.
  2. Click **Fund with Friendbot** → Friendbot is called, banner disappears once balance is confirmed.
  3. Any transaction attempted with a zero or insufficient balance shows a friendly toast error instead of an opaque SDK exception.
  4. The same banner also warns about wallet network mismatches (existing behaviour preserved).
- Mainnet / non-testnet wallets: Friendbot button is **not** shown; only the balance warning text appears.

**Related:** Closes [#686](https://github.com/Stellar-songifi/lyricsflip/issues/686)

---

## On-chain

### LF-176 · Removing or updating a card breaks rounds that use it

**Area:** On-chain · **Priority:** P1 · **Type:** Bug · **Effort:** M  
**Files:** `onchain/contracts/lyricsflip/src/lib.rs`, `onchain/contracts/lyricsflip/src/types.rs`, `onchain/contracts/lyricsflip/src/errors.rs`

**Description**

`remove_card` deleted the stored `Card` entry outright, so any active round that had already drawn that card panicked with `NonExistingCard` on `submit_answer`/`get_question`/`next_card`, locking players' wagers. `update_card` could silently change a card's `title`/`artist`/`year` while a round was using it, corrupting answer grading.

**Tasks**

- [x] Make `remove_card` a soft delete: keep the stored `Card` entry, drop it from every index, and set `DataKey::CardDisabled(card_id)` so `get_card` reports `NonExistingCard` and the card is never drawn again. Ids are not reused.
- [x] Split card reads: private `read_card` (raw, used by all in-round paths) vs public `get_card` (panics `NonExistingCard` once disabled).
- [x] Add a `DataKey::CardLiveRounds(card_id)` reverse index, maintained on `create_round_internal` and cleared on `finalize_round`/`cancel_round`.
- [x] Guard `update_card`: reject changes to `title`/`artist`/`year` with `Error::CardInActiveRound` (44) while any referencing round is still live (finalized/cancelled/completed rounds and rounds past their deadline are ignored, so an abandoned round can never permanently freeze a card).
- [x] Acceptance test: create a round, remove one of its cards mid-round, play the round to the end and finalize it.

**Acceptance criteria**

- A round that draws a card which is later removed still grades answers and finalizes without panicking; the player's wager is not locked.
- `get_card` on a removed card returns `NonExistingCard`; a removed card cannot be resurrected by `update_card`.
- `update_card` rejects answer-field changes while a live round references the card and allows them once the round is finalized.

**Related:** Closes [#662](https://github.com/Stellar-songifi/lyricsflip/issues/662)
