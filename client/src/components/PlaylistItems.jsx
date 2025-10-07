import React from "react";
import { Track } from "./Track.jsx";

export const PlaylistItems = ({ playlist }) => {
  // Display the playlist 20 first tracks
  const itemsToDisplay = playlist?.tracks?.items?.slice(0, 20);

  return (
    <div className="flex-1 flex flex-col gap-5">
      {itemsToDisplay.map((item) => (
        <Track key={item.track.id} track={item.track} coverSize="size-14" />
      ))}
    </div>
  );
};
