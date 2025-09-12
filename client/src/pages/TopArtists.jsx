import { TopItemsPage } from "../components/TopItemsPage.jsx";
import { ArtistsList } from "../components/ArtistsList.jsx";

export const TopArtists = () => {
  return <TopItemsPage category="Artists" listComponent={ArtistsList} />;
};
