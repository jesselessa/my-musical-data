/*
 * ===      Header Component === 
 * Renders the page header and a logout button.
 * When the logout button is clicked, it clears the access token from local storage
 * and reloads the page to force a new login state.
 */

export const Header = () => {
  const handleLogout = () => {
    // Clear access token from localStorage and reload the page
    localStorage.removeItem("access_token");
    // Reload the page to force a re-render and trigger the login state
    window.location.href = "/";
  };

  return (
    <header className="flex flex-col md:flex-row items-center justify-between mb-8">
      <h1 className="text-4xl font-bold mb-4 md:mb-0">Spotify Profile</h1>
      <button
        onClick={handleLogout}
        className="bg-green-500 text-white py-2 px-4 rounded-full font-bold hover:bg-green-600 transition-colors"
      >
        Log out
      </button>
    </header>
  );
};
