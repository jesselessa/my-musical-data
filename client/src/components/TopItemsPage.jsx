import { useState } from "react";
import { MainHeader } from "./MainHeader.jsx";
import { FilterButtons } from "./FilterButtons.jsx";

/*
 * TopItemsPage acts as a generic frame or a template.
 * Designed to be reusable for different lists (here, TracksList and ArtistsList)
 * Needs to know which specific component(s) to render inside its frame
 * We provide that information via the listComponent props
 */

export const TopItemsPage = ({
  category,
  listComponent: ListComponent,
  listWrapperClass,
  itemComponentProps,
}) => {
  const [selectedPeriod, setSelectedPeriod] = useState("All Time");

  // Set title
  const title = `Top ${category}`;

  return (
    <section className="h-full flex flex-col">
      {/* Title */}
      <MainHeader title={title}>
        {/* Buttons for filtering by time period */}
        <FilterButtons
          selectedPeriod={selectedPeriod}
          setSelectedPeriod={setSelectedPeriod}
        />
      </MainHeader>
      {/* ⚠️ Pass `listWrapperClass` for the styles */}
      <ListComponent
        period={selectedPeriod}
        listWrapperClass={listWrapperClass}
        itemComponentProps={itemComponentProps}
      />
    </section>
  );
};
