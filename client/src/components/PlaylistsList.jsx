import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "../api/spotify.js";
import { PlaylistCoverInfo } from "./PlaylistCoverInfo.jsx";
import { Loader } from "./Loader.jsx";

export const PlaylistsList = () => {
  const { accessToken } = useContext(AuthContext);

  const {
    data: playlistsData,
    isPending: isPlaylistsPending,
    isError: isPlaylistsError,
  } = useQuery({
    queryKey: ["playlists", accessToken],
    queryFn: () => getPlaylists(accessToken),
    enabled: !!accessToken,
  });

  // Handle loading, error, and empty states first
  if (isPlaylistsPending)
    return (
      <div className="flex-1 flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isPlaylistsError)
    return (
      <div className="flex-1 flex justify-center items-center">
        <p className="text-gray-400">Error loading playlists.</p>
      </div>
    );

  if (!playlistsData?.items?.length)
    return (
      <div className="flex-1 flex justify-center items-center">
        <p className="text-gray-400">You have no playlists.</p>
      </div>
    );

  return (
    <div className="flex-1 flex flex-wrap">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-5">
        {playlistsData.items.map((playlist) => (
          <PlaylistCoverInfo key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};
