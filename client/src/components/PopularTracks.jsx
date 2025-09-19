import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getArtistTopTracks } from "../api/spotify.js";
import { Track } from "./Track.jsx";
import { Loader } from "./Loader.jsx";

export const PopularTracks = ({
  items, // Track data
}) => {
  const { accessToken } = useContext(AuthContext);

  // Get artist's ID from track data
  const artistId = items?.artists?.[0]?.id;

  // Fetch popular artist's tracks
  const {
    data: popularTracksData,
    isPending: isPopularTracksPending,
    isError: isPopularTracksError,
  } = useQuery({
    queryKey: ["popularTracks", artistId],
    queryFn: () => getArtistTopTracks(accessToken, artistId),
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
      <div className="h-full">
        <p>Error while fetching data</p>
      </div>
    );

  if (!popularTracksData?.tracks || popularTracksData?.tracks?.length === 0)
    return <p className="text-gray-400">No popular tracks found.</p>;

  return (
    <div className="flex flex-col gap-5">
      {popularTracksData?.tracks?.map((item) => (
        <Track coverSize="size-16" key={item?.id} track={item} />
      ))}
    </div>
  );
};
