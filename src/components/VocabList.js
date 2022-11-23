import { useSelector } from "react-redux";

import Vocabulary from "./Vocabulary";
import classes from "./VocabList.module.css";

const VocabularyList = () => {
  const items = useSelector((state) => state.items.words);
  let vocabulary = (
    <ul className={classes.list}>
      {items.map((element) => {
        return (
          <li key={element.word}>
            <Vocabulary item={element} />
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {items.length > 0 ? (
        vocabulary
      ) : (
        <div className={classes.empty}>
          <i>You have not added any vocabulary to flashcards!</i>
        </div>
      )}
    </>
  );
};
export default VocabularyList;
