import axios from "axios";

// Create and configure an Axios instance for the Spotify API
export const spotifyApi = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL,
});

export const fetchFromSpotify = async (endpoint, req, res, next, params = {}) => {
  try {
    const response = await spotifyApi.get(endpoint, {
      headers: { Authorization: req.token },
      params,
    });
    res.json(response.data);
  } catch (error) {
    next(error);
  }
};