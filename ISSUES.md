# LyricsFlip Issue Backlog

This file tracks known issues, features, and improvements for the LyricsFlip project. Each entry has a unique `LF-NNN` identifier, an area tag, a priority, a task list, and acceptance criteria.

For the full list of all 125+ tracked issues, see the [GitHub Issues](https://github.com/Stellar-songifi/lyricsflip/issues) tab.

---

## Frontend / Backend

### LF-197 · Three incompatible real-time protocols

**Area:** Frontend / Backend · **Priority:** P1 · **Type:** Bug · **Effort:** M  
**Files:** `frontend/src/hooks/use-multiplayer-room.ts`, `frontend/src/types/realtime.ts`, `backend/src/game/game.gateway.ts`, `backend/src/game/types/realtime.ts`, `docs/realtime-protocol.md`

**Description**

The frontend, backend, and documentation used incompatible event names and payload shapes. This change aligns all implementations to `docs/realtime-protocol.md` as the single source of truth.

**Tasks**

- [x] Treat `docs/realtime-protocol.md` as the source of truth for all real-time events.
- [x] Unify event definitions across frontend and backend in matching `realtime.ts` type modules.
- [x] Update `GameGateway` and `useMultiplayerRoom` hook to use spec names (`room:join`, `room:ready`, `answer:submitted`, `room:state`, `player:joined`, `player:left`, `player:ready`, `card:next`, `timer:tick`, `score:update`, `round:completed`) with backwards-compatible legacy aliases.
- [x] Add contract tests booting the gateway and driving it with client requests.

**Acceptance criteria**

- [x] The protocol has one definition, used by both sides, and the integration tests pass.

**Related:** Closes [#683](https://github.com/Stellar-songifi/lyricsflip/issues/683)

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
