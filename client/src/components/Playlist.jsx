export const Playlist = ({ playlist }) => {
  return (
    <div>
      <img
        src={playlist.images[0]?.url}
        alt={playlist.name}
        className="w-full h-auto rounded"
      />
      <h3 className="mt-2 text-white text-center font-semibold">
        {playlist.name}
      </h3>
      <p className="text-sm text-[#b9b9b9] text-center">
        {playlist.tracks.total}{" "}
        {playlist.tracks.total === 1 ? "TRACK" : "TRACKS"}
      </p>
    </div>
  );
};
