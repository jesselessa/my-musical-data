import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { catalog } from "../api/spotify.js";
import { Track } from "./Track.jsx";
import { Loader } from "./Loader.jsx";

export const PopularTracks = ({
  trackData,
}) => {
  const { accessToken } = useContext(AuthContext);

  // Get artist's ID from track data
  const artistId = trackData?.artists?.[0]?.id;

  // Fetch popular artist's tracks
  const {
    data: popularTracksData,
    isPending: isPopularTracksPending,
    isError: isPopularTracksError,
    error: popularTracksError,
  } = useQuery({
    queryKey: ["popularTracks", artistId],
    queryFn: () => catalog.getArtistTopTracks(accessToken, artistId),
    enabled: !!artistId, // Fetch data only if artistId is available (popularTracksData only exists because of trackData)
  });

  if (isPopularTracksPending)
    return (
      <div className="h-full flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isPopularTracksError)
    return (
      <div>
        <p className="text-lg text-center">{popularTracksError.message}</p>
      </div>
    );

  if (!popularTracksData?.tracks || popularTracksData?.tracks?.length === 0)
    return (
      <div>
        <p className="text-lg text-center">No popular tracks found.</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-5">
      {popularTracksData?.tracks?.map((item) => (
        <Track coverSize="size-16" key={item?.id} track={item} />
      ))}
    </div>
  );
};
