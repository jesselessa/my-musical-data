import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getRecentlyPlayed } from "../api/spotify.js";
import { Track } from "./Track.jsx";
import { msToTime } from "../utils/msToTime.js";
import { Loader } from "./Loader.jsx";

export const RecentTracks = () => {
  const { accessToken } = useContext(AuthContext);

  // Fetch recently played tracks
  const {
    data: recentData,
    isPending: isRecentPending,
    isError: isRecentError,
  } = useQuery({
    queryKey: ["recent", accessToken],
    queryFn: () => getRecentlyPlayed(accessToken),
    enabled: !!accessToken,
  });

  if (isRecentPending)
    return (
      <div className="flex-1 flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isRecentError)
    return (
      <div className="flex-1 flex justify-center items-center text-white">
        Error loading recent tracks.
      </div>
    );

  return (
    <div className="flex-1 flex flex-col">
      {recentData?.items?.length > 0 ? (
        <div className="space-y-4">
          {recentData.items.map((item) => (
            <Track key={item.played_at} track={item.track} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">You have no recently played tracks.</p>
      )}
    </div>
  );
};
