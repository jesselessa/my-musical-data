import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { user } from "../api/spotify.js";
import { Track } from "./Track.jsx";
import { msToTime } from "../utils/utils.js";
import { Loader } from "./Loader.jsx";

export const RecentTracks = () => {
  const { accessToken } = useContext(AuthContext);

  // Fetch user's recently played tracks
  const {
    data: recentData,
    isPending: isRecentPending,
    isError: isRecentError,
    error: recentError,
  } = useQuery({
    queryKey: ["recent", accessToken],
    queryFn: () => user.getRecentlyPlayed(accessToken),
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
      <div>
        <p className="text-lg">{recentError.message}</p>
      </div>
    );

  if (!recentData?.items?.length || !recentData?.items?.length === 0)
    return (
      <div>
        <p className="text-lg">You have played no tracks recently.</p>
      </div>
    );

  return (
    <div className="flex-1 flex flex-col gap-4">
      {recentData.items.map((item) => (
        <Track
          //! Unique key is not ID because we can have many times the same track in our history
          key={item.played_at}
          track={item.track}
          coverSize="size-16"
        />
      ))}
    </div>
  );
};
