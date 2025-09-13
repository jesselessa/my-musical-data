import express from "express";
import {
  getProfile,
  getFollowing,
  getTopArtists,
  getTopTracks,
  getRecentlyPlayed,
  getPlaylists,
  getArtist,
  getTrack,
} from "../controllers/spotify.js";
import { checkAuthHeader } from "../middlewares/auth.js";

const router = express.Router();

// User's data
router.get("/profile", checkAuthHeader, getProfile);
router.get("/top-artists", checkAuthHeader, getTopArtists);
router.get("/top-tracks", checkAuthHeader, getTopTracks);
router.get("/recently-played", checkAuthHeader, getRecentlyPlayed);
router.get("/playlists", checkAuthHeader, getPlaylists);

// Spotify catalog
router.get("/artist/:id", checkAuthHeader, getArtist);
router.get("/track/:id", checkAuthHeader, getTrack);

export default router;
