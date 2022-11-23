import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

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

  return <>{content}</>;
};
export default LevelList;
