import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiX } from "react-icons/hi";
import { HiOutlineCheck } from "react-icons/hi";

import Guide from "./Guide";
import classes from "./LevelList.module.css";

const LevelList = () => {
  const studyLevels = [0, 1, 2, 3, 4];
  const items = useSelector((state) => state.items.words);

  const content = studyLevels.map((i) => {
    const quantity = items.filter(
      (item) => Math.floor(item.level) === i
    ).length;
    return (
      <Link
        className={classes.level}
        to={`/flashcards/practice/level-${i + 1}`}
        key={i}
      >
        <div className={classes.title}>{`Level ${i + 1}`}</div>
        <div className={classes.quantity}>
          ( <span className={classes.number}>{quantity}</span> words )
        </div>
      </Link>
    );
  });

  const drawerContent = (
    <ul>
      <li>
        This tab is the main component of flashcards. According to your review,
        all flashcard items will fall into one of these five categories.
      </li>
      <li>
        When you add an item to a flashcard (via the dictionary page), it is
        automatically added to level one.
      </li>
      <li>
        You should start reviewing that word from level one. If you can't
        remember the meaning, just click on button <HiX />, and if you know the
        meaning, click on button <HiOutlineCheck />.
      </li>
      <li>If you learn a word and clik on <HiOutlineCheck/> button for two different times, it will advance to the next level</li>
      <li>If you can't remember the meaning and click on <HiX/> button, the word will fall back to previous level. (This is not the case with level one)</li>
    </ul>
  );

  return (
    <>
      {content}
      <Guide
        drawerHeader="How to work with flashcards"
        drawerContent={drawerContent}
      />
    </>
  );
};
export default LevelList;
