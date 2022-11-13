import { useState } from "react";

import { IoVolumeMediumOutline } from "react-icons/io5";
import classes from "./StudyingWord.module.css";

const StudyingWord = (props) => {
  const [clicked, setClicked] = useState(false);

  const audio = new Audio(props.audio);
  const meaningToggleHandler = () => {
    setClicked((prevState) => !prevState);
  };

  const front = (
    <div onClick={meaningToggleHandler} className={classes.front}>
      <h2>{props.word}</h2>
      <span>{props.phonetic}</span>
    </div>
  );

  const back = (
    <div onClick={meaningToggleHandler} className={classes.back}>
      {props.note && (
        <div className={classes.meaning}>
          <span className={classes["meaning-title"]}>Your Note:</span>
          <span>{props.note}</span>
        </div>
      )}
      {props.meaning.map((meaning) => {
        return (
          <div className={classes.meaning}>
            <span className={classes["meaning-title"]}>{meaning[0]}:</span>
            <span>{meaning[1]}</span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className={classes["flashcards-item"]}>
      {!clicked && (
        <IoVolumeMediumOutline
          onClick={() => audio.play()}
          className={classes.audio}
        />
      )}
      {!clicked ? front : back}
    </div>
  );
};

export default StudyingWord;
