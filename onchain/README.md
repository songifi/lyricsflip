# LyricsFlip on-chain contracts (Soroban)

Two Soroban smart contracts, ported from the project's earlier Cairo/Starknet
contracts:

- `contracts/lyricsflip` — game logic (rounds, cards, wagering scaffolding, answers)
- `contracts/lyricsflip-nft` — minter-gated NFT rewards

## Prerequisites

- Rust (version pinned in `../.tool-versions`)
- The `wasm32v1-none` target — **not** `wasm32-unknown-unknown`. Recent
  soroban-sdk releases require it on Rust 1.84+:

  ```bash
  rustup target add wasm32v1-none
  ```
- [Stellar CLI](https://developers.stellar.org/docs/tools/stellar-cli) (`stellar`) for deploying and invoking contracts, if you don't already have it.

## Build & test

```bash
cargo test                                    # unit tests, native target
cargo build --target wasm32v1-none --release  # produces deployable .wasm files
```

WASM output:

```
target/wasm32v1-none/release/lyricsflip.wasm
target/wasm32v1-none/release/lyricsflip_nft.wasm
```

## Deploying (testnet example)

```bash
stellar contract deploy \
  --wasm target/wasm32v1-none/release/lyricsflip.wasm \
  --source <YOUR_IDENTITY> \
  --network testnet \
  -- --owner <OWNER_ADDRESS>

stellar contract deploy \
  --wasm target/wasm32v1-none/release/lyricsflip_nft.wasm \
  --source <YOUR_IDENTITY> \
  --network testnet \
  -- --owner <OWNER_ADDRESS> --minter <LYRICSFLIP_CONTRACT_ID> \
     --token_name "LyricsFlip" --token_symbol "LFLIP" --base_uri "https://..."
```

Put the resulting contract IDs into the frontend's
`NEXT_PUBLIC_LYRICSFLIP_CONTRACT_ID` / `NEXT_PUBLIC_LYRICSFLIP_NFT_CONTRACT_ID`
environment variables (see `frontend/src/lib/stellar/stellarConfig.ts`).
