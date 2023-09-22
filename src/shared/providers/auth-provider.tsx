import { User } from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";
import { auth } from "../../configs/firebase";
import { getKey, removeKey, setKey } from "../utils";
import { LocalStorageKey } from "../constants";

interface AuthProviderProps {
  children: any;
}

interface AuthProviderContent {
  user: User | null;
  setUser: any
  isLoggedIn: boolean
}

export const AuthContext = createContext<AuthProviderContent>({
  user: null,
  setUser: null,
  isLoggedIn: false
});

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(getKey(LocalStorageKey.AUTH));

  const isLoggedIn = !!user?.emailVerified

  useEffect(() => {
    auth.onAuthStateChanged(_user => {
      if (_user?.emailVerified){
        setKey(LocalStorageKey.AUTH, _user)
        setUser(_user)
      }
      else {
        setUser(null)
        removeKey(LocalStorageKey.AUTH)
      }
    })
  }, [])

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      isLoggedIn
    }),
    [user, isLoggedIn]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
