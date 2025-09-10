/*
 * === App Component ===
 * The main component that manages the application state and renders
 * the appropriate UI based on the authentication and data loading status.
 */

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Components
import { Header } from "./components/Header.jsx";
import { UserProfileCard } from "./components/UserProfileCard.jsx";

export const App = () => {
  // States
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Helper functions for interacting with localStorage
  const getStoredAccessToken = () => {
    return localStorage.getItem("access_token");
  };

  const setStoredAccessToken = (token) => {
    localStorage.setItem("access_token", token);
  };

  /*
   * UseEffect Hook 1 - Manages the initial authentication flow
   * It runs only once on component mount (because of the empty dependency array).
   * 1. It checks the URL hash for an access token (from a Spotify redirect).
   * 2. If a token is found, it stores it in localStorage and sets the state.
   * 3. It then cleans up the URL to remove the token hash.
   * 4. If no token is found in the URL, it checks localStorage for an existing token.
   * 5. If a stored token is found, it sets the state. Otherwise, it shows an error state.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const tokenFromUrl = params.get("access_token");

    if (tokenFromUrl) {
      setStoredAccessToken(tokenFromUrl);
      setAccessToken(tokenFromUrl);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      const storedToken = getStoredAccessToken();
      if (storedToken) {
        setAccessToken(storedToken);
      } else {
        setLoading(false);
        setError("My Spotify Data");
      }
    }
  }, []); // Only runs once on mount

  /*
   * UseEffect Hook 2 - Fetches user's profile when accessToken is available
   * It runs whenever the 'accessToken' state changes.
   * This separates the token retrieval logic from the data fetching logic.
   */
  useEffect(() => {
    if (accessToken) {
      fetchUserProfile(accessToken);
    }
  }, [accessToken]);

  /*
   * fetchUserProfile: Asynchronous function that calls the API endpoint for user profile data.
   * It uses the accessToken to authenticate the request with a 'Bearer' token.
   * - On success: It updates the userProfile state and sets loading to false.
   * - On failure: It logs the error, sets an error message, and removes the invalid token
   * from localStorage, prompting the user to log in again. */
  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/spotify/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(response.data);
      console.log("User data:", response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to fetch user's profile. Please try logging in later.");
      localStorage.removeItem("access_token");
      setLoading(false);
    }
  };

  /*
   * === Conditional Rendering ===
   * Based on the state, the component returns different UI.
   * 1. If 'loading' is true, it shows a loading message.
   * 2. If an 'error' message is set, it displays a login prompt with a button.
   * 3. Otherwise, it displays the main application with the header and user profile card.
   */
  if (loading)
    return (
      <div className="h-screen flex justify-center items-center bg-[#121212] text-[20px] text-[#acacac] p-5">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="h-screen flex flex-col justify-center items-center bg-[#121212] text-white text-center p-5 gap-2">
        <h1 className="text-3xl font-bold mb-10">{error}</h1>

        <p className="text-[20px] text-[#acacac] mb-10">
          Log in to your account to visualize your data
        </p>
        <a
          href={`${API_BASE_URL}/api/auth/login`}
          className="display:inline-block w-[220px] bg-[#1ed760] text-white font-bold tracking-[2px] rounded-full py-[15px] px-[20px] hover:bg-green-600 transition-colors"
        >
          LOG IN TO SPOTIFY
        </a>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <Header />
      {userProfile && <UserProfileCard userProfile={userProfile} />}
    </div>
  );
};
