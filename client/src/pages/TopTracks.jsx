import { TopItemsPage } from "../components/TopItemsPage.jsx";
import { TracksList } from "../components/TracksList.jsx";

export const TopTracks = () => {
  // const trackStyles = {
  // layout: "flex-col",
  // imageSize: "w-[200px] h-[200px]", // Larger size for the image
  // nameSize: "text-lg", // Larger font size
  // };

  return (
    <TopItemsPage
      category="Tracks"
      listComponent={TracksList}
      listWrapperClass="flex-1 flex flex-col gap-4"
      // itemComponentProps={trackStyles}
    />
  );
};
