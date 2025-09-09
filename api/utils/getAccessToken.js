import axios from "axios";
import "dotenv/config";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

let accessToken = null;
let tokenExpiresIn = 0;

//! Basic Auth = we ask for a token (with client_id:client_secret)

export const getAccessToken = async () => {
  // 1 - Check if existing token is still valid
  if (accessToken && Date.now() < tokenExpiresIn) {
    console.log("Using cached Spotify access token."); // Use cached token

    return accessToken;
  }

  // 2 - If token expired or non-existent, request a new one
  console.log("Requesting new Spotify access token...");

  try {
    const authString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
      "base64"
    );

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({ grant_type: "client_credentials" }), // Send grant_type in x-www-form-urlencoded format**
      {
        headers: {
          Authorization: `Basic ${authString}`, // Credentials encoded in Base64
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;
    // Cache token slightly less than its expiration to account for latency
    tokenExpiresIn = Date.now() + (response.data.expires_in - 5) * 1000;

    return accessToken; // Return valid token
  } catch (error) {
    console.error("Error fetching Spotify token:", error.message);
    throw new Error("Failed to retrieve a valid Spotify token.");
  }
};
