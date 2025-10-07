import React from "react";
import { Link } from "react-router";
import { Overlay } from "./Overlay.jsx";
import defaultCover from "../assets/default-cover.jpg";

/*
 * Displayed on Playlists List
 */
export const PlaylistCoverInfo = ({ playlist }) => {
  return (
    <Link
      to={`/playlists/${playlist?.id}`}
      className="flex flex-col justify-center items-center"
    >
      <div>
        {/* Playlist cover */}
        <div className={`relative group aspect-square`}>
          <img
            src={playlist?.images?.[0]?.url || defaultCover}
            alt={playlist?.name}
            className={`size-full object-cover object-center`}
          />
          <Overlay />
        </div>

        <h3 className="mt-2 text-white text-center font-semibold">
          {playlist?.name}
        </h3>
        <p className="text-sm text-[#b9b9b9] text-center">
          {playlist?.tracks?.total === 0
            ? "NO TRACK"
            : `${playlist?.tracks?.total} ${
                playlist?.tracks?.total === 1 ? "TRACK" : "TRACKS"
              }`}
        </p>
      </div>
    </Link>
  );
};
