import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Guide from "./Guide";
import classes from "./LearnedWords.module.css";

const LearnedWords = () => {
  const items = useSelector((state) => state.items.words);
  const newItems = items.filter((item) => item.level > 4);
  const history = useHistory();

  const linkToDictionaryHandler = (word) => {
    history.push(`/dictionary/${word}`);
  };

  const hasContent = newItems.map((i) => {
    return (
      <li
        className={classes["word-box"]}
        key={i.word}
        onClick={() => linkToDictionaryHandler(i.word)}
      >
        <p>{i.word}</p>
      </li>
    );
  });

  const empty = (
    <div className={classes.empty}>
      <i>
        There is no word to complete all of the levels, so this tab is empty.
      </i>
    </div>
  );

  const drawerContent = (
    <>
      This page contains a list of words that you have recently learned. Items
      above level 5 will be placed here!
    </>
  );

  return (
    <>
      <Guide drawerHeader="Learned Words" drawerContent={drawerContent} />
      {newItems.length > 0 ? (
        <ul className={classes["learned-words-content"]}>{hasContent}</ul>
      ) : (
        empty
      )}
    </>
  );
};
export default LearnedWords;
