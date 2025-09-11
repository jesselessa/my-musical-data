import { useContext } from "react";
import { AuthContext } from "../contexts/authProvider";
import user from "../assets/user.png";

export const Header = ({ userProfile }) => {
  const { logout } = useContext(AuthContext);

  return (
    <header className="flex flex-col justify-center items-center gap-5">
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
      <a
        href={userProfile?.external_urls?.spotify}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className="text-5xl text-white font-semibold">
          {userProfile?.display_name}
        </h2>
      </a>

      {/* Stats */}
      <div className="flex justify-center items-center gap-5">
        <div className="flex flex-col justify-center items-center gap-2">
          {userProfile?.followers?.total?.length === 0 ? (
            <span>0</span>
          ) : (
            <span>{userProfile?.followers?.total.toString()}</span>
          )}
          <span>FOLLOWERS</span>
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          {userProfile?.followers?.total?.length === 0 ? (
            <span>0</span>
          ) : (
            <span>{userProfile?.followers?.total.toString()}</span>
          )}
          <span>FOLLOWING</span> {/* Change endpoint for following */}
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          {userProfile?.followers?.total?.length === 0 ? (
            <span>0</span>
          ) : (
            <span>{userProfile?.followers?.total.toString() || 28}</span>
          )}
          <span>PLAYLISTS</span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="font-semibold rounded-3xl border-2 border-white py-2.5 px-7 mt-6 cursor-pointer :hover-bg-white :hover-text-[#2c8f73]"
      >
        LOGOUT
      </button>
    </header>
  );
};
