import axios from "axios";

// Axios instance for Spotify API
const spotifyApi = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL,
});

/*
 * === Current User's Data ===
 * These endpoints fetch data related to the currently authenticated user.
 */

// Get profile data (uses 'user-read-private' and 'user-read-email' scope)
// The endpoint supports optional 'limit', 'offset', and 'time_range' query parameters.
export const getProfile = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const response = await spotifyApi.get("/me", {
      headers: { Authorization: authorization },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching user's profile data:", error.message);
    next(error); // Propagation to global error handler middleware
  }
};

// Get the user's top artists based on calculated affinity ('user-top-read' scope)

export const getTopArtists = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { limit, offset, time_range } = req.query;
    const response = await spotifyApi.get("/me/top/artists", {
      headers: { Authorization: authorization },
      params: { limit, offset, time_range },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching top artists:", error.message);
    next(error);
  }
};

// Get user's top tracks based on calculated affinity ('user-top-read')
export const getTopTracks = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { limit, offset, time_range } = req.query;
    const response = await spotifyApi.get("/me/top/tracks", {
      headers: { Authorization: authorization },
      params: { limit, offset, time_range },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching top tracks:", error.message);
    next(error);
  }
};

// Get the current user's recently played tracks ('user-read-recently-played')
export const getRecentlyPlayed = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { limit, after, before } = req.query;
    const response = await spotifyApi.get("/me/player/recently-played", {
      headers: { Authorization: authorization },
      params: { limit, after, before },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching recently played tracks:", error.message);
    next(error);
  }
};

// Get a list of the playlists owned or followed by the current user ('playlist-read-private')
export const getPlaylists = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { limit, offset } = req.query;
    const response = await spotifyApi.get("/me/playlists", {
      headers: { Authorization: authorization },
      params: { limit, offset },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching user's playlists:", error.message);
    next(error);
  }
};

/*
 * === Catalog Endpoints ===
 * These endpoints fetch data from the Spotify catalog.
 */

// Get an artist by their unique Spotify ID
export const getArtist = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
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

// Get a track by its unique Spotify ID
export const getTrack = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { id } = req.params;
    const response = await spotifyApi.get(`/tracks/${id}`, {
      headers: { Authorization: authorization },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching track:", error.message);
    next(error);
  }
};
