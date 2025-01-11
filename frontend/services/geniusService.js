import axios from "axios";
import { load } from "cheerio";

class GeniusService {
  static instance = null;

  constructor() {
    this.cache = new Map();
  }

  static getInstance() {
    if (!GeniusService.instance) {
      GeniusService.instance = new GeniusService();
    }
    return GeniusService.instance;
  }

  async fetchSongs(query) {
    try {
      const response = await axios.get("/api/genius/songs", {
        params: { query },
      });
      return response.data.response.hits.map((hit) => hit.result);
    } catch (error) {
      console.error("Error fetching songs:", error);
      throw new Error("Failed to fetch songs from Genius API");
    }
  }

  async fetchLyrics(songUrl) {
    try {
      const response = await axios.get("/api/genius/lyrics", {
        params: { songUrl },
      });

      const rawLyrics = response.data.lyrics;
      const cleanedLyrics = rawLyrics.replace(/<[^>]*>/g, ""); // Strip HTML tags
      return cleanedLyrics;
    } catch (error) {
      console.error("Error fetching lyrics:", error);
      throw new Error("Failed to fetch lyrics");
    }
  }

  async getRandomLyricSnippets(query, count = 5) {
    try {
      const songs = await this.fetchSongs(query);
      const snippets = [];

      for (const song of songs.slice(0, count)) {
        if (this.cache.has(song.id)) {
          snippets.push(this.cache.get(song.id));
          continue;
        }

        const lyrics = await this.fetchLyrics(song.url);
        const snippet = {
          lyricsSnippet: this.extractSnippet(lyrics),
          songTitle: song.title,
          artist: song.primary_artist.name,
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
    // Split lyrics into sentences or phrases based on logical separators
    const lines = lyrics
      .split(/(?:[.!?]|\[.*?\])/)
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) return "Lyrics unavailable";

    const snippetLength = 1; // Number of phrases to include in the snippet
    const startIndex = Math.max(
      0,
      Math.floor(Math.random() * (lines.length - snippetLength + 1))
    ); // Random start index

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
