import axios from "axios";

// Axios instance for Spotify API
const spotifyApi = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL,
});

/*
 * Here, we are actually referring to current user's data
 */

// Get profile data
export const getProfile = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(401).json({ error: "Authorization header is missing" });

    const response = await spotifyApi.get("/me", {
      headers: { Authorization: authorization },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching user's profile data:", error.message);
    next(error); // Propagation to global error handler middleware
  }
};

// Get top artists (based on calculated affinity)

// Get top tracks

// Get recently played tracks

// Get playlists (owned or followed by user)
