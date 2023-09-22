import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import ThemeProvider from "./shared/providers/theme-provider";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./shared/providers/auth-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </ThemeProvider>
  // <React.StrictMode>
  // </React.StrictMode>
);
