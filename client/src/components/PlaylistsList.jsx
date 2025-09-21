import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { user } from "../api/spotify.js";
import { PlaylistCoverInfo } from "./PlaylistCoverInfo.jsx";
import { Loader } from "./Loader.jsx";

export const PlaylistsList = () => {
  const { accessToken } = useContext(AuthContext);

  // Fetch user's playlists list
  const {
    data: playlistsData,
    isPending: isPlaylistsPending,
    isError: isPlaylistsError,
    error: playlistsError,
  } = useQuery({
    queryKey: ["playlists", accessToken],
    queryFn: () => user.getPlaylists(accessToken),
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
      <div>
        <p className="text-lg">{playlistsError.message}</p>
      </div>
    );

  if (!playlistsData?.items?.length || playlistsData?.items?.length === 0)
    return (
      <div>
        <p className="text-lg">You have no playlists.</p>
      </div>
    );

  return (
    <div className="flex-1 flex flex-wrap">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-5">
        {playlistsData.items.map((playlist) => (
          <PlaylistCoverInfo key={playlist?.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
};
