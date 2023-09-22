import React, { useContext } from "react";
import { AuthContext } from "../shared/providers/auth-provider";
import { Navigate, Outlet, Route } from "react-router-dom";
import { Header } from "../shared/components";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth" />
  );
};

export default PrivateRoute;
