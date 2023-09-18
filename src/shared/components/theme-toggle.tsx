import React from "react";
import { Theme } from "../constants";
import { MdDarkMode, MdSunny } from "react-icons/md";

interface ThemeToggleProps {
  value: Theme;
  onClick: any;
  size: number
}

function ThemeToggle({ value, onClick, size = 40 }: ThemeToggleProps) {
  const isDarkTheme = value === Theme.DARK ? true : false;

  return (
    <>
      {!isDarkTheme ? (
        <MdSunny
          onClick={onClick}
          className="bg-gray-300 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 text-black"
          size={size}
        />
      ) : (
        <MdDarkMode
          onClick={onClick}
          className="bg-gray-700 cursor-pointer dark:bg-gray-700 p-2 rounded-lg  bottom-5 right-5 text-white"
          size={size}
        />
      )}
    </>
  );
}

export default ThemeToggle;
