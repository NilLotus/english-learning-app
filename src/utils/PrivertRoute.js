import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/Auth-context";

const PrivateRoute = ({ children: Component, path, ...rest }) => {
  const AuthCtx = useContext(AuthContext);
  const auth = AuthCtx.isLoggedIn;

  AuthCtx.check();

  // if (token) {
  //   let tokenExpireTime = +localStorage.getItem("tokenExpireTime");
  //   let now = new Date().getTime();

  //   if (now > tokenExpireTime) {
  //     auth = false;
  //     AuthCtx.logout();
  //   } 
    // else {
    //   auth = true;
    // }
  // }
  //  else {
  //   auth = false;
  // }

  return auth ? (
    <Route {...rest} render={() => Component} />
  ) : (
    <Redirect to={`/sign-in?path=${path}`} />
  );
};

export default PrivateRoute;
