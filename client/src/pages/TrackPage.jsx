import { useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { getTrack, getArtistTopTracks } from "../api/spotify.js";
import { msToTime, getYear } from "../utils/utils.js";
import { Loader } from "../components/Loader.jsx";
import { Overlay } from "../components/Overlay.jsx";
import { Summary } from "../components/Summary.jsx";
import { Recommendations } from "../components/Recommendations.jsx";
import { RecommendationsBis } from "../components/RecommendationsBis.jsx";

export const TrackPage = () => {
  const { accessToken } = useContext(AuthContext);

  // Get ID from the URL segment
  const { id } = useParams(); // Track id

  // Fetch track data
  const {
    data: trackData,
    isPending: isTrackPending,
    isError: isTrackError,
  } = useQuery({
    queryKey: ["track", id], // Refetch every time the track ID changes
    queryFn: () => getTrack(accessToken, id),
    enabled: !!accessToken,
  });

  // Fetch popular artist's tracks using the artist's ID from trackData
  const artistId = trackData?.artists?.[0]?.id;
  const {
    data: popularTracksData,
    isPending: isPopularTracksPending,
    isError: isPopularTracksError,
  } = useQuery({
    queryKey: ["popularTracks", artistId],
    queryFn: () => getArtistTopTracks(accessToken, artistId),
    enabled: !!artistId, //* Fetch only if artistId is available (because the data here only depend on the existence of trackData)
  });

  if (isTrackPending || isPopularTracksPending)
    return (
      <div className="h-full flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isTrackError || isPopularTracksError)
    return (
      <div className="h-full flex justify-center items-center">
        <p>Error while fetching data</p>
      </div>
    );

  const artistName =
    trackData.artists.map((artist) => artist.name).join(", ") ?? "";
  const albumName = trackData?.album?.name ?? "No album";
  const albumYear = getYear(trackData?.album?.release_date);
  const trackDuration = msToTime(trackData?.duration_ms);

  return (
    <section className="h-full flex flex-col">
      <div className="flex gap-10 mb-12">
        {/* Cover pic */}
        <div className="size-[250px]">
          <img
            src={`${trackData?.album?.images[0]?.url}`}
            alt={`${trackData.name}`}
            className="size-full object-cover object-center"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-3">
          <div className="text-4xl font-bold">{trackData.name}</div>
          <div className="text-2xl text-[#b9b9b9] font-bold">{artistName}</div>
          <div className="text-lg text-[#b9b9b9]">
            {albumName} &bull; {albumYear}
          </div>
          <div className="text-base mb-2">{trackDuration}</div>

          {/* Button Play */}
          <a
            href={`${trackData?.external_urls?.spotify}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-center text-[#181818] font-semibold rounded-3xl bg-[#1ed760] py-2 px-6 hover:bg-green-500 active:bg-green-500 active:transform active:translate-y-[1px]"
          >
            PLAY ON SPOTIFY
          </a>
        </div>
      </div>

      <div className="flex-1 flex gap-12 p-2">
        <Summary
          title="Popular Tracks By The Same Artist"
          listComponent={Recommendations}
          listWrapperClass="flex flex-col gap-4"
          items={popularTracksData}
        />
        <Summary
          title="Related Artists"
          listComponent={RecommendationsBis}
          listWrapperClass="flex flex-col gap-4"
          items=""
        />
      </div>
    </section>
  );
};
