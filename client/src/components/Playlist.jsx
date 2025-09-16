import { Link } from "react-router";
import { Overlay } from "./Overlay.jsx";

export const Playlist = ({ playlist }) => {
  return (
    <Link to={`/playlists/${playlist.id}`}>
      <div>
        {/* Playlist cover */}
        {/* Width and height set by the parent (grid) */}
        <div className={`relative group`}>
          <img
            src={playlist.images[0]?.url}
            alt={playlist.name}
            className={`object-cover object-center`}
          />
          <Overlay />
        </div>

        <h3 className="mt-2 text-white text-center font-semibold">
          {playlist.name}
        </h3>
        <p className="text-sm text-[#b9b9b9] text-center">
          {playlist.tracks.total}{" "}
          {playlist.tracks.total === 1 ? "TRACK" : "TRACKS"}
        </p>
      </div>
    </Link>
  );
};
