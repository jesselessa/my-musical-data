import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getPlaylists } from "../api/spotify.js";
import { Loader } from "./Loader.jsx";

export const Playlists = () => {
  const { accessToken } = useContext(AuthContext);

  // Fetch user's playlists
  const {
    data: playlistsData,
    isPending: isPlaylistsPending,
    isError: isPlaylistsError,
  } = useQuery({
    queryKey: ["playlists", accessToken],
    queryFn: () => getPlaylists(accessToken),
    enabled: !!accessToken,
  });

  return (
    <div className="flex-1 flex flex-wrap ">
      {isPlaylistsPending ? (
        <div className="flex justify-center items-center m-auto">
          <Loader />
        </div>
      ) : isPlaylistsError ? (
        <div className="m-auto">Error loading playlists.</div>
      ) : (
        <>
          {playlistsData?.items?.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {playlistsData.items.map((playlist) => (
                <li key={playlist.id}>
                  <img
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                    className="w-full h-auto rounded"
                  />
                  <h3 className="mt-2 text-white text-center font-semibold">
                    {playlist.name}
                  </h3>
                  <p className="text-sm text-[#b9b9b9] text-center">
                    {playlist.tracks.total}{" "}
                    {playlist.tracks.total === 1 ? "TRACK" : "TRACKS"}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">You have no playlists.</p>
          )}
        </>
      )}
    </div>
  );
};
