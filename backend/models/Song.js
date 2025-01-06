const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Song title is required'],
    trim: true,
  },
  artist: {
    type: String,
    required: [true, 'Artist name is required'],
    trim: true,
  },
  album: {
    type: String,
    trim: true,
    default: 'Single', // Defaults to "Single" if no album is specified
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    enum: [
      'Pop',
      'Rock',
      'Hip-Hop',
      'R&B',
      'Jazz',
      'Classical',
      'Country',
      'Reggae',
      'Electronic',
      'Others',
    ],
  },
  decade: {
    type: String,
    enum: ['1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
    required: [true, 'Decade is required'],
  },
  lyricsSnippet: {
    type: String,
    required: [true, 'Lyrics snippet is required'],
    trim: true,
  },
  fullLyrics: {
    type: String,
    trim: true,
  },
  releaseYear: {
    type: Number,
    min: [1900, 'Release year must be after 1900'],
    max: [new Date().getFullYear(), 'Release year cannot be in the future'],
  },
  difficultyLevel: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'], // Optional field for game difficulty level
    default: 'Medium',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to a User model for tracking who added the song
    required: true,
  },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
