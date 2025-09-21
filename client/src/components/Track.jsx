import { Link } from "react-router";
import { Overlay } from "./Overlay.jsx";
import { msToTime } from "../utils/utils.js";
import defaultImg from "../assets/default-cover.jpg";

export const Track = ({ track, coverSize, ...props }) => {
  const albumName = track?.album?.name;
  const artistsString = track?.artists?.map((artist) => artist.name).join(", ");
  const nameAndAlbum = albumName
    ? `${artistsString} • ${albumName}`
    : artistsString;

  return (
    <Link to={`/tracks/${track?.id}`}>
      <div className={`flex justify-between`} {...props}>
        {/* Artist's info */}
        <div className="flex items-center gap-3 mr-2 md:mr-0">
          {/* Cover image */}
          <div className={`relative group ${coverSize} aspect-square`}>
            <img
              src={track?.album?.images[0]?.url ?? `${defaultImg}`}
              alt={track?.name ?? "Unknown track"}
              className={`${coverSize} object-cover object-center `}
            />
            <Overlay />
          </div>

          {/* Name and album */}
          <div className="flex flex-col justify-center">
            <p className="w-full not-first:text-white font-semibold hover:underline underline-offset-5">
              {track?.name}
            </p>
            <p className="w-full text-gray-400 text-sm">{nameAndAlbum}</p>
          </div>
        </div>

        {/* Track duration */}
        <div className="flex items-start text-sm md:text-base">
          {/* 1 000 ms = 1 s, 60 s = 1 min, 60 min = 1 h */}
          <p>{msToTime(track?.duration_ms)}</p>
        </div>
      </div>
    </Link>
  );
};
