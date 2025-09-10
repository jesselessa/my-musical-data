/*
 * === UserProfileCard Component ===
 * Displays the user's profile information.
 * Receives the userProfile object as a prop and renders the display name, email,
 * profile picture, followers, and country.
 */

export const UserProfileCard = ({ userProfile }) => {
  const hasImage = userProfile.images && userProfile.images.length > 0;

  return (
    <div className="bg-[#333333] rounded-lg shadow-lg p-6">
      <div className="flex flex-col justify-center items-center mb-4 gap-2">
        {hasImage ? (
          <img
            src={userProfile.images[0].url}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-4 object-cover"
          />
        ) : (
          <div className="w-24 h-24 bg-[#4f4f4f] rounded-full flex items-center justify-center text-lg">
            No Photo
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold">{userProfile.display_name}</h2>
          <p className="text-gray-400">{userProfile.email}</p>
          <a
            href={userProfile.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            View on Spotify
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-[#4f4f4f] rounded-lg">
          <h3 className="text-xl font-bold mb-2">Followers</h3>
          <p className="text-3xl font-light">
            {userProfile.followers.total.toLocaleString()}
          </p>
        </div>
        <div className="p-4 bg-[#4f4f4f] rounded-lg">
          <h3 className="text-xl font-bold mb-2">Country</h3>
          <p className="text-3xl font-light">{userProfile.country}</p>
        </div>
      </div>
    </div>
  );
};
