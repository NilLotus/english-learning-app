import { createContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isLoggedIn: false,
  signUp: () => {},
  login: (token, email) => {},
  logout: (token, email) => {},
});
export default AuthContext;

export const AuthContextProvider = (props) => {
  let initialToken = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : "";
  let initialEmail = localStorage.getItem("email")
    ? localStorage.getItem("email")
    : "";

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);

  const isLoggedIn = !!token;

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
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpireTime");
    localStorage.removeItem("userName");
  };
  const contextValue = {
    token,
    isLoggedIn,
    email,
    login: loginHandler,
    logout: logoutHandler,
    signUp: signUpHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
