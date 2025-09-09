import axios from "axios";

// This function will use a token provided in the request header
const spotifyApi = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL || "https://api.spotify.com/v1",
});

export const getProfile = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }
    spotifyApi.defaults.headers.common["Authorization"] = authorization;
    const response = await spotifyApi.get("/me");
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching user's profile data:", error.message);
    next(error); // Propagate to global error handler middleware
  }
};

export const getArtist = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "Authorization header is missing" });
    }
    spotifyApi.defaults.headers.common["Authorization"] = authorization;
    const { id } = req.params;
    const response = await spotifyApi.get(`/artists/${id}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching artist:", error.message);
    next(error);
  }
};
