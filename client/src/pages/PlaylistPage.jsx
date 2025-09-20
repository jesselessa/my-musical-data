import { useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { catalog } from "../api/spotify.js";
import { msToTime } from "../utils/utils.js";
import { Loader } from "../components/Loader.jsx";
import { PlaylistItems } from "../components/PlaylistItems.jsx";
import defaultCover from "../assets/default-cover.jpg";

// Utilitary function to decode HTML entities : it creates a temporary element in which the encoded string is inserted, then, extracts the textContext from this element => no XSS vulnerabilities
const decodeHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
};

export const PlaylistPage = () => {
  const { accessToken } = useContext(AuthContext);

  // Get ID from the URL segment
  const { id } = useParams();

  // Get playlist by ID
  const {
    data: playlistData,
    isPending: isPlaylistPending,
    isError: isPlaylistError,
    error: playlistError,
  } = useQuery({
    queryKey: ["playlist", id], // Refetch every time the playlist ID changes
    queryFn: () => catalog.getPlaylist(accessToken, id),
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
      <section>
        <p className="text-lg">{playlistError.message}</p>
      </section>
    );

  const tracksNumber =
    playlistData?.tracks?.total === 0
      ? "NO TRACK"
      : `${playlistData?.tracks?.total} ${
          playlistData?.tracks?.total === 1 ? "TRACK" : "TRACKS"
        }`;

  // Total playlist duration : we add together every track duration in the playlist in order to obtain a single value
  const totalDurationMs = playlistData?.tracks?.items?.reduce(
    (accumulator, item) => accumulator + (item.track?.duration_ms || 0),
    0 // Initial value = 0
  );

  const formattedDuration = msToTime(totalDurationMs);

  return (
    <section className="h-full flex gap-10">
      {/* Cover pic and details */}
      <div className="w-2/5 flex flex-col">
        {/* Cover pic */}
        <div className="size-[300px] mb-5">
          <img
            src={playlistData?.images?.[0]?.url || defaultCover}
            alt={`${playlistData?.name}`}
            className="size-full object-cover object-center"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col mb-8">
          {/* Name */}
          <div className="text-3xl font-bold mb-1">{playlistData?.name}</div>
          {/* Owner */}
          <div className="text-xl text-[#b9b9b9] font-semibold mb-2">
            By {playlistData?.owner?.display_name}
          </div>
          {/* Description */}
          {playlistData?.description && (
            <div className="text-lg text-[#b9b9b9] mb-3">
              {decodeHtml(playlistData.description)}
            </div>
          )}
          {/* Tracks number and total duration */}
          <div className="text-sm">
            {tracksNumber} • {formattedDuration}
          </div>
        </div>

        {/* Button Play */}
        <a
          href={`${playlistData?.external_urls?.spotify}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-center text-[#181818] font-semibold rounded-3xl bg-[#1ed760] py-2 px-6 hover:bg-green-500 active:bg-green-500 active:transform active:translate-y-[1px]"
        >
          OPEN IN SPOTIFY
        </a>
      </div>

      <div className="w-3/5">
        {!playlistData?.tracks?.total ? (
          <div>
            <p className="text-center text-lg">Your playlist is empty</p>
          </div>
        ) : (
          <PlaylistItems playlist={playlistData} />
        )}
      </div>
    </section>
  );
};
