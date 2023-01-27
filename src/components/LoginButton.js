import { useContext } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/Auth-context";
import classes from './LoginButton.module.css';
import {
  BiLogInCircle,
  BiLogOutCircle,
} from "react-icons/bi";

const LoginButton = () => {
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();
  const path = history.location.pathname;

  const logoutHandler = () => {
    AuthCtx.logout();
  };
  const logingHandler =() =>{
    history.push(`/sign-in?path=${path}`)
  }
  return (
    <>
      {AuthCtx.isLoggedIn ? (
        <button className={classes["sign-in"]} onClick={logoutHandler}>
          <span>Logout</span>
          <BiLogOutCircle className={classes["login-icon"]} />
        </button>
      ) : (
        <button className={classes["sign-in"]} onClick={logingHandler} >
          <span>Login</span>
          <BiLogInCircle className={classes["login-icon"]} />
        </button>
      )}
    </>
  );
};
export default LoginButton;
