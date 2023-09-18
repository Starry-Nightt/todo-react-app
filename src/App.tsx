import { Suspense, useContext } from "react";
import TodoApp from "./modules/todo/todo";
import { ThemeContext } from "./shared/providers/theme-provider";
import classnames from "classnames";
import { Theme } from "./shared/constants";
import Loading from "./shared/components/loading";

function App() {
  const { theme} = useContext(ThemeContext);

  const isDarkTheme = theme !== Theme.DARK ? true : false;

  return (
    <div
      className={classnames("min-h-screen bg-primary", {
        "dark-theme": isDarkTheme,
        "light-theme": !isDarkTheme,
      })}
    >
      <TodoApp />
    </div>
  );
}

export default App;
