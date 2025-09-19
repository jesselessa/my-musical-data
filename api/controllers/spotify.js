import { fetchFromSpotify } from "../utils/spotify.js";

/*
 * === Current User's Data ===
 * These endpoints fetch data related to the currently authenticated user
 * They support optional query parameters, such as 'limit', 'offset' or 'time_range', for example
 */

// Get profile data (uses 'user-read-private' and 'user-read-email' scope)
export const getProfile = (req, res, next) => {
  fetchFromSpotify("/me", req, res, next);
};

// Get top artists based on calculated affinity ('user-top-read' scope)
export const getTopArtists = (req, res, next) => {
  const { time_range } = req.query;
  fetchFromSpotify("/me/top/artists", req, res, next, { time_range });
};

// Get top tracks based on calculated affinity ('user-top-read')
export const getTopTracks = (req, res, next) => {
  const { time_range } = req.query;
  fetchFromSpotify("/me/top/tracks", req, res, next, { time_range });
};

// Get recently played tracks ('user-read-recently-played')
export const getRecentlyPlayed = (req, res, next) => {
  fetchFromSpotify("/me/player/recently-played", req, res, next);
};

// Get a list of the playlists owned or followed by the current user ('playlist-read-private')
export const getPlaylists = (req, res, next) => {
  fetchFromSpotify("/me/playlists", req, res, next);
};

// Get followed artists  ('user-follow-read')
export const getFollowing = (req, res, next) => {
  fetchFromSpotify("/me/following", req, res, next, { type: "artist" });
};

/*
 * === Catalog Endpoints ===
 * These endpoints fetch data from the Spotify catalog
 */

// Get an artist by their unique Spotify ID
export const getArtist = (req, res, next) => {
  const { id } = req.params;
  fetchFromSpotify(`/artists/${id}`, req, res, next);
};

// Get artist's popular tracks
export const getArtistTopTracks = (req, res, next) => {
  const { id } = req.params;
  fetchFromSpotify(`/artists/${id}/top-tracks`, req, res, next);
};

// Get a track by ID
export const getTrack = (req, res, next) => {
  const { id } = req.params;
  fetchFromSpotify(`/tracks/${id}`, req, res, next);
};

// Get a playlist by ID
export const getPlaylist = (req, res, next) => {
  const { id } = req.params;
  fetchFromSpotify(`/playlists/${id}`, req, res, next);
};

// Get playlist items
export const getPlaylistItems = (req, res, next) => {
  const { id } = req.params;
  fetchFromSpotify(`/playlists/${id}/tracks`, req, res, next);
};
