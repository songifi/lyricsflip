import songsData from "./songs-data.json";

class GeniusService {
  static instance = null;

  constructor() {
    this.cache = new Map();
    this.songs = songsData.songs;
  }

  static getInstance() {
    if (!GeniusService.instance) {
      GeniusService.instance = new GeniusService();
    }
    return GeniusService.instance;
  }

  async fetchSongs(query) {
    // Filter songs based on the query
    return this.songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase()) ||
        song.genre.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getRandomLyricSnippets(query, count) {
    try {
      const songs = await this.fetchSongs(query);
      const snippets = [];

      for (const song of songs.slice(0, count)) {
        if (this.cache.has(song.id)) {
          snippets.push(this.cache.get(song.id));
          continue;
        }

        const snippet = {
          lyricsSnippet: this.extractSnippet(song.lyrics),
          songTitle: song.title,
          artist: song.artist,
          genre: song.genre,
          difficulty: song.difficulty,
        };

        this.cache.set(song.id, snippet);
        snippets.push(snippet);
      }

      return this.shuffleArray(snippets);
    } catch (error) {
      console.error("Error getting lyric snippets:", error);
      throw new Error("Failed to get lyric snippets");
    }
  }

  extractSnippet(lyrics) {
    const lines = lyrics
      .split(/\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) return "Lyrics unavailable";

    const snippetLength = 1;
    const startIndex = Math.floor(
      Math.random() * (lines.length - snippetLength + 1)
    );

    let snippet = lines.slice(startIndex, startIndex + snippetLength).join(" ");

    const words = snippet.split(" ");
    if (words.length > 20) {
      snippet = words.slice(0, 20).join(" ") + "...";
    }

    return snippet;
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

export default GeniusService;
