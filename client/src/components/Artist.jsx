import { Link } from "react-router";
import { Overlay } from "./Overlay.jsx";

export const Artist = ({ artist, layout, coverSize, nameSize, ...props }) => {
  return (
    <Link to={`/artists/${artist?.id}`}>
      <div
        key={artist?.id}
        className={`flex ${layout} gap-2 md:gap-3 items-center hover:cursor-pointer`}
        {...props}
      >
        {/* The Tailwind CSS class "group" allows us to apply styles to child elements when the parent is in a specific state, such as hover. */}
        {/* Cover image */}
        <div className={`relative group ${coverSize}`} {...props}>
          <img
            src={artist?.images[0]?.url}
            alt={artist?.name}
            className={`${coverSize} rounded-full object-cover object-center`}
          />
          <Overlay rounded="rounded-full" />
        </div>

        <p
          className={`${nameSize} text-white text-center font-semibold hover:underline underline-offset-5`}
        >
          {artist?.name}
        </p>
      </div>
    </Link>
  );
};
