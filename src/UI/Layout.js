import Sidebar from "./Sidebar";
import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <>
      <Sidebar />
      <section className={classes.content}>{props.children}</section>
    </>
  );
};
export default Layout;
