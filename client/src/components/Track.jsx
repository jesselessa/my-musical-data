import { msToTime } from "../utils/msToTime";

export const Track = ({ track }) => {
  return (
    <div key={track.played_at} className="flex justify-between">
      {/* Artist's info */}
      <div className="flex items-center gap-4">
        <img
          src={track.album.images[0]?.url}
          alt={track.name}
          className="w-16 h-16"
        />
        <div className="flex flex-col justify-center">
          <p className="text-white font-semibold">{track.name}</p>
          <p className="text-gray-400 text-sm">
            {track.artists.map((a) => a.name).join(", ")} -{" "}
            {track.album.name ? ` - ${track.album.name}` : ""}
          </p>
        </div>
      </div>

      {/* Track duration */}
      <div className="flex items-start">
        {/* 1 000 ms = 1 s, 60 s = 1 min, 60 min = 1 h */}
        <p>{msToTime(track.duration_ms)}</p>
      </div>
    </div>
  );
};
