import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Guide from "./Guide";
import classes from "./DifficultWords.module.css";

const DifficultWords = () => {
  const items = useSelector((state) => state.items.words);
  const newItems = items.filter((item) => item.wrong > 3);
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
        There is no word that you have difficulty in memorizing. (Word with more
        than 5 times saying wrong!)
      </i>
    </div>
  );

  const drawerContent = (
    <>
        This page contains a list of elusive words that you can't recall or
        guess the meaning of after three attempts.
    </>
  );

  return (
    <>
      <Guide drawerHeader="Difficult Words" drawerContent={drawerContent} />
      {newItems.length > 0 ? (
        <ul className={classes["difficult-words-content"]}>{hasContent}</ul>
      ) : (
        empty
      )}
    </>
  );
};
export default DifficultWords;
