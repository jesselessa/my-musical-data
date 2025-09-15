import { Playlists } from "../components/Playlists.jsx";

export const PlaylistsPage = () => {
  return (
    <section className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-12">Your Playlists</h2>
      <Playlists />
    </section>
  );
};
