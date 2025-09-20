import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { user, mapPeriodToTimeRange } from "../api/spotify.js";
import { Track } from "./Track.jsx";
import { Loader } from "./Loader.jsx";

export const TracksList = ({
  period,
  listWrapperClass,
  itemComponentProps, // Receives the styles object from the parent (in this case, UserProfile or TopTracks)
  itemsLimit, // Set by ListComponent
}) => {
  const { accessToken } = useContext(AuthContext);

  // Get user's top top tracks depending on period
  const {
    data: tracksData,
    isPending: isTracksPending,
    isError: isTracksError,
    error: tracksError,
  } = useQuery({
    queryKey: ["tracks", period], // The query key includes the period to trigger a refetch when the period changes
    queryFn: () => user.getTopTracks(accessToken, mapPeriodToTimeRange(period)),
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
      <div>
        <p className="text-lg">{tracksError.message}</p>
      </div>
    );

  if (!tracksData?.items?.length)
    return (
      <div>
        <p className="text-lg">No tracks to display for this period.</p>
      </div>
    );

  // Limit the number of displayed tracks based on itemsLimit prop
  const itemsToDisplay = tracksData?.items?.slice(0, itemsLimit) || [];

  return (
    <div className={listWrapperClass}>
      {itemsToDisplay.map((track) => (
        <Track key={track.id} track={track} {...itemComponentProps} /> // Spread the styles object received from the parent
      ))}
    </div>
  );
};
