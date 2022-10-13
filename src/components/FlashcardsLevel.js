import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import StudyingWord from "./StudyingWord";
import { flashcardsActions } from "../app/flashcardsItems-slice";
import { updateFlashcardsData } from "../app/flashcardsData-actions";
import classes from "./FlashcardsLevel.module.css";
import Modal from "../UI/Modal";

const FlashcardsLevel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [id, setId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items.words);

  const sameLevelItems = items.filter(
    (i) => i.level === +params.level.split("")[6] - 1
  );
  useEffect(() => {
    const item = sameLevelItems.find(item => item.id === id);
    console.log(item);
    dispatch(updateFlashcardsData(item))
  }, [items]);

  useEffect(() => {
    activeIndex > 0 && setActiveIndex(activeIndex - 1);
  }, [sameLevelItems.length]);

  useEffect(() => {
    if (activeIndex === sameLevelItems.length) setShowModal(true);
  }, [activeIndex]);

  const correctAnswerHandler = (word) => {
    setId(word)
    dispatch(flashcardsActions.correct({ word }));
    setActiveIndex((prevState) => prevState + 1);
  };

  const wrongAnswerHandler = (word) => {
    setId(word)
    dispatch(flashcardsActions.wrong(word));
    items.findIndex((i) => i.id === word);
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
      <h2>{params.level}</h2>
      {sameLevelItems.length === 0 && activeIndex === 0 && (
        <div>There is no word in this level!</div>
      )}
      {sameLevelItems.length > 0 && activeIndex < sameLevelItems.length && (
        <div>
          <div className={classes["flashcards-content"]}>
            <StudyingWord
              key={sameLevelItems[activeIndex]["id"]}
              word={sameLevelItems[activeIndex]["id"]}
              phonetic={sameLevelItems[activeIndex]["phonetic"]}
              meaning={sameLevelItems[activeIndex]["meaning"]}
            />
          </div>
          <div className={classes["flashcard-actions"]}>
            <button
              onClick={() =>
                correctAnswerHandler(sameLevelItems[activeIndex]["id"])
              }
            >
              IK
            </button>
            <button
              onClick={() =>
                wrongAnswerHandler(sameLevelItems[activeIndex]["id"])
              }
            >
              IDK
            </button>
          </div>
        </div>
      )}
      {showModal &&
        activeIndex === sameLevelItems.length &&
        !!sameLevelItems.length > 0 && (
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
