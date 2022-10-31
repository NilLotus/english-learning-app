import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  deleteFlashcardsItem,
  updateFlashcardsData,
} from "../app/flashcardsData-actions";
import { flashcardsActions } from "../app/flashcardsItems-slice";
import Tooltip from "../UI/Tooltip";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck } from "react-icons/md";
import classes from "./Vocabulary.module.css";

const Vocabulary = (props) => {
  const [isPicked, setIsPicked] = useState(false);
  const [note, setNote] = useState("");
  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    event.preventDefault();
    setNote(event.target.value);
  };

  const addNoteHandler = () => {
    if (isPicked) {
      setIsPicked(false);
      const newItem = { ...props.item };
      newItem.note = note;
      dispatch(updateFlashcardsData(newItem));
      dispatch(flashcardsActions.updateNote(newItem));
      setNote("");
    } else {
      setIsPicked(true);
    }
  };

  const removeWordHandler = () => {
    dispatch(flashcardsActions.remove("sorry"));
    dispatch(deleteFlashcardsItem(props.item));
  };

  return (
    <div className={classes.container}>
      <div className={classes.title}>
        <h3 className={classes.word}>{props.item.word} </h3>
        {props.item.note && <i>( {props.item.note} )</i>}
      </div>
      <div className={classes["update-note"]}>
        <input
          onChange={inputChangeHandler}
          value={note}
          className={`${classes.input} ${isPicked ? classes.active : ""}`}
        />
        <button
          onClick={addNoteHandler}
          className={`${classes["add-btn"]} ${
            isPicked ? classes["confirm-btn"] : ""
          }`}
        >
          {isPicked ? (
            <Tooltip title="Confirm">
              <MdCheck />
            </Tooltip>
          ) : (
            <Tooltip title="Add Your Note">
              <AiOutlineEdit />
            </Tooltip>
          )}
        </button>
        <button onClick={removeWordHandler} className={classes["remove-btn"]}>
          <Tooltip title="Remove From List">
            <RiDeleteBin6Line />
          </Tooltip>
        </button>
      </div>
    </div>
  );
};
export default Vocabulary;
