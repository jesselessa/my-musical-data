import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";

export const Login = () => {
  const { error } = useContext(AuthContext);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[#121212] text-[#1ed760] text-center p-5 gap-2">
      <h1 className="text-3xl font-bold mb-5">My Spotify data</h1>

      <p className="max-w-[60%] text-xl text-white mb-3">
        My Spotify Data is a web app that helps Spotify users visualize their
        listening habits and get personalized recommendations.
      </p>

      <p className="text-[20px] text-red-500 mb-7">Error message</p>
      {/* {error && <p className="text-xs text-red-500 mb-7">{error}</p>} */}

      {/* Redirection to Spotify Login page */}
      <a
        href={`${API_BASE_URL}/api/auth/login`}
        className="display:inline-block w-[220px] bg-[#1ed760] text-[#121212] font-bold tracking-[2px] rounded-full py-3 px-5 hover:bg-green-600 hover:text-[#121212] transition-color cursor-pointer"
      >
        LOG IN TO SPOTIFY
      </a>
    </div>
  );
};
