import { useContext } from "react";
import TodoApp from "./modules/todo/todo";
import { ThemeContext } from "./shared/providers/theme-provider";
import classnames from "classnames";

function App() {
  const { isDarkTheme } = useContext(ThemeContext);

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
