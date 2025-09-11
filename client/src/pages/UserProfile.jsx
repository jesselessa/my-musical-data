import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider.jsx";
import { Header } from "../components/Header.jsx";

export const UserProfile = () => {
  const { userProfile } = useContext(AuthContext);

  return (
    <div className="flex flex-col justify-center">
      <Header userProfile={userProfile} />
    </div>
  );
};
