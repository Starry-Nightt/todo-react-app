import { useContext } from "react";
import { AuthContext } from "../providers/auth-provider";
import LogoutBtn from "./logout-btn";

function Header() {
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="flex-1">
        <span className="normal-case  text-md md:text-xl text-white">
          {user?.email}
        </span>
      </div>
      <LogoutBtn />
    </div>
  );
}

export default Header;
