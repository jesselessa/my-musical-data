import React, { useState } from "react";
import { MainHeader } from "./MainHeader.jsx";
import { FilterButtons } from "./FilterButtons.jsx";

/*
 * TopItemsPage acts as a generic frame or a template.
 * Designed to be reusable for different lists (here, TracksList and ArtistsList)
 * Needs to know which specific component(s) to render inside its frame
 * Information provided to ListComponent are passed via its props
 */

export const TopItemsPage = ({
  category,
  listComponent: ListComponent, // ArtistsList or TracksList
  listWrapperClass, // List styles
  itemComponentProps, // Info provided to list item (Artist or Track)
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("All Time");

  // Set title
  const title = `Top ${category}`;

  return (
    <section className="h-full flex flex-col">
      <MainHeader title={title}>
        {/* Buttons for filtering artists/tracks by time period */}
        <FilterButtons
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
      </MainHeader>

      <ListComponent
        period={selectedPeriod}
        listWrapperClass={listWrapperClass}
        itemComponentProps={itemComponentProps}
      />
    </section>
  );
};
