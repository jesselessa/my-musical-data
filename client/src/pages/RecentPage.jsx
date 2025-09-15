import { RecentTracks } from "../components/RecentTracks.jsx";

export const RecentPage = () => {
  return (
    <section className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-12">Recently Played</h2>
      <RecentTracks />
    </section>
  );
};
