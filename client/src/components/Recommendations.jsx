import { Track } from "../components/Track.jsx";

export const Recommendations = ({ items }) => {
  if (!items || items.length === 0) {
    return <p className="text-gray-400">No popular tracks found.</p>;
  }

  return (
    <div>
      {items?.map((item) => (
        <Track key={item?.id} track={items} />
      ))}
    </div>
  );
};
