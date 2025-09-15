import axios from "axios";

export const spotifyApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/spotify`,
});

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
    // Utilisez la valeur timeRange directement
    params: { time_range: timeRange },
  });
  return data;
};

export const getTopArtists = async (token, timeRange) => {
  const { data } = await spotifyApi.get("/artists", {
    headers: { Authorization: `Bearer ${token}` },
    // Utilisez la valeur timeRange directement
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
