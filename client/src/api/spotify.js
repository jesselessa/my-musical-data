import axios from "axios";

export const spotifyApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/spotify`,
});

//* 1 === User's habits ===

// Helper function to map the user-friendly period strings to Spotify's API time range values
export const mapPeriodToTimeRange = (period) => {
  switch (period) {
    case "Last 4 Weeks":
      return "short_term";
    case "Last 6 Months":
      return "medium_term";
    case "All Time":
      return "long_term";
    default:
      return "long_term";
  }
};

export const getTopTracks = async (token, timeRange) => {
  const { data } = await spotifyApi.get("/tracks", {
    headers: { Authorization: `Bearer ${token}` },
    params: { time_range: timeRange },
  });
  return data;
};

export const getTopArtists = async (token, timeRange) => {
  const { data } = await spotifyApi.get("/artists", {
    headers: { Authorization: `Bearer ${token}` },
    params: { time_range: timeRange },
  });
  return data;
};

export const getFollowing = async (token) => {
  const { data } = await spotifyApi.get("/following", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getPlaylists = async (token) => {
  const { data } = await spotifyApi.get("/playlists", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getRecentlyPlayed = async (token) => {
  const { data } = await spotifyApi.get("/recent", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

//*=== Spotify Catalog ===

export const getArtist = async (token, artistId) => {
  const { data } = await spotifyApi.get(`/artists/${artistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getArtistTopTracks = async (token, artistId) => {
  const { data } = await spotifyApi.get(`/artists/${artistId}/top-tracks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getTrack = async (token, trackId) => {
  const { data } = await spotifyApi.get(`/tracks/${trackId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getPlaylist = async (token, playlistId) => {
  const { data } = await spotifyApi.get(`/playlists/${playlistId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const getPlaylistItems = async (token, playlistId) => {
  const { data } = await spotifyApi.get(`/playlists/${playlistId}/track`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
