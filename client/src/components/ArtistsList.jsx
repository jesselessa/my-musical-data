export const ArtistsList = ({ period }) => {
  // Add {items} later

  // Fetch data from API :
  // 1 - Top all time artists
  // 2 - " " last 6 months
  // 3 - " " last 4 weeks

  // If they aren't any artists, we display a message
  // if (!items || items.length === 0) {
  //   return (
  //     <div className="text-white text-center mt-8">
  //       No artists to display for this period.
  //     </div>
  //   );
  // }

  return (
    <div className="flex-1 flex flex-col bg-red-400">
      <h3>{period} Artists</h3>
      {/* Loop on artists and diplay here */}
      {/* {items.map((artist) => (
        <div key={artist.id}>{artist.name}</div>
      ))} */}
    </div>
  );
};
