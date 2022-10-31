import { useSelector } from "react-redux";

import Vocabulary from "./Vocabulary";
import classes from './VocabList.module.css';

const VocabularyList = () => {
  const items = useSelector((state) => state.items.words);
  let vocabulary = (
    <ul className={classes.list}>
      {items.map((element) => {
        return <li key={element.word}><Vocabulary item={element} /></li>;
      })}
    </ul>
  );

  return <div className={classes['vocabulary_list']}>{items.length > 0 && vocabulary}</div>;
};
export default VocabularyList;
