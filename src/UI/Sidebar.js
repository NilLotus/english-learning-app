import { NavLink } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
import { FaSwatchbook } from "react-icons/fa";
import { ImBook } from "react-icons/im";
// import {IoHomeOutline,IoReaderOutline } from "react-icons/io5";
// import { MdPostAdd } from "react-icons/md";

import LoginButton from "../components/LoginButton";
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <nav className={classes.sidebar}>
      <ul className={classes["menu-items"]}>
        {/* <NavLink to="/home">
          <li>
            <IoHomeOutline />
            <span>Home</span>
          </li>
        </NavLink> */}
        <li>
        <NavLink activeClassName={classes.active} to="/dictionary">
            <ImBook />
            <span>Dictionary</span>
          </NavLink>
        </li>
        <li>
        <NavLink activeClassName={classes.active} to="/flashcards">
            <FaSwatchbook />
            <span>Flashcards</span>
          </NavLink>
        </li>

        <li>
        <NavLink activeClassName={classes.active} to="/stories">
            <IoBookOutline />
            <span>Stories</span>
          </NavLink>
        </li>
        {/* <NavLink to="/notes">
          <li>
            <IoReaderOutline />
            <span>Notes</span>
          </li>
        </NavLink>
        <NavLink to="/new-note">
          <li>
            <MdPostAdd />
            <span>Add Note</span>
          </li>
        </NavLink> */}
      </ul>
      <LoginButton />
    </nav>
  );
};
export default Sidebar;
