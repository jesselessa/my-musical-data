import axios from "axios";

export const spotifyApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/spotify`,
});

// Generic function to handle GET requests with the token
const fetchData = async (token, url, params = {}) => {
  try {
    const { data } = await spotifyApi.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      params,
    });
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error; // Propagate error to the code which called the function
  }
};

// Periods mapping
export const PERIODS = {
  "Last 4 Weeks": "short_term",
  "Last 6 Months": "medium_term",
  "All Time": "long_term",
};

export const mapPeriodToTimeRange = (period) => {
  return PERIODS[period] || PERIODS["All Time"];
};

// Functions gathered by their object
export const user = {
  getTopTracks: (token, timeRange) =>
    fetchData(token, "/tracks", { time_range: timeRange }),
  getTopArtists: (token, timeRange) =>
    fetchData(token, "/artists", { time_range: timeRange }),
  getFollowing: (token) => fetchData(token, "/following"),
  getPlaylists: (token) => fetchData(token, "/playlists"),
  getRecentlyPlayed: (token) => fetchData(token, "/recent"),
};

export const catalog = {
  getArtist: (token, artistId) => fetchData(token, `/artists/${artistId}`),
  getArtistTopTracks: (token, artistId) =>
    fetchData(token, `/artists/${artistId}/top-tracks`),
  getTrack: (token, trackId) => fetchData(token, `/tracks/${trackId}`),
  getPlaylist: (token, playlistId) =>
    fetchData(token, `/playlists/${playlistId}`),
  getPlaylistItems: (token, playlistId) =>
    fetchData(token, `/playlists/${playlistId}/track`),
};
