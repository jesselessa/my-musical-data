import { useContext } from "react";
import { Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthProvider.jsx";

import { Navbar } from "../components/Navbar.jsx";

export const Layout = () => {
  const { userProfile } = useContext(AuthContext);
  return (
    <div className="h-screen flex flex-col md:flex-row">
      <Navbar userProfile={userProfile} />

      {/* Outlet acts as a placeholder where the child routes defined in the React Router configuration will be rendered */}
      <main className="h-screen flex-1 flex flex-col bg-[#181818] text-white overflow-auto p-12">
        <Outlet />
      </main>
    </div>
  );
};
