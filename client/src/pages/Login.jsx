import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import logo from "../assets/logo.png";

export const Login = () => {
  const { error } = useContext(AuthContext);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <section className="h-screen flex flex-col justify-center items-center bg-[#121212] text-[#1ed760] text-center gap-2 p-20 m-auto">
      <h1 className="text-4xl font-bold mb-5">My Spotify Data</h1>

      <p className="max-w-[60%] text-xl text-[#9b9b9b] mb-4">
        My Spotify Data is a web app that helps Spotify users visualize their
        listening habits and get personalized recommendations.
      </p>

      {error && <p className="text-xl text-red-500 mb-6">{error}</p>}

      {/* Redirection to Spotify Login page */}
      <a
        href={`${API_BASE_URL}/api/auth/login`}
        className="display:inline-block w-[220px] bg-[#16c038] text-[#121212] font-bold tracking-[1px] rounded-full py-3 px-5 active:transform active:translate-y-[2px] duration-150 ease-in-out hover:bg-green-600 transition-colors cursor-pointer"
      >
        LOG IN TO SPOTIFY
      </a>

      <div className="flex justify-center items-center fixed inset-x-0 bottom-5">
        <p className="text-lg text-[#9b9b9b] mr-2">
          © {new Date().getFullYear()} Jessica Elessa, All rights reserved -
          Created using Spotify Web API
        </p>
        <img src={logo} className="w-[30px] h-auto" alt="logo" />
      </div>
    </section>
  );
};
