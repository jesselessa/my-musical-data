import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getTopTracks, mapPeriodToTimeRange } from "../api/spotify.js";
import { Track } from "./Track.jsx";
import { Loader } from "./Loader.jsx";

export const TracksList = ({
  period,
  listWrapperClass,
  itemComponentProps,
  itemsLimit,
}) => {
  const { accessToken } = useContext(AuthContext);

  const {
    data: tracksData,
    isPending: isTracksPending,
    isError: isTracksError,
  } = useQuery({
    queryKey: ["tracks", period], // The query key now includes the period to trigger a refetch when the period changes
    queryFn: () => getTopTracks(accessToken, mapPeriodToTimeRange(period)),
    enabled: !!accessToken,
  });

  if (isTracksPending)
    return (
      <div className="flex-1 flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isTracksError)
    return (
      <div className="flex-1 flex justify-center items-center">
        <p className="text-gray-400">Error loading tracks.</p>
      </div>
    );

  if (!tracksData?.items?.length)
    return (
      <div className="flex-1 flex justify-center items-center">
        <p className="text-gray-400">No tracks to display for this period.</p>
      </div>
    );

  // Limit the number of displayed tracks based on itemsLimit prop
  const itemsToDisplay = tracksData?.items?.slice(0, itemsLimit) || [];

  return (
    <div className={listWrapperClass}>
      {itemsToDisplay.map((track) => (
        <Track key={track.id} track={track} {...itemComponentProps} />
      ))}
    </div>
  );
};
