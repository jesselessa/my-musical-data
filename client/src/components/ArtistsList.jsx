import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getTopArtists, mapPeriodToTimeRange } from "../api/spotify.js";
import { Artist } from "./Artist.jsx";
import { Loader } from "./Loader.jsx";

export const ArtistsList = ({
  period,
  listWrapperClass,
  itemComponentProps, // Receives the styles object from TopArtists
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

  if (!artistsData?.items?.length)
    return (
      <div className="flex-1 flex justify-center items-center">
        <p className="text-gray-400">No artist to display for this period.</p>
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
          {...itemComponentProps} //* Spread the styles object received from TopArtists as props =  Destructure the objet et pass the props (layout, coverSize, etc.)
        />
      ))}
    </div>
  );
};
