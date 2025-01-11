import axios from "axios";
import { load } from "cheerio";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { songUrl } = req.query;

  if (!songUrl) {
    return res.status(400).json({ message: "Missing song URL" });
  }

  try {
    // Fetch the Genius song page
    const { data } = await axios.get(songUrl);
    const $ = load(data);

    const lyrics =
      $('[data-lyrics-container="true"]').text().trim() ||
      $(".Lyrics__Container-sc-1ynbvzw-6").text().trim() ||
      $(".lyrics").text().trim();

    // Debug logging
    console.log("Raw HTML:", $.html());
    console.log("Extracted lyrics:", lyrics);

    if (!lyrics) {
      throw new Error("No lyrics found");
    }

    res.status(200).json({ lyrics });
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    res.status(500).json({ message: "Failed to fetch lyrics" });
  }
}
