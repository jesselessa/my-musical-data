import axios from "axios";

const spotifyApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/spotify`,
});

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
