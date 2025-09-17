import { useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getArtist } from "../api/spotify.js";
import { Loader } from "../components/Loader.jsx";
import { Overlay } from "../components/Overlay.jsx";

export const ArtistPage = () => {
  const { accessToken } = useContext(AuthContext);

  // Get ID from the URL segment
  const { id } = useParams();

  // Fetch artist data
  const {
    data: artistData,
    isPending: isArtistPending,
    isError: isArtistError,
  } = useQuery({
    queryKey: ["artist", id], // Refetch every time the artist ID changes
    queryFn: () => getArtist(accessToken, id),
    enabled: !!accessToken,
  });

  if (isArtistPending)
    return (
      <div className="h-full flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isArtistError)
    return (
      <div className="h-full flex justify-center items-center">
        <p>Error loading artist</p>
      </div>
    );

  const followersCount = artistData?.followers?.total?.toString() ?? "0";
  const artistGenres =
    artistData?.genres.join(", ").toUpperCase() ?? "UNDEFINED";

  return (
    <section className="h-full flex flex-col justify-center items-center">
      {/* Cover picture */}
      <a
        // Artist's page URL on Spotify
        href={`${artistData.external_urls.spotify}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="relative group size-[300px] rounded-full cursor-pointer">
          <img
            src={`${artistData?.images[0]?.url}`}
            alt={`${artistData?.name}`}
            className="size-full object-cover object-center rounded-full"
          />
          <Overlay rounded="rounded-full" />
        </div>
      </a>

      <h1 className="text-[50px] font-bold">{artistData?.name}</h1>

      {/* Artist's info */}
      <div className="w-3/4 flex justify-center items-center text-center gap-5 mt-5">
        <div className="w-1/3 flex flex-col justify-center items-center gap-2">
          <span className="text-xl text-[#1ed760] font-semibold">
            {followersCount}
          </span>
          <span className="text-[#b9b9b9] text-sm">FOLLOWERS</span>
        </div>

        <div className="w-1/3 flex flex-col justify-center items-center gap-2">
          <span className="text-base text-[#1ed760] font-semibold">
            {artistGenres}
          </span>
          <span className="text-[#b9b9b9] text-sm">GENRES</span>
        </div>

        <div className="w-1/3 flex flex-col justify-center items-center gap-2">
          <span className="text-xl text-[#1ed760] font-semibold">
            {artistData?.popularity} %
          </span>
          <span className="text-[#b9b9b9] text-sm">POPULARITY</span>
        </div>
      </div>
    </section>
  );
};
