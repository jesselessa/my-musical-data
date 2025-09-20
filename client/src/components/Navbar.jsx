import { Link, NavLink } from "react-router";
import ICONS from "./icons/navbar/NavbarIcons.jsx";

export const Navbar = () => {
  return (
    <nav className="h-auto md:h-screen w-screen md:w-24 flex md:flex-col md:justify-between items-center bg-[#121212] text-white text-center text-sm  p-1 md:pt-5 md:pb-7">
      {/* Logo */}
      <Link to="/profile" className="hidden md:block">
        {ICONS.logoSpotify}
      </Link>

      {/* Nav items categories */}
      <div className="w-full flex md:flex-col justify-around text-[#b9b9b9] gap-3">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `p-2 flex flex-col justify-center items-center md:hover:bg-[#181818] md:hover:border-l-4  hover:border-[rgb(30,215,96)] hover:text-white ${
              isActive
                ? "border-t-4 md:border-t-0 md:border-l-4 border-[#1ed760] bg-[#181818] text-white"
                : ""
            }`
          }
        >
          <div className="flex flex-col justify-center items-center gap-1">
            {ICONS.profile}
            <span className="hidden md:block">Profile</span>
          </div>
        </NavLink>

        <NavLink
          to="/artists"
          className={({ isActive }) =>
            `p-2 flex flex-col justify-center items-center md:hover:bg-[#181818] md:hover:border-l-4  hover:border-[rgb(30,215,96)] hover:text-white ${
              isActive
                ? "border-t-4 md:border-t-0 md:border-l-4 border-[#1ed760] bg-[#181818] text-white"
                : ""
            }`
          }
        >
          <div className="flex flex-col justify-center items-center gap-1">
            {ICONS.artists}
            <span className="hidden md:block">Top Artists</span>
          </div>
        </NavLink>

        <NavLink
          to="/tracks"
          className={({ isActive }) =>
            `p-2 flex flex-col justify-center items-center md:hover:bg-[#181818] md:hover:border-l-4  hover:border-[rgb(30,215,96)] hover:text-white ${
              isActive
                ? "border-t-4 md:border-t-0 md:border-l-4 border-[#1ed760] bg-[#181818] text-white"
                : ""
            }`
          }
        >
          <div className="flex flex-col justify-center items-center gap-1">
            {ICONS.tracks}
            <span className="hidden md:block">Top Tracks</span>
          </div>
        </NavLink>

        <NavLink
          to="/recent"
          className={({ isActive }) =>
            `p-2 flex flex-col justify-center items-center md:hover:bg-[#181818] md:hover:border-l-4  hover:border-[rgb(30,215,96)] hover:text-white ${
              isActive
                ? "border-t-4 md:border-t-0 md:border-l-4 border-[#1ed760] bg-[#181818] text-white"
                : ""
            }`
          }
        >
          <div className="flex flex-col justify-center items-center gap-1">
            {ICONS.recent}
            <span className="hidden md:block">Recent</span>
          </div>
        </NavLink>

        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            `p-2 flex flex-col justify-center items-center md:hover:bg-[#181818] md:hover:border-l-4  hover:border-[rgb(30,215,96)] hover:text-white ${
              isActive
                ? "border-t-4 md:border-t-0 md:border-l-4 border-[#1ed760] bg-[#181818] text-white"
                : ""
            }`
          }
        >
          <div className="flex flex-col justify-center items-center gap-1">
            {ICONS.playlists}
            <span className="hidden md:block">Playlists</span>
          </div>
        </NavLink>
      </div>
      {/* Link to GH profile */}
      <a
        href="https://github.com/jesselessa"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden md:block hover:text-[#b9b9b9]"
      >
        {ICONS.github}
      </a>
    </nav>
  );
};
