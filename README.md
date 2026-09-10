# LyricFlip

LyricFlip is an on-chain card-based music guessing game built on the Stellar ecosystem. Players guess the title or artist of a song by viewing a snippet of the lyrics on a card. The card flips after 15 seconds unless the player guesses correctly, triggering instant feedback with confetti. The game incorporates NFT rewards, token wagering, and song categories based on genres and decades (e.g., 90s R&B).

## Features

- **Interactive Gameplay**: Guess the song title or artist based on lyrics displayed on a card.
- **On-Chain Integration**: Built on Stellar (Soroban smart contracts) to leverage blockchain transparency and security.
- **NFT Rewards**: Earn NFTs for achieving milestones or winning games.
- **Token Wagering**: Players can bet tokens for higher stakes.
- **Song Categories**: Choose categories based on genres and decades.
- **Multiplayer Challenges**: Create or join wagered rounds with friends via shareable invite codes.
- **Leaderboards & Social**: Track player stats, streaks, and rankings.
- **Real-Time Feedback**: Instant response with animations (e.g., confetti) for correct guesses.

Figma Design Link: https://www.figma.com/design/6phOWkHKQgLRhRwmBBQDXB/LyricsFlip?node-id=0-1&t=0U8SlbaJijr7XNeG-1

## Project Structure

This is a monorepo with three main pieces:

```
lyricsflip/
├── frontend/   # Next.js web app
├── backend/    # NestJS API + WebSocket gateway
└── onchain/    # Rust/Soroban smart contracts (Stellar)
```

## Tech Stack

### Frontend

- Framework: [Next.js](https://nextjs.org/) 14 (React-based, App Router)
- Styling/UI: [Tailwind CSS](https://tailwindcss.com/) with [Radix UI](https://www.radix-ui.com/) primitives
- State: [Zustand](https://github.com/pmndrs/zustand)
- Real-time: [Socket.IO](https://socket.io/) client for live multiplayer updates
- Wallet: [Stellar Wallets Kit](https://github.com/Creit-Tech/Stellar-Wallets-Kit) (Freighter, xBull, Albedo, Lobstr, Hana) via [`@stellar/stellar-sdk`](https://github.com/stellar/js-stellar-sdk)

### Smart Contracts

- Language: [Rust](https://www.rust-lang.org/) using the [Soroban SDK](https://soroban.stellar.org/) for Stellar contract development
- Features: Contracts for gameplay mechanics, token wagering, and NFT minting
- See [`onchain/README.md`](onchain/README.md) for build, test, and deployment instructions

### Backend

- Framework: [NestJS](https://nestjs.com/) for scalable and modular backend development
- Database: [PostgreSQL](https://www.postgresql.org/) for storing user data, game sessions, and song metadata
- ORM: [TypeORM](https://typeorm.io/) for managing database models and migrations
- Real-time: [Socket.IO](https://socket.io/) gateway for live game state, chat, and notifications

### Deployment

- Frontend Hosting: Vercel (preferred for Next.js apps)
- Backend Hosting: AWS, Heroku, or Render
- Blockchain: Stellar (Soroban) for smart contract deployment

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Stellar-songifi/lyricsflip.git
   cd lyricsflip
   ```

2. **Frontend** (Next.js app, runs on `http://localhost:3000`):

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Configure Stellar network/contract settings via environment variables (see `frontend/src/lib/stellar/stellarConfig.ts`): `NEXT_PUBLIC_STELLAR_RPC_URL`, `NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE`, `NEXT_PUBLIC_LYRICSFLIP_CONTRACT_ID`, `NEXT_PUBLIC_LYRICSFLIP_NFT_CONTRACT_ID`.

3. **Backend** (NestJS API):

   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

   Copy `.env.development` (or create your own `.env`) with `DATABASE_URL`, `JWT_SECRET`, and `STELLAR_NETWORK` (`testnet`, `futurenet`, or `mainnet`) set.

4. **Smart contracts** (Rust/Soroban): see [`onchain/README.md`](onchain/README.md) for prerequisites, building, testing, and deploying the contracts to Stellar.

## 📌 Recent Update

As part of our transition to a multi-repo architecture, the **LyricsFlip Mobile App** is being migrated to its own dedicated repository. Once the migration is complete, you will be able to find it here: [LyricsFlip Mobile](https://github.com/songifi/lyricsflip_mobile).

This change will improve maintainability, streamline development, and isolate mobile-specific code.
