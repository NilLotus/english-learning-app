import { Link } from "react-router-dom";
import { IoHomeOutline, IoBookOutline, IoReaderOutline } from "react-icons/io5";
import { FaSwatchbook } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { ImBook } from "react-icons/im";

import classes from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <nav className={classes.sidebar}>
      <ul>
        <Link to="/">
          <li>
            <IoHomeOutline />
            <span>Home</span>
          </li>
        </Link>
        <Link to="/dictionary">
          <li>
            <ImBook />
            <span>Dictionary</span>
          </li>
        </Link>
        <Link to="/flashcard">
          <li>
            <FaSwatchbook />
            <span>Flashcards</span>
          </li>
        </Link>
        <Link to="/stories">
          <li>
            <IoBookOutline />
            <span>Stories</span>
          </li>
        </Link>
        <Link to="/notes">
          <li>
            <IoReaderOutline/><span>Notes</span></li>
        </Link>
        <Link to="/new-note">
          <li><MdPostAdd/><span>Add Note</span></li>
        </Link>
      </ul>
    </nav>
  );
};
export default Sidebar;
