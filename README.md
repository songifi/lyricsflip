# LyricFlip

LyricFlip is an on-chain card-based music guessing game built on the Starknet ecosystem. Players guess the title or artist of a song by viewing a snippet of the lyrics on a card. The card flips after 15 seconds unless the player guesses correctly, triggering instant feedback with confetti. The game incorporates NFT rewards, token wagering, and song categories based on genres and decades (e.g., 90s R&B).

## Features

- **Interactive Gameplay**: Guess the song title or artist based on lyrics displayed on a card.
- **On-Chain Integration**: Built on Starknet to leverage blockchain transparency and security.
- **NFT Rewards**: Earn NFTs for achieving milestones or winning games.
- **Token Wagering**: Players can bet tokens for higher stakes.
- **Song Categories**: Choose categories based on genres and decades.
- **Real-Time Feedback**: Instant response with animations (e.g., confetti) for correct guesses.

-Figma Design Link
-- https://www.figma.com/design/6phOWkHKQgLRhRwmBBQDXB/LyricsFlip?node-id=0-1&t=0U8SlbaJijr7XNeG-1

## Tech Stack

### Frontend
- Framework: [Next.js](https://nextjs.org/) (React-based)
- Styling: Tailwind CSS or Chakra UI for responsive design and modern UI components

### Smart Contracts
- Language: [Cairo](https://www.cairo-lang.org/) for Starknet contract development
- Features: Contracts for gameplay mechanics, token wagering, and NFT minting

### Backend
- Framework: [NestJS](https://nestjs.com/) for scalable and modular backend development
- Database: [PostgreSQL](https://www.postgresql.org/) for storing user data, game sessions, and song metadata
- ORM: [TypeORM](https://typeorm.io/) for managing database models and migrations

### Deployment
- Frontend Hosting**: Vercel (preferred for Next.js apps)
- Backend Hosting: AWS, Heroku, or Render
- Blockchain: Starknet for smart contract deployment

## Installation

1. Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/lyricflip.git
   cd lyricflip

