import { ProfileHeader } from "../components/ProfileHeader.jsx";
import { TopSummary } from "../components/TopSummary.jsx";
import { ArtistsList } from "../components/ArtistsList.jsx";
import { TracksList } from "../components/TracksList.jsx";

export const UserProfile = () => {
  return (
    <section className="h-full flex flex-col">
      <ProfileHeader />

      {/* Top Summaries */}
      <div className="flex-1 flex gap-12 p-2">
        <TopSummary
          title="Top Artists Of All Time"
          category="Artists"
          listComponent={ArtistsList}
          listWrapperClass="flex-col space-y-4"
        />
        <TopSummary
          title="Top Tracks Of All Time"
          category="Tracks"
          listComponent={TracksList}
          listWrapperClass="flex-col space-y-4"
        />
      </div>
    </section>
  );
};
