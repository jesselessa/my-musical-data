import { useState } from "react";
import { ProfileHeader } from "../components/ProfileHeader.jsx";
import { Summary } from "../components/Summary.jsx";
import { ArtistsList } from "../components/ArtistsList.jsx";
import { TracksList } from "../components/TracksList.jsx";

export const UserProfile = () => {
  // By default, we show a short list for the Summary component with only 10 items (long list = 20 items) with a "See More" button
  const [showFullArtists, setShowFullArtists] = useState(false);
  const [showFullTracks, setShowFullTracks] = useState(false);

  // Set props to customize Artist and Track components inside the list component (ArtistsList or TracksList)
  const artistStyles = {
    layout: "flex-row",
    coverSize: "size-16",
    nameSize: "text-base",
  };

  const trackStyles = {
    coverSize: "size-14 md:size-16",
  };

  return (
    <section className="h-full flex flex-col">
      <ProfileHeader />

      {/* Top Summaries */}
      <div className="flex-1 flex flex-col md:flex-row gap-12 p-2">
        <Summary
          title="Top Artists Of All Time"
          category="Artists"
          listComponent={ArtistsList}
          listWrapperClass="flex flex-col gap-5"
          itemComponentProps={artistStyles}
          showFullList={showFullArtists}
          setShowFullList={setShowFullArtists}
        />

        <Summary
          title="Top Tracks Of All Time"
          category="Tracks"
          listComponent={TracksList}
          listWrapperClass="flex flex-col gap-5"
          itemComponentProps={trackStyles}
          showFullList={showFullTracks}
          setShowFullList={setShowFullTracks}
        />
      </div>
    </section>
  );
};
