export const Artist = ({
  artist,
  layout = "flex-row",
  imageSize = "w-16 h-16",
  nameSize = "text-base",
}) => {
  return (
    <div key={artist.id} className={`flex ${layout} gap-4 items-center`}>
      <div className={`${imageSize}`}>
        <img
          src={artist.images[0]?.url}
          alt={artist.name}
          className={`${imageSize} rounded-full object-cover object-center`}
        />
      </div>

      <p className={`${nameSize} text-white font-semibold`}>{artist.name}</p>
    </div>
  );
};
