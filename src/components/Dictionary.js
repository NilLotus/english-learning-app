import { useEffect, useRef, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { BsBookmarkPlus, BsBookmarkCheck } from "react-icons/bs";

import useHttp from "../hooks/httpHook";
import Meanings from "./Meanings";
import Pronunciation from "./Pronunciation";
import Guide from "./Guide";
import classes from "./Dictionary.module.css";

const Dictionary = (props) => {
  const [enteredWord, setEnteredWord] = useState(null);

  const params = useParams();

  const location = useLocation();
  const history = useHistory();

  const inputValue = useRef();
  const {
    sendRequest,
    wordTitle,
    wordMeanings,
    phonetics,
    pronunciations,
    error,
  } = useHttp();

  const onChangeHandler = (event) => {
    const enteredValue = event.target.value;
    setEnteredWord(enteredValue);
    if (enteredValue.length === 0) {
      return;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredWord === inputValue.current.value) {
        history.push(`/dictionary/${enteredWord}`);
        sendRequest(enteredWord);
      }
    }, 1000);

    if (enteredWord && inputValue.current.value === "") {
      sendRequest(enteredWord);
      window.scrollTo(0, 0);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [enteredWord]);

  const setNewWordHandler = (word) => {
    inputValue.current.value = "";
    setEnteredWord(word);
    history.push(`/dictionary/${word}`);
  };

  useEffect(() => {
    setEnteredWord(params.word);
  }, [params.word]);

  useEffect(() => {
    if (location.pathname.includes("/dictionary/")) {
      setEnteredWord(location.pathname.split("/").pop());
    }
  }, [location]);

  const searchHandler = () => {
    setEnteredWord(inputValue);
  };
  const drawerContent = (
    <ol>
      <li>
      To add an item to flashcards, you must first log in to the application, as flashcards items are unique to each user.
      </li>
      <li>
      After searching for a word definition, the main word appears in a large and bold font. Click on <BsBookmarkPlus /> icon
      </li>
      <li>
        When the icon changes to this <BsBookmarkCheck />, it indicates that you have successfully added this item to your flashcard records.
      </li>
    </ol>
  );
  return (
    <>
      <div className={classes.navbar}>
        <div className={classes["input-wrapper"]}>
          <input
            className={classes.input}
            type="text"
            onChange={onChangeHandler}
            ref={inputValue}
          />
          <button onClick={searchHandler} className={classes["search-btn"]}>
            <IoSearchOutline className={classes["search-icon"]} />
          </button>
        </div>
      </div>
      <Guide
        drawerHeader="Add new words to flashcards"
        drawerContent={drawerContent}
      />
      {wordMeanings.length > 0 && (
        <>
          <Pronunciation
            word={wordTitle}
            phonetics={phonetics}
            pronunciations={pronunciations}
            wordMeanings={wordMeanings}
          />
          <Meanings wordMeanings={wordMeanings} onClick={setNewWordHandler} />
        </>
      )}
      {error && <p>{error}</p>}
    </>
  );
};
export default Dictionary;
