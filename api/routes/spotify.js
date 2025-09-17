import express from "express";
import {
  getProfile,
  getFollowing,
  getTopArtists,
  getTopTracks,
  getRecentlyPlayed,
  getPlaylists,
  getArtist,
  getArtistTopTracks,
  getTrack,
  getPlaylist,
} from "../controllers/spotify.js";
import { checkAuthHeader } from "../middlewares/auth.js";

const router = express.Router();

// User's data
router.get("/profile", checkAuthHeader, getProfile);
router.get("/following", checkAuthHeader, getFollowing);
router.get("/artists", checkAuthHeader, getTopArtists);
router.get("/tracks", checkAuthHeader, getTopTracks);
router.get("/recent", checkAuthHeader, getRecentlyPlayed);
router.get("/playlists", checkAuthHeader, getPlaylists);

// Spotify catalog
router.get("/artists/:id", checkAuthHeader, getArtist);
router.get("/artists/:id/top-tracks", checkAuthHeader, getArtistTopTracks);
router.get("/tracks/:id", checkAuthHeader, getTrack);
router.get("/playlists/:id", checkAuthHeader, getPlaylist);

export default router;
