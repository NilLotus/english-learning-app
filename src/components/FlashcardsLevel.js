import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { HiOutlineCheck } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";

import Modal from "../UI/Modal";
import Tooltip from "../UI/Tooltip";
import StudyingWord from "./StudyingWord";
import { flashcardsActions } from "../app/flashcardsItems-slice";
import { updateFlashcardsData } from "../app/flashcardsData-actions";
import classes from "./FlashcardsLevel.module.css";

const FlashcardsLevel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [word, setWord] = useState(null);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items.words);

  const sameLevelItems = items.filter(
    (i) => Math.floor(i.level) === +params.level.split("")[6] - 1
  );

  useEffect(() => {
    activeIndex > 0 && setActiveIndex(activeIndex - 1);
  }, [sameLevelItems.length]);

  useEffect(() => {
    if (activeIndex === sameLevelItems.length) setShowModal(true);
  }, [activeIndex]);

  useEffect(() => {
    const item = items.find((item) => item.word === word);
    !!word && dispatch(updateFlashcardsData(item));
  }, [items]);

  const correctAnswerHandler = (word) => {
    setWord(word);
    dispatch(flashcardsActions.correct(word));
    setActiveIndex((prevState) => prevState + 1);
  };

  const wrongAnswerHandler = (word) => {
    setWord(word);
    dispatch(flashcardsActions.wrong(word));
    setActiveIndex((prevState) => prevState + 1);
  };

  const againReviewHandler = () => {
    setShowModal(false);
    setActiveIndex(0);
  };

  const backToLevelMenuHandler = () => {
    setShowModal(false);
    history.push("/flashcards/practice");
  };

  return (
    <>
      <div className={classes["page-title"]}>
        <Tooltip
          className={classes["back-btn"]}
          onClick={backToLevelMenuHandler}
          title="Back"
        >
          <IoArrowBack />
        </Tooltip>
        <h2>{params.level}</h2>
      </div>
      {sameLevelItems.length === 0 && activeIndex === 0 && (
        <div className={classes.empty}>There is no word in this level !</div>
      )}
      {sameLevelItems.length > 0 && activeIndex < sameLevelItems.length && (
        <div className={classes["flashcards-content"]}>
          <StudyingWord
            key={sameLevelItems[activeIndex]["word"]}
            word={sameLevelItems[activeIndex]["word"]}
            phonetic={sameLevelItems[activeIndex]["phonetic"]}
            note={sameLevelItems[activeIndex]["note"]}
            audio={sameLevelItems[activeIndex]["audio"]}
            meaning={sameLevelItems[activeIndex]["meaning"]}
          />
          <div className={classes["flashcard-actions"]}>
            <button
              onClick={() =>
                correctAnswerHandler(sameLevelItems[activeIndex]["word"])
              }
              className={classes.correct}
            >
              <HiOutlineCheck />
            </button>
            <button
              onClick={() =>
                wrongAnswerHandler(sameLevelItems[activeIndex]["word"])
              }
              className={classes.wrong}
            >
              <HiX />
            </button>
          </div>
        </div>
      )}
      {showModal &&
        activeIndex === sameLevelItems.length &&
        sameLevelItems.length > 0 && (
          <Modal
            onClick={againReviewHandler}
            title="Completed"
            message="Your first list review is compeletly done!"
            secondOnClick={backToLevelMenuHandler}
            firstTextButton="Review Again"
            secondTextButton="Return to level list"
          />
        )}
    </>
  );
};
export default FlashcardsLevel;
