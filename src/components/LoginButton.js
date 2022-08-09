import { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../store/Auth-context";
import classes from './LoginButton.module.css';
import {
  IoLogInOutline,
  IoLogOutOutline,
} from "react-icons/io5";

const LoginButton = () => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  const path = history.location.pathname;

  const logoutHandler = () => {
    AuthCtx.logout();
  };
  return (
    <>
      {AuthCtx.isLoggedIn ? (
        <button className={classes["sign-in"]} onClick={logoutHandler}>
          <span>Logout</span>
          <IoLogInOutline className={classes["login-icon"]} />
        </button>
      ) : (
        <Link className={classes["sign-in"]} to={`/sign-in?path=${path}`}>
          <span>Login</span>
          <IoLogOutOutline className={classes["login-icon"]} />
        </Link>
      )}
    </>
  );
};
export default LoginButton;
