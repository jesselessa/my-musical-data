//! Our app uses 'Authorization Code Flow'(app acting in the name of user) :
//! 1 - Redirection to Spotify login page
//! 2 - User gives its permission
//! 3 - Spotify sends back an authorization code to our server
//! 4 - Our server exchanges this code for an access token and a refresh token

//! ⚠️ ≠ 'Client Credentials Flow' is a server-to-server flow where the application requests an access token using only its client_id and client_secret. It is used to access certain data without requiring user login

import axios from "axios";
import { generateRandomString } from "../utils/generateRandomString.js";

// Key for the cookie that stores the state value for security
const stateKey = "spotify_auth_state";
// Key for the secure cookie that stores the refresh token
const refreshKey = "spotify_refresh_token";

/*
 * === Base cookie options for security ===
/ httpOnly: prevents client-side scripts from accessing the cookie
/ sameSite: protects against cross-site request forgery (CSRF) attacks
/ secure: ensures the cookie is only sent over HTTPS in production
 */
const baseCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

/*
 * Initiates the Spotify authentication flow ('Authorization Code Flow') by redirecting the user to the authorization URL
 */
export const login = (req, res) => {
  const state = generateRandomString(16);
  // Authorization scopes to request more user data and control
  const scope =
    "user-read-private user-read-email user-top-read user-read-recently-played user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private";

  // Sets the state in a secure cookie to prevent CSRF attacks
  res.cookie(stateKey, state, baseCookieOptions);

  // Constructs the authorization URL with all required parameters
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI, // Must target our backend server
    state: state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
};

/*
 * Handles the callback from Spotify authorization service.
 * It validates the state and exchanges the authorization code for an access token and a refresh token.
 */
export const callback = async (req, res, next) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  // Checks if the state is missing or mismatched to prevent CSRF
  if (state === null || state !== storedState)
    // Redirect here to profile page as it's a specific frontend-handled error
    return res.redirect(
      `${process.env.CLIENT_URL}/#${new URLSearchParams({
        error: "state_mismatch",
      }).toString()}`
    );

  // Clears the state cookie after successful verification
  res.clearCookie(stateKey, baseCookieOptions);

  try {
    // Exchanges the authorization code for tokens
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
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

    // Stores the refresh token in a secure, httpOnly cookie for long-term use
    res.cookie(refreshKey, refresh_token, {
      ...baseCookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Redirects the client, sending only the short-lived access token in the URL hash
    res.redirect(
      `${process.env.CLIENT_URL}/profile/#${new URLSearchParams({
        access_token,
      }).toString()}`
    );
  } catch (error) {
    // Instead of handling the error directly, pass it to the global error handler
    // This allows centralized logging and error management.
    next(error);
  }
};

/*
 * Refreshes the access token using the stored refresh token
 */
export const refresh = async (req, res, next) => {
  // Retrieves the refresh token from the httpOnly cookie
  const refresh_token = req.cookies ? req.cookies[refreshKey] : null;

  // Returns an error if the refresh token is not found
  if (!refresh_token) {
    // This is a specific logical error, handled directly
    return res.status(401).json({ error: "no_refresh_token" });
  }

  try {
    // Requests a new access token using the refresh token
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
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

    // Sends the new access token to the client
    res.status(200).json({ access_token });
  } catch (error) {
    // Instead of handling the error directly, pass it to the global error handler
    // This allows centralized logging and error management
    next(error);
  }
};
