import { Link } from "react-router";
import { Overlay } from "./Overlay.jsx";
import { msToTime } from "../utils/msToTime";

export const Track = ({ track, coverSize = "w-16 h-16" }) => {
  const albumName = track.album?.name;
  const artistsString = track.artists.map((artist) => artist.name).join(", ");
  const nameAndAlbum = albumName
    ? `${artistsString} • ${albumName}`
    : artistsString;

  return (
    <Link to={`/tracks/${track.id}`}>
      <div key={track.played_at} className="flex justify-between">
        {/* Artist's info */}
        <div className="flex items-center gap-4">
          {/* Cover image */}
          <div className={`relative group ${coverSize}`}>
            <img
              src={track.album.images[0]?.url}
              alt={track.name}
              className={`${coverSize} object-cover object-center`}
            />
            <Overlay />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-white font-semibold hover:underline underline-offset-5">
              {track.name}
            </p>
            <p className="text-gray-400 text-sm">{nameAndAlbum}</p>
          </div>
        </div>
        {/* Track duration */}
        <div className="flex items-start">
          {/* 1 000 ms = 1 s, 60 s = 1 min, 60 min = 1 h */}
          <p>{msToTime(track.duration_ms)}</p>
        </div>
      </div>
    </Link>
  );
};
