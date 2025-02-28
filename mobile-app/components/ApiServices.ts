import axios from "axios";

const API_BASE_URL = "https://your-backend-url.com/api"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to fetch lyrics based on difficulty
export const fetchLyrics = async (difficulty: string) => {
  try {
    const response = await api.get(`/lyrics?difficulty=${difficulty}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    throw error;
  }
};

// Function to fetch multiple-choice options for beginners
export const fetchMultipleChoiceOptions = async () => {
  try {
    const response = await api.get("/game/multiple-choice");
    return response.data;
  } catch (error) {
    console.error("Error fetching multiple-choice options:", error);
    throw error;
  }
};

export default api;
