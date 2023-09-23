import { Children, createContext, useMemo, useState } from "react";

interface LoggerProviderProps {
  children: any;
}

export interface LoggerContent {
  alert: string;
  setAlert: any;
}

export const LoggerContext = createContext<LoggerContent>({
  alert: "",
  setAlert: null,
});

function LoggerProvider({ children }: LoggerProviderProps) {
  const [alert, setAlert] = useState("");

  const contextValue = useMemo(
    () => ({
      alert,
      setAlert,
    }),
    [alert]
  );

  return (
    <LoggerContext.Provider value={contextValue}>
      {children}
    </LoggerContext.Provider>
  );
}

export default LoggerProvider;
