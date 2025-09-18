import { TopItemsPage } from "../components/TopItemsPage.jsx";
import { ArtistsList } from "../components/ArtistsList.jsx";

export const TopArtists = () => {
  // Customize Artist component styles
  const artistStyles = {
    layout: "flex-col",
    coverSize: "w-[200px] h-[200px]", // Larger size for the image
    nameSize: "text-lg", // Larger font size
  };

  return (
    <TopItemsPage
      category="Artists"
      listComponent={ArtistsList}
      listWrapperClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 gap-10"
      // Pass the styles object as a prop
      itemComponentProps={artistStyles}
    />
  );
};
