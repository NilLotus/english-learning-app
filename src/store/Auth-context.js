import { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { flashcardsActions } from "../app/flashcardsItems-slice";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  email: "",
  signUp: () => {},
  login: (token, email) => {},
  logout: (token, email) => {},
  check: () => {},
});
export default AuthContext;

export const AuthContextProvider = (props) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    localStorage.getItem("token")
      ? setToken(localStorage.getItem("token")) &&
        setEmail(localStorage.getItem("email"))
      : setEmail(null) && setToken(null);
  }, []);

  let isLoggedIn = !!token;

  const signUpHandler = (idToken, email) => {
    setToken(idToken);
    setEmail(email);
    localStorage.setItem("Token", idToken);
    localStorage.setItem("tokenExpireTime", new Date().getTime() + 3600000);
    localStorage.setItem("userName", email);
  };
  const loginHandler = (idToken, email) => {
    setToken(idToken);
    setEmail(email);
    localStorage.setItem("token", idToken);
    localStorage.setItem("tokenExpireTime", new Date().getTime() + 3600000);
    localStorage.setItem("userName", email);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpireTime");
    localStorage.removeItem("userName");
    setToken(null);
    setEmail(null);
  };

  const checkLoggedIn = () => {
    return new Promise((resolve, reject) => {
      const tokenExpireTime = +localStorage.getItem("tokenExpireTime");
      const now = new Date().getTime();
      if (now > tokenExpireTime) {
        setToken(null);
        setEmail(null);
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpireTime");
        localStorage.removeItem("userName");
        dispatch(flashcardsActions.clear());
        reject("Token has expired!");
      } else {
        resolve();
      }
    });
  };
  const contextValue = {
    token,
    isLoggedIn,
    email,
    login: loginHandler,
    logout: logoutHandler,
    signUp: signUpHandler,
    check: checkLoggedIn,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
