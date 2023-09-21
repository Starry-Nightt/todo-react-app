import React, { useContext, useState } from "react";
import { LocalStorageKey, Theme } from "../constants";
import { MdDarkMode, MdSunny } from "react-icons/md";
import { ThemeContext } from "../providers/theme-provider";
import { setKey } from "../utils";

interface ThemeToggleProps {
  size: number;
}

function ThemeToggle({ size = 40 }: ThemeToggleProps) {
  const { setTheme, isDarkTheme, theme } = useContext(ThemeContext);

  const onToggleTheme = () => {
    if (theme === Theme.DARK) {
      setTheme(Theme.LIGHT);
      setKey(LocalStorageKey.THEME, Theme.LIGHT);
    } else {
      setTheme(Theme.DARK);
      setKey(LocalStorageKey.THEME, Theme.DARK);
    }
  };

  return (
    <>
      {!isDarkTheme ? (
        <MdSunny
          onClick={onToggleTheme}
          className="bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 text-black"
          size={size}
        />
      ) : (
        <MdDarkMode
          onClick={onToggleTheme}
          className="bg-gray-700 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 text-white"
          size={size}
        />
      )}
    </>
  );
}

export default ThemeToggle;
