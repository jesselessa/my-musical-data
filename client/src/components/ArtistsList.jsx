import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { user, mapPeriodToTimeRange } from "../api/spotify.js";
import { Artist } from "./Artist.jsx";
import { Loader } from "./Loader.jsx";

export const ArtistsList = ({
  period,
  listWrapperClass,
  itemComponentProps, // Receives the styles object from the parent (in this case, UserProfile or TopArtists)
  itemsLimit, // Set by ListComponent
}) => {
  const { accessToken } = useContext(AuthContext);

  // Get user's top artists depending on period
  const {
    data: artistsData,
    isPending: isArtistsPending,
    isError: isArtistsError,
    error: artistsError,
  } = useQuery({
    queryKey: ["artists", period], // Refetch everytime the period changes
    queryFn: () =>
      user.getTopArtists(accessToken, mapPeriodToTimeRange(period)),
    enabled: !!accessToken,
  });

  if (isArtistsPending)
    return (
      <div className="flex-1 flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isArtistsError)
    return (
      <div>
        <p className="text-lg">{artistsError.message}</p>
      </div>
    );

  if (!artistsData?.items?.length || artistsData?.items?.length === 0)
    return (
      <div>
        <p className="text-lg">No artists to display for this period.</p>
      </div>
    );

  // Limit the number of displayed artists based on the itemsLimit prop
  const itemsToDisplay = artistsData?.items?.slice(0, itemsLimit) || [];

  return (
    <div className={listWrapperClass}>
      {itemsToDisplay.map((artist) => (
        <Artist
          key={artist.id}
          artist={artist}
          {...itemComponentProps} // Spread the styles object received from the parent
        />
      ))}
    </div>
  );
};
