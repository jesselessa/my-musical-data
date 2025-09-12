import { useContext } from "react";
import { AuthContext } from "../contexts/authProvider";
import user from "../assets/user.png";

export const Header = () => {
  const { userProfile, logout } = useContext(AuthContext);

  return (
    <header className="flex flex-col justify-center items-center gap-2">
      {/* Profile pic */}
      {userProfile?.images && userProfile.images?.length > 0 ? (
        <div className="w-[150px] h-[150px] flex justify-center items-center rounded-full">
          <img
            src={userProfile.images[0].url}
            className="w-full h-full rounded-full object-cover object-center"
            alt="profile"
          />
        </div>
      ) : (
        <div className="w-[150px] h-[150px] justify-center items-center rounded-full">
          <img
            src={user}
            className="w-full h-full rounded-full object-cover object-center"
            alt="user"
          />
        </div>
      )}

      {/* Name */}
      <h2 className="text-5xl text-white text-center font-semibold hover:text-[#1ed760]">
        {userProfile?.display_name}
      </h2>
      <a
        href={`${userProfile?.external_urls?.spotify}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <span className="inline-block text-[#b9b9b9] mt-1 mb-2 hover:text-[#1ed760]">
          Open in Spotify
        </span>
      </a>

      {/* Stats */}
      <div className="flex justify-center items-center gap-5">
        <div className="flex flex-col justify-center items-center gap-2">
          <span className="text-[#1ed760] font-bold">
            {userProfile?.followers?.total?.length === 0
              ? "0"
              : `${userProfile?.followers?.total.toString()}`}
          </span>
          <span className="text-sm text-[#9b9b9b]">FOLLOWERS</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <span className="text-lg text-[#1ed760] font-bold">
            {userProfile?.followers?.total?.length === 0
              ? "0"
              : `${userProfile?.followers?.total.toString()}`}
          </span>
          {/* Change later */}
          <span className="text-sm text-[#9b9b9b]">FOLLOWING</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <span className="text-lg text-[#1ed760] font-bold">
            {userProfile?.followers?.total?.length === 0
              ? "0"
              : `${userProfile?.followers?.total.toString()}`}
          </span>
          {/* Change later */}
          <span className="text-sm text-[#9b9b9b]">PLAYLISTS</span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="text-sm font-semibold rounded-3xl border-1 border-white py-2 px-7 mt-5 cursor-pointer hover:bg-white hover:text-[#121212] transition-colors duration-200 ease-in-out"
      >
        LOGOUT
      </button>
    </header>
  );
};
