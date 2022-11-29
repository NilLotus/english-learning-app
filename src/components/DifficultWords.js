import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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

  return (
    <>
      {newItems.length > 0 ? (
        <ul className={classes["difficult-words-content"]}>{hasContent}</ul>
      ) : (
        empty
      )}
    </>
  );
};
export default DifficultWords;
