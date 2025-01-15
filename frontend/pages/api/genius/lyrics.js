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
    // Add these headers to make the request look like it's coming from a browser
    const headers = {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      Referer: "https://genius.com",
    };

    // Modify your axios call to include these headers
    const { data } = await axios.get(songUrl, {
      headers,
      maxRedirects: 5,
      timeout: 10000,
    });

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
    // Enhanced error logging
    console.error("Detailed error info:", {
      errorMessage: error.message,
      errorStack: error.stack,
      statusCode: error.response?.status,
      responseData: error.response?.data,
      url: songUrl,
    });

    res.status(500).json({ message: "Failed to fetch lyrics" });
  }
}
