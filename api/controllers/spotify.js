import axios from "axios";

// Axios instance for Spotify API
const spotifyApi = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL,
});

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

export const getArtist = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization)
      return res.status(401).json({ error: "Authorization header is missing" });

    const { id } = req.params;
    const response = await spotifyApi.get(`/artists/${id}`, {
      headers: { Authorization: authorization },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching artist:", error.message);
    next(error);
  }
};
