import { ProfileHeader } from "../components/ProfileHeader.jsx";
import { TopSummary } from "../components/TopSummary.jsx";
import { ArtistsList } from "../components/ArtistsList.jsx";
import { TracksList } from "../components/TracksList.jsx";

export const UserProfile = () => {
  return (
    <section className="h-full flex flex-col justify-center overflow-auto pt-12 px-12">
      <ProfileHeader />

      {/* Top Summaries */}
      <div className="flex-1 flex gap-12 p-2 bg-red-400">
        <TopSummary
          title="Top Artists Of All Time"
          category="Artists"
          listComponent={ArtistsList}
        />
        <TopSummary
          title="Top Tracks Of All Time"
          category="Tracks"
          listComponent={TracksList}
        />
      </div>
    </section>
  );
};
