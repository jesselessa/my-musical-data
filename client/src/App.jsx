import { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router";
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

export const App = () => {
  const { accessToken, loading } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    // Show loader if still loading
    if (loading)
      return (
        <div className="h-full flex justify-center items-center">
          <Loader />
        </div>
      );
    // If not authenticated, redirect to login
    if (!accessToken) return <Login />;
    // If authenticated, render the children components
    return children;
  };

  // Create a client
  const queryClient = new QueryClient();

  return (
    // Provide the client to our app
    <QueryClientProvider client={queryClient}>
      <Routes>
        {/* Login */}
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
                <ArtistPage />
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
                <TrackPage />
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
          <Route
            path="/playlists/:id"
            element={
              <ProtectedRoute>
                <PlaylistPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<UserProfile />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </QueryClientProvider>
  );
};
