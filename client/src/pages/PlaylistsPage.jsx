import React from "react";
import { PlaylistsList } from "../components/PlaylistsList.jsx";

// Display current user's all playlists
export const PlaylistsPage = () => {
  return (
    <section className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-12">My Playlists</h2>
      <PlaylistsList />
    </section>
  );
};
