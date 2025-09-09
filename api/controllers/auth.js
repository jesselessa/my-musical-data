import { generateRandomString } from "../utils/generateRandomString.js";

export const login = (req, res) => {
  const state = generateRandomString(16);
  const scope = "user-read-private user-read-email";

  // Create new URLSearchParams object to build the chain of request
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.CLIENT_ID,
    scope: scope,
    redirect_uri: process.env.REDIRECT_URI || "http://127.0.0.1:8888/callback",
    state: state,
  });

  // Use params object directly in the redirection URL
  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
};

export const callback = async (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    return res.redirect(
      `${process.env.CLIENT_URL}/#${new URLSearchParams({
        error: "state_mismatch",
      }).toString()}`
    );
  }

  res.clearCookie(stateKey);

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    data: new URLSearchParams({
      code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "authorization_code",
    }).toString(),
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios(authOptions);
    const { access_token, refresh_token } = response.data;
    res.redirect(
      `${process.env.CLIENT_URL}/#${new URLSearchParams({
        access_token,
        refresh_token,
      }).toString()}`
    );
  } catch (error) {
    console.error(
      "Error exchanging code for token:",
      error.response?.data || error.message
    );
    res.redirect(
      `${process.env.CLIENT_URL}/#${new URLSearchParams({
        error: "invalid_token",
      }).toString()}`
    );
  }
};

export const refresh = async (req, res) => {
  const { refresh_token } = req.query;

  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    method: "POST",
    data: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }).toString(),
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const response = await axios(authOptions);
    const { access_token } = response.data;
    res.status(200).json({ access_token });
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response?.data || error.message
    );
    res.status(400).json({ error: "failed_to_refresh_token" });
  }
};
