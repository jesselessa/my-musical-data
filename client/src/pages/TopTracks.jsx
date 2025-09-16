import { TopItemsPage } from "../components/TopItemsPage.jsx";
import { TracksList } from "../components/TracksList.jsx";

export const TopTracks = () => {
  return (
    <TopItemsPage
      category="Tracks"
      listComponent={TracksList}
      listWrapperClass="flex-1 flex flex-col gap-4"
    />
  );
};
