/*
 * Our app uses 'Authorization Code Flow'(app acting in the name of the user) :
 * 1 - Redirection to Spotify login page
 * 2 - User gives its permission
 * 3 - Spotify sends back an authorization code to our server
 * 4 - Our server exchanges this code for an access token and a refresh token
 *
 */
//! Note: ≠ from 'Client Credentials Flow' which is a server-to-server flow where the application requests an access token using only its client_id and client_secret. It is used to access certain data without requiring user login

import axios from "axios";
import { generateRandomString } from "../utils/generateRandomString.js";

// Key for the cookie that stores the state value for security
const stateKey = "spotify_auth_state";
// Key for the secure cookie that stores the refresh token
const refreshKey = "spotify_refresh_token";

const SPOTIFY_AUTH_URL = process.env.SPOTIFY_AUTH_URL;
const SPOTIFY_TOKEN_API = process.env.SPOTIFY_TOKEN_API;

/*
 * === Base cookie options for security ===
 * httpOnly: prevents client-side scripts from accessing the cookie
 * sameSite: protects against cross-site request forgery (CSRF) attacks
 * secure: ensures the cookie is only sent over HTTPS in production
 */
const baseCookieOptions = {
  httpOnly: true,
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  secure: process.env.NODE_ENV === "production",
};

//* ==== SPOTIFY LOGIN ====
// Redirects the user to Spotify's authorization page

export const login = (req, res) => {
  const state = generateRandomString(16);
  // Authorization scope to request more user data and control
  const scope =
    "user-read-private user-read-email user-top-read user-read-recently-played user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private";

  // Set the state in a secure cookie to prevent CSRF attacks
  res.cookie(stateKey, state, baseCookieOptions);

  // Construct the authorization URL with all required parameters
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI,
    state: state,
  });

  //* Note: when our server responds with a redirection, the browser receives a "HTTP 302 Found" status code : the browser must make a new request to the provided URL immediately
  res.redirect(`${SPOTIFY_AUTH_URL}?${params.toString()}`);
};

//* ==== SPOTIFY CALLBACK ====
// Handles the callback from Spotify authorization service
// It validates the state and exchanges the authorization code for an access token and a refresh token

export const callback = async (req, res, next) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  // Check if the state is missing or mismatched to prevent CSRF
  if (state === null || state !== storedState) {
    // In case of security check failure, redirection to login page with an error message in the URL hash
    return res.redirect(
      `${process.env.CLIENT_URL}/#${new URLSearchParams({
        error: "state_mismatch",
      }).toString()}`
    );
  }
  // Clear the state cookie after successful verification
  res.clearCookie(stateKey, baseCookieOptions);

  try {
    // Exchange the authorization code for tokens
    const response = await axios.post(
      SPOTIFY_TOKEN_API,
      new URLSearchParams({
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      }).toString(),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token } = response.data;

    // Store the refresh token in a secure, httpOnly cookie for long-term use
    res.cookie(refreshKey, refresh_token, {
      ...baseCookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // In case of success, redirection to profile page with the access token in the URL hash
    res.redirect(
      `${process.env.CLIENT_URL}/profile/#${new URLSearchParams({
        access_token,
      }).toString()}`
    );
  } catch (error) {
    // Error passed to the global error handler
    next(error);
  }
};

//* ==== SPOTIFY REFRESH TOKEN ====
// Refreshes the access token using the stored refresh token

export const refresh = async (req, res, next) => {
  // Retrieve the refresh token from the httpOnly cookie
  const refresh_token_cookie = req.cookies ? req.cookies[refreshKey] : null;

  // Return an error if the refresh token is not found
  if (!refresh_token_cookie) {
    // This is a specific logical error, handled directly
    return res.status(401).json({ error: "no_refresh_token_cookie" });
  }

  try {
    // Request a new access token using the refresh token
    const response = await axios.post(
      SPOTIFY_TOKEN_API,
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refresh_token_cookie,
      }).toString(),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token } = response.data;

    // Send the new access token to the client
    res.status(200).json({ access_token }); 
  } catch (error) {
    next(error);
  }
};
