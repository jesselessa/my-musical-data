import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  // Initial authentication - Retrieve token from URL (Spotify redirect)
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const tokenFromUrl = params.get("access_token");

    if (tokenFromUrl) {
      // Store the token in localStorage and set state
      localStorage.setItem("access_token", tokenFromUrl);
      setAccessToken(tokenFromUrl);

      // Clear URL to remove the token hash
      window.history.replaceState({}, document.title, window.location.pathname);

      // Redirect to /profile page
      navigate("/profile");
    } else {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        setAccessToken(storedToken);
      } else {
        setLoading(false);
        setError("You need to log in to get started.");
      }
    }
  }, []);

  // Fetch user's profile when accessToken is available
  useEffect(() => {
    if (accessToken) fetchUserProfile(accessToken);
  }, [accessToken]);

  const fetchUserProfile = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/api/spotify/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProfile(response.data);
      console.log("User data:", response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user's profile:", err);
      setError("Failed to fetch user's profile. Please try connecting later.");
      localStorage.removeItem("access_token");
      setAccessToken(null);
      setLoading(false);
      navigate("/"); // Redirect to Login page
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("access_token");
    setAccessToken(null);
    setUserProfile(null);
    navigate("/");
  };

  // Values accessibles via context
  const values = {
    userProfile,
    accessToken,
    loading,
    logout,
    error,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
