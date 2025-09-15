import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getTopArtists, mapPeriodToTimeRange } from "../api/spotify.js";
import { Artist } from "./Artist.jsx";
import { Loader } from "./Loader.jsx";

export const ArtistsList = ({
  period,
  listWrapperClass,
  itemComponentProps,
  itemsLimit,
}) => {
  const { accessToken } = useContext(AuthContext);

  const {
    data: artistsData,
    isPending: isArtistsPending,
    isError: isArtistsError,
  } = useQuery({
    queryKey: ["artists", period], // The query key now includes the period to trigger a refetch when the period changes
    queryFn: () => getTopArtists(accessToken, mapPeriodToTimeRange(period)),
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
      <div className="flex-1 flex">
        <p>Error loading artists</p>
      </div>
    );

  // Limit the number of displayed artists based on itemsLimit prop
  const itemsToDisplay = artistsData?.items?.slice(0, itemsLimit) || [];

  return (
    <div className={listWrapperClass}>
      {itemsToDisplay.map((artist) => (
        <Artist
          key={artist.id}
          artist={artist}
          {...itemComponentProps} // Spread the styles object as props
        />
      ))}
    </div>
  );
};
