import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { catalog } from "../api/spotify.js";
import { msToTime, getYear } from "../utils/utils.js";
import { Loader } from "../components/Loader.jsx";
import { Overlay } from "../components/Overlay.jsx";
import { Summary } from "../components/Summary.jsx";
import { PopularTracks } from "../components/PopularTracks.jsx";

export const TrackPage = () => {
  const { accessToken } = useContext(AuthContext);

  // Get track ID from the URL segment
  const { id } = useParams();

  const {
    data: trackData,
    isPending: isTrackPending,
    isError: isTrackError,
    error: trackError,
  } = useQuery({
    queryKey: ["track", id], // Refetch every time the track ID changes
    queryFn: () => catalog.getTrack(accessToken, id),
    enabled: !!accessToken, // Fetch data only if token available
  });

  if (isTrackPending)
    return (
      <div className="h-full flex justify-center items-center">
        <Loader />
      </div>
    );

  if (isTrackError)
    return (
      <div>
        <p className="text-lg">{trackError.message}</p>
      </div>
    );

  const artistName =
    trackData.artists.map((artist) => artist.name).join(", ") ?? "";
  const albumName = trackData?.album?.name ?? "No album";
  const albumYear = getYear(trackData?.album?.release_date);
  const trackDuration = msToTime(trackData?.duration_ms);

  return (
    <section className="h-full flex flex-col lg:flex-row gap-8 lg:gap-12 mt-7 lg:mt-0">
      <div className="w-full lg:w-2/5 flex flex-col items-center lg:items-start text-center lg:text-start">
        {/* Cover pic */}
        <div className="size-[250px] lg:size-[300px] mb-5">
          <img
            src={`${trackData?.album?.images[0]?.url}`}
            alt={`${trackData.name}`}
            className="size-full object-cover object-center"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="text-2xl lg:text-3xl font-bold">{trackData.name}</div>
          <div className="text-xl text-[#b9b9b9] font-semibold">
            {artistName}
          </div>
          <div className="text-base lg:text-lg text-[#b9b9b9]">
            {albumName} &bull; {albumYear}
          </div>
          <div className="text-sm lg:text-base mb-2">{trackDuration}</div>
        </div>

        {/* Button Play */}
        <a
          href={`${trackData?.external_urls?.spotify}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-center text-[#181818] font-semibold rounded-3xl bg-[#1ed760] py-2 px-6 hover:bg-green-600 active:bg-green-500 active:transform active:translate-y-[1px]"
        >
          PLAY IN SPOTIFY
        </a>
      </div>

      <div className="w-full lg:w-3/5">
        <h2 className="text-lg font-bold text-white mb-5">
          Popular Tracks By The Same Artist
        </h2>
        <PopularTracks trackData={trackData} />
      </div>
    </section>
  );
};
