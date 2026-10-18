#!/usr/bin/env bash
# deploy.sh — build, deploy, and configure both LyricsFlip contracts on a
# target Stellar network, then write the contract IDs to
# frontend/.env.local.
#
# Usage:
#   ./scripts/deploy.sh [network]   (default: testnet)
#
# Prerequisites:
#   • Stellar CLI installed (https://developers.stellar.org/docs/tools/stellar-cli)
#   • A funded identity called "me" on the target network:
#       stellar keys generate --global me --network <network> --fund
#   • Rust toolchain with the wasm32v1-none target:
#       rustup target add wasm32v1-none
#
# After a successful run the following files are written / updated:
#   • frontend/.env.local   NEXT_PUBLIC_LYRICSFLIP_CONTRACT_ID and
#                           NEXT_PUBLIC_LYRICSFLIP_NFT_CONTRACT_ID

set -euo pipefail

NETWORK="${1:-testnet}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ONCHAIN_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
REPO_ROOT="$(cd "${ONCHAIN_DIR}/.." && pwd)"
FRONTEND_ENV="${REPO_ROOT}/frontend/.env.local"

IDENTITY="me"
CARDS_PER_ROUND=5

log() { echo "[deploy.sh] $*"; }

# ---------------------------------------------------------------------------
# 1. Build WASM
# ---------------------------------------------------------------------------
log "Building contracts for wasm32v1-none…"
(
  cd "${ONCHAIN_DIR}"
  cargo build --target wasm32v1-none --release 2>&1
)

LYRICSFLIP_WASM="${ONCHAIN_DIR}/target/wasm32v1-none/release/lyricsflip.wasm"
NFT_WASM="${ONCHAIN_DIR}/target/wasm32v1-none/release/lyricsflip_nft.wasm"

if [[ ! -f "${LYRICSFLIP_WASM}" ]]; then
  echo "ERROR: lyricsflip.wasm not found after build."; exit 1
fi
if [[ ! -f "${NFT_WASM}" ]]; then
  echo "ERROR: lyricsflip_nft.wasm not found after build."; exit 1
fi

OWNER_ADDRESS="$(stellar keys address "${IDENTITY}")"
log "Deploying as ${OWNER_ADDRESS} on ${NETWORK}…"

# ---------------------------------------------------------------------------
# 2. Deploy game contract
# ---------------------------------------------------------------------------
log "Deploying lyricsflip game contract…"
LYRICSFLIP_CONTRACT_ID="$(stellar contract deploy \
  --wasm "${LYRICSFLIP_WASM}" \
  --source "${IDENTITY}" \
  --network "${NETWORK}" \
  -- --owner "${OWNER_ADDRESS}")"

log "Game contract deployed: ${LYRICSFLIP_CONTRACT_ID}"

# ---------------------------------------------------------------------------
# 3. Deploy NFT contract  (minter = game contract)
# ---------------------------------------------------------------------------
log "Deploying lyricsflip-nft contract…"
NFT_CONTRACT_ID="$(stellar contract deploy \
  --wasm "${NFT_WASM}" \
  --source "${IDENTITY}" \
  --network "${NETWORK}" \
  -- \
  --owner "${OWNER_ADDRESS}" \
  --minter "${LYRICSFLIP_CONTRACT_ID}" \
  --token_name "LyricsFlip" \
  --token_symbol "LFLIP" \
  --base_uri "https://lyricsflip.xyz/nft/")"

log "NFT contract deployed: ${NFT_CONTRACT_ID}"

# ---------------------------------------------------------------------------
# 4. Configure the game contract
# ---------------------------------------------------------------------------
log "Setting cards_per_round to ${CARDS_PER_ROUND}…"
stellar contract invoke \
  --id "${LYRICSFLIP_CONTRACT_ID}" \
  --source "${IDENTITY}" \
  --network "${NETWORK}" \
  -- set_cards_per_round \
  --caller "${OWNER_ADDRESS}" \
  --value "${CARDS_PER_ROUND}"

# ---------------------------------------------------------------------------
# 5. Write .env.local
# ---------------------------------------------------------------------------
log "Writing contract IDs to ${FRONTEND_ENV}…"

# If .env.local does not exist, initialize from .env.example
if [[ ! -f "${FRONTEND_ENV}" && -f "${REPO_ROOT}/frontend/.env.example" ]]; then
  cp "${REPO_ROOT}/frontend/.env.example" "${FRONTEND_ENV}"
fi

# Preserve any existing variables that are NOT the two contract IDs.
KEEP_LINES=""
if [[ -f "${FRONTEND_ENV}" ]]; then
  KEEP_LINES="$(grep -v '^NEXT_PUBLIC_LYRICSFLIP_CONTRACT_ID' "${FRONTEND_ENV}" \
                | grep -v '^NEXT_PUBLIC_LYRICSFLIP_NFT_CONTRACT_ID' || true)"
fi

{
  if [[ -n "${KEEP_LINES}" ]]; then
    echo "${KEEP_LINES}"
  fi
  echo "NEXT_PUBLIC_LYRICSFLIP_CONTRACT_ID=${LYRICSFLIP_CONTRACT_ID}"
  echo "NEXT_PUBLIC_LYRICSFLIP_NFT_CONTRACT_ID=${NFT_CONTRACT_ID}"
} > "${FRONTEND_ENV}"

# Update deployment file defaults if present
DEPLOYMENT_FILE="${REPO_ROOT}/deployments/${NETWORK}.json"
if [[ -f "${DEPLOYMENT_FILE}" ]] && command -v jq &>/dev/null; then
  log "Updating ${DEPLOYMENT_FILE}…"
  jq --arg g "${LYRICSFLIP_CONTRACT_ID}" \
     --arg n "${NFT_CONTRACT_ID}" \
     --arg d "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
     '.lyricsflip = $g | .lyricsflipNft = $n | .deployedAt = $d' \
     "${DEPLOYMENT_FILE}" > "${DEPLOYMENT_FILE}.tmp" && mv "${DEPLOYMENT_FILE}.tmp" "${DEPLOYMENT_FILE}"
fi

log "Done!"
log "  Game contract : ${LYRICSFLIP_CONTRACT_ID}"
log "  NFT  contract : ${NFT_CONTRACT_ID}"
log ""
log "Run './scripts/seed-cards.sh ${NETWORK}' to populate the card catalogue."
log "Then start the frontend: cd ${REPO_ROOT}/frontend && npm run dev"
