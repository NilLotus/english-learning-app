import { useEffect, useState } from "react";
import { BsBookmarkPlus, BsBookmarkCheck } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import Audio from "./Audio";
import { flashcardsActions } from "../app/flashcardsItems-slice";
import {
  sendFlashcardsData,
} from "../app/flashcardsData-actions";
import Tooltip from "../UI/Tooltip";
import classes from "./Pronunciation.module.css";

const Pronunciation = (props) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items.words);

  const [clicked, setClicked] = useState(false);

  const addToFlashcardsHandler = () => {
    !clicked && setClicked(true);
    dispatch(
      flashcardsActions.add({
        word: props.word,
        view: 0,
        correct: 0,
        wrong: 0,
        id: props.word !== "" && props.word,
      })
    );

    const itemIndex = items.findIndex((item) => {
      return item.id === props.word;
    });

    if (itemIndex < 0) {
      dispatch(
        sendFlashcardsData({
          word: props.word,
          view: 0,
          correct: 0,
          wrong: 0,
          id: props.word !== "" && props.word,
        })
      );
    }
  };

  useEffect(() => {
    setClicked(false);
  }, [props.word]);

  return (
    <>
      <div className={classes["word-title"]}>
        <h2>{props.word}</h2>
        <button
          className={classes["add-word"]}
          onClick={addToFlashcardsHandler}
        >
          {clicked ? (
            <Tooltip title="Added">
              <BsBookmarkCheck className={classes.clicked} />
            </Tooltip>
          ) : (
            <Tooltip title="Add To Flashcards">
              <BsBookmarkPlus className={classes.add} />
            </Tooltip>
          )}
        </button>
      </div>
      <div className={classes.phonetic}>
        <span>{props.phonetics.join(" & ")}</span>
        <Audio pronunciations={props.pronunciations} />
      </div>
    </>
  );
};
export default Pronunciation;
