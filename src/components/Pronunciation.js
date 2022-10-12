import { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { BsBookmarkPlus, BsBookmarkCheck } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

import Audio from "./Audio";
import { flashcardsActions } from "../app/flashcardsItems-slice";
import { sendFlashcardsData } from "../app/flashcardsData-actions";
import AuthContext from "../store/Auth-context";
import Tooltip from "../UI/Tooltip";
import classes from "./Pronunciation.module.css";

const Pronunciation = (props) => {
  const dispatch = useDispatch();
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();

  const items = useSelector((state) => state.items.words);
  const [clicked, setClicked] = useState(false);

  const addToFlashcardsHandler = () => {
    !clicked && setClicked(true);
    AuthCtx.check()
      .then(() => {
        dispatch(
          flashcardsActions.add({
            word: props.word,
            level: 0,
            correct: 0,
            wrong: 0,
            view: 0,
            inactiveTime: null,
            id: props.word !== "" && props.word,
            phonetic: props.phonetics[0],
            meaning: props.wordMeanings.map((i) => [
              i.partOfSpeech,
              i.definitions[0]["definition"],
            ]),
          })
        );

        const itemIndex = items.findIndex((item) => {
          return item.id === props.word;
        });

        if (itemIndex < 0) {
          dispatch(
            sendFlashcardsData({
              word: props.word,
              level: 0,
              correct: 0,
              wrong: 0,
              view: 0,
              id: props.word !== "" && props.word,
              phonetic: props.phonetics[0],
              meaning: props.wordMeanings.map((i) => [
                i.partOfSpeech,
                i.definitions[0]["definition"],
              ]),
            })
          );
        }
      })
      .catch((e) => {
        const location = history.location.pathname;
        history.push("/sign-in?path=" + location);
        // TODO: show the reason and error
        console.log(e);
      });
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
          {clicked && AuthCtx.isLoggedIn ? (
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
