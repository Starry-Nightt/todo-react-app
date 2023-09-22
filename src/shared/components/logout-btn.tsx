import React, { useContext } from "react";
import useAuth from "../../modules/auth/use-auth";
import classNames from "classnames";
import { AuthContext } from "../providers/auth-provider";

interface LogoutBtnProps {
  className?: any;
}

function LogoutBtn({ className }: LogoutBtnProps) {
  const { signOutAccount } = useAuth();
  const { isLoggedIn } = useContext(AuthContext);

  const onSignOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await signOutAccount();
  };

  return (
    <>
      {isLoggedIn && (
        <button
          className={classNames(className, "btn btn-accent")}
          onClick={onSignOut}
        >
          Log out
        </button>
      )}
    </>
  );
}

export default LogoutBtn;
