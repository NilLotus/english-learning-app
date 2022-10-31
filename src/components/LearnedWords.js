import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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
        <a>
        {i.word}
        </a>
      </li>
    );
  });

  const empty = (
    <div>
      There is no word to complete all of the levels, so this tab is empty.
    </div>
  );

  return (
    <ul className={classes["learned-words-content"]}>
      {newItems.length > 0 ? hasContent : empty}
    </ul>
  );
};
export default LearnedWords;
