import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Missing search query" });
  }

  try {
    const response = await axios.get("https://api.genius.com/search", {
      headers: {
        Authorization: `Bearer ${process.env.GENIUS_ACCESS_TOKEN}`,
      },
      params: { q: query },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching from Genius:", error.response?.data || error);
    res.status(500).json({ message: "Error fetching songs from Genius" });
  }
}
