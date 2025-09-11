import { Outlet, Link } from "react-router";

// Images
import logo from "../assets/logo.png";
import github from "../assets/github.png";

export const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Fixed navbar */}
      <nav className="w-30 flex flex-col justify-between items-center bg-[#121212] text-white text-center px-3 pt-5 pb-7">
        {/* Logo */}
        <Link to="/profile">
          <div className="w-[50px] h-[50px]">
            <img src={logo} className="object-cover object-center" alt="logo" />
          </div>
        </Link>

        {/* Nav items list */}
        <ul className="flex flex-col gap-5">
          <li>
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <Link to="/top-artists">Top Artists</Link>
          </li>
          <li>
            <Link to="/top-tracks">Top Tracks</Link>
          </li>
          <li>
            <Link to="/recent">Recent</Link>
          </li>
          <li>
            <Link to="/playlists">Playlists</Link>
          </li>
        </ul>

        {/* GH repo link */}
        <a
          href="https://github.com/jesselessa/my-spotify-data"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={github} alt="github" />
        </a>
      </nav>
      {/* Outlet acts as a placeholder where the child routes defined in the React Router configuration will be rendered */}
      <main className="min-h-full bg-[#181818] flex-1 p-20 text-white overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
