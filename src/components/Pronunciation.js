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
import Modal from "../UI/Modal";

const Pronunciation = (props) => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();

  const items = useSelector((state) => state.items.words);
  const [clicked, setClicked] = useState(false);

  const addToFlashcardsHandler = () => {
    !clicked && setClicked(true);
    if (AuthCtx.check()) {
      const itemIndex = items.findIndex((item) => {
        return item.word === props.word;
      });

      if (itemIndex < 0) {
        dispatch(
          sendFlashcardsData({
            word: props.word,
            note: "",
            level: 0,
            correct: 0,
            wrong: 0,
            view: 0,
            audio: props.pronunciations[0],
            phonetic: props.phonetics[0],
            meaning: props.wordMeanings.map((i) => [
              i.partOfSpeech,
              i.definitions[0]["definition"],
            ]),
          })
        );
      } else {
        setShowModal(true);
      }
    } else {
      const location = history.location.pathname;
      history.push("/sign-in?path=" + location);
    }
  };
  const closeModalHandler = () => {
    setShowModal(false);
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
      {showModal && (
        <Modal
          onClick={closeModalHandler}
          title="Repetitive Item"
          message="This word already exists in flashcards"
        />
      )}
    </>
  );
};
export default Pronunciation;
