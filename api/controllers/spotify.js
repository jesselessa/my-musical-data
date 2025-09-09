import axios from "axios";
import { makeRequest } from "../utils/axios.js";
import { getAccessToken } from "../utils/getAccessToken.js";

// Get token info
export const sendToken = async (req, res) => {
  try {
    // 1 - Basic authorization
    const token = await getAccessToken();

    // 2 - Return token
    res.json({
      access_token: token,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Spotify token" });
  }
};

// Get user's profile data
export const getProfile = async (req, res) => {
  try {
    // 1 - Call Spotify endpoint
    const userRes = makeRequest.get("/me");
    // 2 - Return data
    res.json(userRes.data); // Send data as JSON
  } catch (error) {
    console.error("Error fetching user's profile data:", error.message);
    res.status(500).json({ error: "Failed to fetch user's profile data" });
  }
};

// Get artist's data by ID
export const getArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artistRes = await makeRequest.get(`/artists/${id}`);
    res.json(artistRes.data);
  } catch (error) {
    console.error("Error fetching artist:", error.message);
    res.status(500).json({ error: "Failed to fetch artist data" });
  }
};
