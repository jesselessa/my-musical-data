import { useContext } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthProvider.jsx";

import { Navbar } from "../components/Navbar.jsx";

export const Layout = () => {
  const { userProfile } = useContext(AuthContext);
  return (
    <div className="flex h-screen">
      {/* Fixed navbar */}
      <Navbar userProfile={userProfile} />

      {/* Outlet acts as a placeholder where the child routes defined in the React Router configuration will be rendered */}
      <main className="min-h-full bg-[#181818] flex-1 text-white overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
