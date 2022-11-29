import { createContext, useEffect, useState } from "react";

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
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!!localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      setEmail(localStorage.getItem("email"));
      setIsLoggedIn(true);
    } else {
      setEmail(null);
      setToken(null);
    }
  }, []);

  const signUpHandler = (idToken, email) => {
    setToken(idToken);
    setEmail(email);
    setIsLoggedIn(true);
    localStorage.setItem("token", idToken);
    localStorage.setItem("tokenExpireTime", new Date().getTime() + 3600000);
    localStorage.setItem("userName", email);
  };
  const loginHandler = (idToken, email) => {
    setToken(idToken);
    setEmail(email);
    setIsLoggedIn(true);
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
    setIsLoggedIn(false);
  };

  const checkLoggedIn = () => {
    const tokenExpireTime = +localStorage.getItem("tokenExpireTime");
    const now = new Date().getTime();
    if (now > tokenExpireTime) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpireTime");
      localStorage.removeItem("userName");
      return false;
    } else {
      return true;
    }
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
