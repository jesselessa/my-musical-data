import { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router";

// Context
import { AuthContext } from "./contexts/AuthProvider.jsx";

// Pages and components
import { Login } from "./pages/Login.jsx";
import { Layout } from "./layouts/Layout.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { TopArtists } from "./pages/TopArtists.jsx";
import { Artist } from "./pages/Artist.jsx";
import { Track } from "./pages/Track.jsx";
import { TopTracks } from "./pages/TopTracks.jsx";
import { RecentPage } from "./pages/RecentPage.jsx";
import { PlaylistsPage } from "./pages/PlaylistsPage.jsx";

export const App = () => {
  const { accessToken, loading } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (loading) return <div className="text-white">Loading...</div>;
    if (!accessToken) return <Login />;
    return children;
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* All pages with common layout */}
      <Route element={<Layout />}>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artists"
          element={
            <ProtectedRoute>
              <TopArtists />
            </ProtectedRoute>
          }
        />
        <Route
          path="artists/:id"
          element={
            <ProtectedRoute>
              <Artist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tracks"
          element={
            <ProtectedRoute>
              <TopTracks />
            </ProtectedRoute>
          }
        />
        <Route
          path="tracks/:id"
          element={
            <ProtectedRoute>
              <Track />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recent"
          element={
            <ProtectedRoute>
              <RecentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playlists"
          element={
            <ProtectedRoute>
              <PlaylistsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
};
