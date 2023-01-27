import { useState } from "react";
import { IoIosHelpBuoy } from "react-icons/io";

import Drawer from "../UI/Drawer";
import classes from "./Guide.module.css";

const Guide = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer((prevState) => !prevState);
  };

  return (
    <>
      <Drawer
        show={showDrawer}
        onClick={toggleDrawer}
        header={props.drawerHeader}
        content={props.drawerContent}
      />
      <IoIosHelpBuoy className={classes.help} onClick={toggleDrawer} />
    </>
  );
};
export default Guide;
