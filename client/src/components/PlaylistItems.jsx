import { Track } from "./Track.jsx";

export const PlaylistItems = ({ playlist }) => {
  return (
    <div className="flex-1 flex flex-col gap-4">
      {playlist?.tracks?.items?.map((item) => (
        <Track key={item.track.id} track={item.track} />
      ))}
    </div>
  );
};
