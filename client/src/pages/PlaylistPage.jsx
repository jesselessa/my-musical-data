import { useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getPlaylist } from "../api/spotify.js";
import { msToTime } from "../utils/utils.js";
import { Loader } from "../components/Loader.jsx";
import { PlaylistItems } from "../components/PlaylistItems.jsx";

export const PlaylistPage = () => {
  const { accessToken } = useContext(AuthContext);

  // Get ID from the URL segment
  const { id } = useParams();

  // Get playlist by ID
  const {
    data: playlistData,
    isPending: isPlaylistPending,
    isError: isPlaylistError,
  } = useQuery({
    queryKey: ["playlist", id], // Refetch every time the playlist ID changes
    queryFn: () => getPlaylist(accessToken, id),
    enabled: !!accessToken,
  });

  if (isPlaylistPending)
    return (
      <section className="h-full flex justify-center items-center">
        <Loader />
      </section>
    );

  if (isPlaylistError)
    return (
      <section className="h-full flex justify-center items-center">
        <p>Error loading playlist</p>
      </section>
    );

  const tracksNumber = `${playlistData?.tracks?.total} ${
    playlistData?.tracks?.total === 1 ? "TRACK" : "TRACKS"
  }`;
  // Total playlist duration : we add together every track duration in the playlist in order to obtain a single value
  const totalDurationMs = playlistData?.tracks?.items?.reduce(
    (acc, item) => acc + (item.track?.duration_ms || 0),
    0 // Initial value = 0
  );

  const formattedDuration = msToTime(totalDurationMs);

  return (
    <section className="h-full flex flex-col">
      <div className="flex-1 flex gap-10">
        {/* Cover pic and details */}
        <div className="w-2/5 flex flex-col items-center text-center px-5">
          {/* Cover pic */}
          <div className="size-[300px] mb-5">
            <img
              src={`${playlistData?.images?.[0]?.url}`}
              alt={`${playlistData?.name}`}
              className="size-full object-cover object-center"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col items-center">
            {/* Name */}
            <div className="text-2xl font-bold mb-1">{playlistData?.name}</div>
            {/* Owner */}
            <div className="text-xl text-[#b9b9b9] mb-2">
              By {playlistData?.owner.display_name}
            </div>
            {/* Description */}
            {playlistData?.description && (
              <div className="text-[#b9b9b9] mb-3">
                {playlistData.description}
              </div>
            )}
            {/* Tracks number and total duration */}
            <div className="text-sm">
              {tracksNumber} • {formattedDuration}
            </div>
            {/* Button Play */}
            <a
              href={`${playlistData?.external_urls?.spotify}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit text-center text-[#181818] font-semibold rounded-3xl bg-[#1ed760] py-2 px-6 hover:bg-green-500 active:bg-green-500 active:transform active:translate-y-[1px] mt-8"
            >
              OPEN IN SPOTIFY
            </a>
          </div>
        </div>

        <PlaylistItems playlist={playlistData} />
      </div>
    </section>
  );
};
