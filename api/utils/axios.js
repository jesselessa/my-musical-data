import axios from "axios";
import { getAccessToken } from "./getAccessToken.js";

// Create an Axios instance
export const makeRequest = axios.create({
  baseURL: process.env.SPOTIFY_BASE_URL || "https://api.spotify.com/v1",
});

//! Bearer Auth = we use access token in Spotify requests

// Interceptor: inject access token automatically
makeRequest.interceptors.request.use(async (config) => {
  const token = await getAccessToken(); // Get cached or new token
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
