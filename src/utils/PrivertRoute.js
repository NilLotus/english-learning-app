import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ children: Component, path, ...rest }) => {
  let auth = false;

  let token = localStorage.getItem("token");
  if (token) {
    let tokenExpireTime = +localStorage.getItem("tokenExpireTime");
    let now = new Date().getTime();

    if (now > tokenExpireTime) {
      auth = false;
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpireTime");
      localStorage.removeItem("userName");
    } else {
      auth = true;
    }
  } else {
    auth = false;
  }

  return auth ? (
    <Route {...rest} render={() => Component} />
  ) : (
    <Redirect to={`/sign-in?path=${path}`} />
  );
};

export default PrivateRoute;
