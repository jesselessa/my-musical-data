import React from "react";
import { TopItemsPage } from "../components/TopItemsPage.jsx";
import { TracksList } from "../components/TracksList.jsx";

export const TopTracks = () => {
  // Customize Track component styles
  const trackStyles = {
    coverSize: "size-14",
  };

  return (
    <TopItemsPage
      category="Tracks"
      listComponent={TracksList}
      listWrapperClass="flex-1 flex flex-col gap-4"
      itemComponentProps={trackStyles}
    />
  );
};
