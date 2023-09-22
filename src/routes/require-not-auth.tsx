import { useContext } from "react";
import { AuthContext } from "../shared/providers/auth-provider";
import { Navigate, Outlet} from "react-router-dom";

const RequireNotAuth = ({ component: Component, ...rest }: any) => {
  const { isLoggedIn } = useContext(AuthContext);

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default RequireNotAuth;
