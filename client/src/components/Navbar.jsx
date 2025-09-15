import { Link, NavLink } from "react-router";
import ICONS from "./icons/navbar/NavbarIcons.jsx";

export const Navbar = () => {
  return (
    <nav className="h-screen w-24 flex flex-col justify-between items-center bg-[#121212] text-white text-center text-sm pt-5 pb-7">
      {/* Logo */}
      <Link to="/profile">{ICONS.logoSpotify}</Link>

      {/* Nav items categories */}
      <div className="flex flex-col text-[#b9b9b9] gap-3">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `p-2 flex flex-col justify-center items-center hover:bg-[#181818] hover:border-l-4  hover:border-[#1ed760] hover:text-white ${
              isActive
                ? "border-l-4 border-[#1ed760] bg-[#181818] text-white"
                : ""
            }`
          }
        >
          <div className="flex flex-col justify-center items-center gap-1">
            {ICONS.profile}
            <span>Profile</span>
          </div>
        </NavLink>

        <NavLink
          to="/artists"
          className={({ isActive }) =>
            `p-2 flex flex-col justify-center items-center  hover:bg-[#181818] hover:border-l-4 hover:border-[#1ed760] hover:text-white ${
              isActive
                ? "border-l-4 border-[#1ed760] bg-[#181818] text-white"
                : ""
            }`
          }
        >
          <div className="flex flex-col justify-center items-center gap-1">
            {ICONS.artists}
            <span>Top Artists</span>
          </div>
        </NavLink>

        <NavLink
          to="/tracks"
          className={({ isActive }) =>
            `p-2 flex flex-col justify-center items-center  hover:bg-[#181818] hover:border-l-4 hover:border-[#1ed760] hover:text-white ${
              isActive
                ? "border-l-4 border-[#1ed760] bg-[#181818] text-white"
                : ""
            }`
          }
        >
          <div className="flex flex-col justify-center items-center gap-1">
            {ICONS.tracks}
            <span>Top Tracks</span>
          </div>
        </NavLink>

        <NavLink
          to="/recent"
          className={({ isActive }) =>
            `p-2 flex flex-col justify-center items-center  hover:bg-[#181818] hover:border-l-4 hover:border-[#1ed760] hover:text-white ${
              isActive
                ? "border-l-4 border-[#1ed760] bg-[#181818] text-white"
                : ""
            }`
          }
        >
          <div className="flex flex-col justify-center items-center gap-1">
            {ICONS.recent}
            <span>Recent</span>
          </div>
        </NavLink>

        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            `p-2 flex flex-col justify-center items-center  hover:bg-[#181818] hover:border-l-4 hover:border-[#1ed760] hover:text-white ${
              isActive
                ? "border-l-4 border-[#1ed760] bg-[#181818] text-white"
                : ""
            }`
          }
        >
          <div className="flex flex-col justify-center items-center gap-1">
            {ICONS.playlists}
            <span>Playlists</span>
          </div>
        </NavLink>
      </div>
      {/* Link to GH profile */}
      <a
        href="https://github.com/jesselessa"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-[#b9b9b9]"
      >
        {ICONS.github}
      </a>
    </nav>
  );
};
