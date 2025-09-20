import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { useQuery } from "@tanstack/react-query";
import { user } from "../api/spotify.js";
import userPlaceholder from "../assets/user.png";

export const ProfileHeader = () => {
  const { userProfile, accessToken, logout } = useContext(AuthContext);

  // Set profile pic (image URL or placeholder)
  const profileImageUrl =
    userProfile?.images && userProfile.images?.length > 0
      ? userProfile.images[0].url
      : userPlaceholder;

  // Get list of followed artists ("Following")
  const {
    data: followingData,
    isPending: isFollowingPending,
    isError: isFollowingError,
    error: followingError,
  } = useQuery({
    queryKey: ["following", accessToken],
    queryFn: () => user.getFollowing(accessToken),
    enabled: !!accessToken,
  });

  // Get list of playlists
  const {
    data: playlistsData,
    isPending: isPlaylistsPending,
    isError: isPlaylistsError,
    error: playlistsError,
  } = useQuery({
    queryKey: ["playlists", accessToken],
    queryFn: () => user.getPlaylists(accessToken),
    enabled: !!accessToken,
  });

  //* "??" is called "nullish coalescing operator" (in French,'opérateur de fusion nulle') : it means if userProfile?.followers?.total is 'null' or 'undefined', followers number displays '0'

  // Display user stats with fallbacks
  const followersCount = userProfile?.followers?.total?.toString() ?? "0";
  const followingCount = followingData?.artists?.total?.toString() ?? "0";
  const playlistsCount = playlistsData?.total?.toString() ?? "0";

  // Global error handling
  if (isFollowingError || isPlaylistsError) {
    console.error("Errors fetching user data:", {
      followingError: followingError,
      playlistsError: playlistsError,
    });
  }

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
          View in Spotify
        </span>
      </a>

      {/* Stats */}
      <div className="flex justify-center items-center gap-5">
        <div className="flex flex-col justify-center items-center gap-2">
          <span className="text-[#1ed760] font-bold">{followersCount}</span>
          <span className="text-sm text-[#9b9b9b]">
            {followersCount === 1 ? "FOLLOWER" : "FOLLOWERS"}
          </span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <span className="text-lg text-[#1ed760] font-bold">
            {isFollowingPending
              ? "..."
              : isFollowingError
              ? "Error"
              : followingCount}
          </span>
          <span className="text-sm text-[#9b9b9b]">FOLLOWING</span>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <span className="text-lg text-[#1ed760] font-bold">
            {isPlaylistsPending
              ? "..."
              : isPlaylistsError
              ? "Error"
              : playlistsCount}
          </span>
          <span className="text-sm text-[#9b9b9b]">
            {playlistsCount === 1 ? "PLAYLIST" : "PLAYLISTS"}
          </span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="text-sm font-semibold tracking-[2px] rounded-3xl border-1 border-white py-2 px-7 mt-5 cursor-pointer hover:bg-white hover:text-[#121212] transition-colors duration-200 ease-in-out active:transform active:translate-y-[1px]"
      >
        LOGOUT
      </button>
    </header>
  );
};
