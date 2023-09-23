import { useContext } from "react";
import { ThemeContext } from "./shared/providers/theme-provider";
import classnames from "classnames";
import {Router} from "./routes";

function App() {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div
      className={classnames("min-h-screen", {
        "bg-slate-800 ": isDarkTheme,
        "bg-light-theme": !isDarkTheme
      })}
    >
      <Router/>
    </div>
  );
}

export default App;
