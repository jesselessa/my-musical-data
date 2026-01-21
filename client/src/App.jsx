import React, { useContext } from "react";
import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Context
import { AuthContext } from "./contexts/AuthProvider.jsx";

// Pages and components
import { Login } from "./pages/Login.jsx";
import { Loader } from "./components/Loader.jsx";
import { Layout } from "./layouts/Layout.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { TopArtists } from "./pages/TopArtists.jsx";
import { ArtistPage } from "./pages/ArtistPage.jsx";
import { TrackPage } from "./pages/TrackPage.jsx";
import { TopTracks } from "./pages/TopTracks.jsx";
import { RecentPage } from "./pages/RecentPage.jsx";
import { PlaylistsPage } from "./pages/PlaylistsPage.jsx";
import { PlaylistPage } from "./pages/PlaylistPage.jsx";

// 1. Initialize QueryClient outside App to prevent cache resets on re-renders
const queryClient = new QueryClient();

// 2. Define Guard component outside to prevent unnecessary unmounting
const ProtectedLayout = ({ loading, accessToken }) => {
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!accessToken) return <Navigate to="/" replace />;

  // Wrap child routes with the common Layout and provide an Outlet for them to render
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export const App = () => {
  const { accessToken, loading } = useContext(AuthContext);

  return (
    // Provide QueryClient to the entire app
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected routes group using the Guard component */}
        <Route element={<ProtectedLayout loading={loading} accessToken={accessToken} />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/artists" element={<TopArtists />} />
          <Route path="/artists/:id" element={<ArtistPage />} />
          <Route path="/tracks" element={<TopTracks />} />
          <Route path="/tracks/:id" element={<TrackPage />} />
          <Route path="/recent" element={<RecentPage />} />
          <Route path="/playlists" element={<PlaylistsPage />} />
          <Route path="/playlists/:id" element={<PlaylistPage />} />
        </Route>

        {/* Fallback for unmatched routes */}
        <Route
          path="*"
          element={
            accessToken ? (
              <Navigate to="/profile" replace />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </QueryClientProvider>
  );
};
