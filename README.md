# LyricFlip

LyricFlip is an on-chain card-based music guessing game built on the Starknet ecosystem. Players guess the title or artist of a song by viewing a snippet of the lyrics on a card. The card flips after 15 seconds unless the player guesses correctly, triggering instant feedback with confetti. The game incorporates NFT rewards, token wagering, and song categories based on genres and decades (e.g., 90s R&B).

## Features

- **Interactive Gameplay**: Guess the song title or artist based on lyrics displayed on a card.
- **On-Chain Integration**: Built on Starknet to leverage blockchain transparency and security.
- **NFT Rewards**: Earn NFTs for achieving milestones or winning games.
- **Token Wagering**: Players can bet tokens for higher stakes.
- **Song Categories**: Choose categories based on genres and decades.
- **Real-Time Feedback**: Instant response with animations (e.g., confetti) for correct guesses.

## Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React-based)
- **Styling**: Tailwind CSS or Chakra UI for responsive design and modern UI components

### Smart Contracts
- **Language**: [Cairo](https://www.cairo-lang.org/) for Starknet contract development
- **Features**: Contracts for gameplay mechanics, token wagering, and NFT minting

### Backend
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) for storing user data, game sessions, and song metadata

### Deployment
- **Frontend Hosting**: Vercel (preferred for Next.js apps)
- **Backend Hosting**: AWS, Heroku, or Render
- **Blockchain**: Starknet for smart contract deployment

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/lyricflip.git
   cd lyricflip
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   
3. **Backend Setup**:
   ```bash
   cd backend
   npm install
   node server.js
   ```

4. **Smart Contract Compilation**:
   ```bash
   cd contracts
   starknet-compile LyricFlip.cairo
   ```

5. **Environment Variables**:
   Create a `.env` file in both `frontend` and `backend` directories and add the following variables:
   - **Frontend**:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:5000
     ```
   - **Backend**:
     ```
     MONGO_URI=your-mongodb-connection-string
     STARKNET_NETWORK=alpha
     ```

## Project Structure

```plaintext
lyricflip/
├── contracts/          # Starknet Cairo contracts
├── frontend/           # Next.js application
├── backend/            # Express.js server
├── README.md           # Project documentation
└── .env                # Environment variables
```

## Gameplay Workflow

1. **Login**: Players connect their wallets to Starknet.
2. **Select Category**: Choose from genres or decades.
3. **Guess the Song**:
   - Lyrics snippet is displayed on a card.
   - Input field for guessing the title or artist.
   - Card flips instantly on correct guess; flips after 15 seconds otherwise.
4. **Rewards**:
   - Earn tokens or NFTs for correct answers.
   - Tokens can be wagered in subsequent games.

## Development Roadmap

1. **MVP Development**:
   - Basic card-flipping functionality
   - Lyrics display and input validation
   - Smart contract for token wagering

2. **Category Expansion**:
   - Add genre and decade filtering
   - Integrate dynamic song selection from the database

3. **NFT Integration**:
   - Mint NFTs for achievements
   - Display NFTs in player profiles

4. **Enhanced Gameplay**:
   - Real-time multiplayer mode
   - Leaderboards

5. **Launch**:
   - Deploy smart contracts on Starknet mainnet
   - Host frontend and backend services

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For inquiries, reach out to us on TG at https://t.me/lyricflip
