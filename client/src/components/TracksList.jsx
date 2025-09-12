export const TracksList = ({ period }) => {
  // Add items later

  // Fetch data from API :
  // 1 - Top all time tracks
  // 2 - " " last 6 months
  // 2 - " " last 4 weeks
  // 4 - Recently played tracks

  // If they aren't any tracks, we display a message
  // if (!items || items.length === 0) {
  //   return (
  //     <div className="text-white text-center mt-8">
  //       No tracks to display for this period.
  //     </div>
  //   );
  // }

  return (
    <div className="flex-1 flex flex-col bg-red-400">
      <h3>{period} Top Tracks</h3>
      {/* Loop on tracks and diplay here */}
      {/* {items.map((track) => (
        <div key={track.id}>
          {track.name} - {track.artist}  
        </div>
      ))} */}
    </div>
  );
};
