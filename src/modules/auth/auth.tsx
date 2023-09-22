import React, { useState } from "react";
import Login from "./components/login";
import useAuth from "./use-auth";
import Register from "./components/register";

function Auth() {
  const { signInWithEmail, signInWithGoogle, signUpWithEmail } = useAuth();

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen">
      {isLogin ? (
        <Login
          signInWithEmail={signInWithEmail}
          signInWithGoogle={signInWithGoogle}
          setForm={setIsLogin}
        />
      ) : (
        <Register signUpWithEmail={signUpWithEmail} setForm={setIsLogin} />
      )}
    </div>
  );
}

export default Auth;
