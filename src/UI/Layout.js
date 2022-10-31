import Sidebar from "./Sidebar";
import classes from "./Layout.module.css";
import LoginButton from "../components/LoginButton";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const Layout = (props) => {
  const [hideLogin, setHideLogin] = useState(false);
  const history = useHistory().location.pathname;
  
  useEffect(() => {
    if (history === "/sign-in") {
      setHideLogin(true);
    } else setHideLogin(false);
  }, []);

  return (
    <>
      <Sidebar />
      <section className={classes.content}>
        {!hideLogin && <LoginButton />}
        {props.children}
      </section>
    </>
  );
};
export default Layout;
