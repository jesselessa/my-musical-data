import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import userPlaceholder from "../assets/user.png";

export const ProfileHeader = () => {
  const { userProfile, logout } = useContext(AuthContext);

  const profileImageUrl =
    userProfile?.images && userProfile.images?.length > 0
      ? userProfile.images[0].url
      : userPlaceholder;

  return (
    <header className="flex flex-col justify-center items-center gap-2 mb-12">
      {/* Profile pic */}
      <div className="w-[150px] h-[150px] flex justify-center items-center rounded-full">
        <img
          src={profileImageUrl}
          className="w-full h-full rounded-full object-cover object-center"
          alt="profile"
        />
      </div>

      {/* Name */}
      <h2 className="text-5xl text-white text-center font-semibold hover:text-[#1ed760]">
        {userProfile?.display_name}
      </h2>
      <a
        href={userProfile?.external_urls?.spotify}
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
            {/* Below '??' means if userProfile?.followers?.total is 'null' or 'undefined', followers number displays '0'*/}
            {/* '??' is called 'Nullish coalescing operator'(in French,'opérateur de fusion nulle') */}
            {userProfile?.followers?.total?.toString() ?? "0"}
          </span>
          <span className="text-sm text-[#9b9b9b]">FOLLOWERS</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {/* Replace by the real data from API */}
          <span className="text-lg text-[#1ed760] font-bold">24</span>
          <span className="text-sm text-[#9b9b9b]">FOLLOWING</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          {/* Replaceplaylists */}
          <span className="text-lg text-[#1ed760] font-bold">16</span>
          <span className="text-sm text-[#9b9b9b]">PLAYLISTS</span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="text-sm font-semibold tracking-[2px] rounded-3xl border-1 border-white py-2 px-7 mt-5 cursor-pointer hover:bg-white hover:text-[#121212] transition-colors duration-200 ease-in-out"
      >
        LOGOUT
      </button>
    </header>
  );
};
