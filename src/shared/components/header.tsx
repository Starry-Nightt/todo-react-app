import React, { useContext } from "react";
import { AuthContext } from "../providers/auth-provider";
import LogoutBtn from "./logout-btn";
import { ThemeContext } from "../providers/theme-provider";
import classNames from "classnames";

function Header() {
  const { user } = useContext(AuthContext);
  const { isDarkTheme } = useContext(ThemeContext);
  return (
    <div
      className={classNames("navbar", {
        "bg-slate-900": isDarkTheme,
        "bg-blue-700": !isDarkTheme,
      })}
    >
      <div className="flex-1">
        <span className="normal-case text-white text-xl">{user?.email}</span>
      </div>
      <LogoutBtn />
    </div>
  );
}

export default Header;
