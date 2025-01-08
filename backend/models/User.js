const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: "https://example.com/default-avatar.png", // Default avatar URL
  },
  tokenBalance: {
    type: Number,
    default: 0,
  },
  nftCollection: [
    {
      nftId: { type: String, required: true },
      name: { type: String },
      description: { type: String },
      metadataUrl: { type: String },
    },
  ],
  gameStats: {
    gamesPlayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    gamesLost: { type: Number, default: 0 },
    highestStreak: { type: Number, default: 0 },
    gameScore: { type: Number, default: 0 }, // New field for cumulative score
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update the `updatedAt` field automatically
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
