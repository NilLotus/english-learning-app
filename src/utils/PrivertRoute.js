import { Redirect, Route } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../store/Auth-context";

const PrivateRoute = ({ children: Component, path, ...rest }) => {
  const AuthCtx = useContext(AuthContext);
  const auth = AuthCtx.isLoggedIn;

  AuthCtx.check();
  
  return auth ? (
    <Route {...rest} render={() => Component} />
  ) : (
    <Redirect to={`/sign-in?path=${path}`} />
  );
};

export default PrivateRoute;
