import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import logo from "../assets/logo.png";

export const Login = () => {
  const { error } = useContext(AuthContext);
  const API_URL = import.meta.env.VITE_API_URL;

  return (
    <section className="min-h-screen flex flex-col justify-between items-center bg-[#121212] text-[#1ed760] text-center gap-2 p-3 md:p-10 m-auto">

      <h1 className="text-4xl md:text-5xl font-bold mt-5">My Musical Data</h1>

      <div className="flex flex-col items-center gap-3 m-auto">
        <p className="w-full text-lg md:text-xl text-[#9b9b9b] mb-3">
          My Musical Data is a web application that helps Spotify users visualize
          their main listening habits.
        </p>

        {error && <p className="text-xl text-red-500 mb-2">{error}</p>}

        <p className="text-lg text-white mb-6">
          ⚠️ Contact the{" "}
          <a
            href="https://github.com/jesselessa"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-5"
          >
            developer
          </a>{" "}
          to be added to the application allow list before you can use it.
        </p>

        {/* Login button - Redirection to Spotify Login page */}
        <a
          href={`${API_URL}/auth/login`}
          className="display:inline-block w-[220px] bg-[#16c038] text-[#121212] font-bold tracking-[1px] rounded-full py-3 px-5 active:transform active:translate-y-[1.5px] duration-150 ease-in-out hover:bg-green-600 transition-colors mt-5 cursor-pointer"
        >
          LOG IN TO SPOTIFY
        </a>

      </div>


      <footer className="flex justify-center items-center">
        <p className="md:text-lg text-[#9b9b9b] mr-2">
          © {new Date().getFullYear()} Jessica Elessa, All rights reserved -
          Created using Spotify API
        </p>
        <img src={logo} className="w-[30px] h-auto" alt="logo" />
      </footer>
    </section>
  );
};
