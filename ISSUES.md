# LyricsFlip Issue Backlog

This file tracks known issues, features, and improvements for the LyricsFlip project. Each entry has a unique `LF-NNN` identifier, an area tag, a priority, a task list, and acceptance criteria.

For the full list of all 125+ tracked issues, see the [GitHub Issues](https://github.com/Stellar-songifi/lyricsflip/issues) tab.

---

## Frontend

### LF-196 · Make `useRoundEvents` reliable

**Area:** Frontend · **Priority:** P2 · **Type:** Bug · **Effort:** S  
**Files:** `frontend/src/hooks/use-round-events.ts`

**Description**

`useRoundEvents` looks back only one day (17,280 ledgers), so lobbies older than that show no players. It also:
- builds state only from events, never from `get_round_players`
- keeps polling every 4 s after an error, with no backoff
- ignores `RoundLeft` and `RoundCancelled`, so players who left stay listed.

**Tasks**

- [x] Seed state from `getRoundPlayers` and `getRound`, then apply events on top.
- [x] Handle `RoundLeft` and `RoundCancelled`.
- [x] Back off exponentially on errors, and stop polling once the round is started or cancelled. Hand over to LF-195 for in-game events.
- [x] Unit-test the hook with a mocked `rpc.Server`.

**Acceptance criteria**

- [x] A lobby created more than a day ago shows the correct players.
- [x] A player who leaves disappears from the list.

**Related:** Closes [#682](https://github.com/Stellar-songifi/lyricsflip/issues/682)

---

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
