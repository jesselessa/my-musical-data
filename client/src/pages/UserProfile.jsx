import { ProfileHeader } from "../components/ProfileHeader.jsx";
import { Summary } from "../components/Summary.jsx";
import { ArtistsList } from "../components/ArtistsList.jsx";
import { TracksList } from "../components/TracksList.jsx";

export const UserProfile = () => {
  return (
    <section className="h-full flex flex-col">
      <ProfileHeader />

      {/* Top Summaries */}
      <div className="flex-1 flex gap-12 p-2">
        <Summary
          title="Top Artists Of All Time"
          category="Artists"
          listComponent={ArtistsList}
          listWrapperClass="flex flex-col gap-4"
        />
        <Summary
          title="Top Tracks Of All Time"
          category="Tracks"
          listComponent={TracksList}
          listWrapperClass="flex flex-col gap-4"
        />
      </div>
    </section>
  );
};
