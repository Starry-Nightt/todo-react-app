import { Suspense, useContext } from "react";
import TodoApp from "./modules/todo/todo";
import { ThemeContext } from "./shared/providers/theme-provider";
import classnames from "classnames";
import { Theme } from "./shared/constants";
import Loading from "./shared/components/loading";

function App() {
  const { theme, isDarkTheme} = useContext(ThemeContext);

  return (
    <div
      className={classnames("min-h-screen bg-primary", {
        "bg-slate-800 ": isDarkTheme,
      })}
    >
      <TodoApp />
    </div>
  );
}

export default App;
