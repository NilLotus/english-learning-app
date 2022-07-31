import { useEffect, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import useHttp from "../hooks/httpHook";
import Meanings from "./Meanings";
import Pronunciation from "./Pronunciation";

const Dictionary = (props) => {
  const [enteredWord, setEnteredWord] = useState(null);
  
  const params = useParams();
  const location = useLocation();
  
  const inputValue = useRef();
  const { sendRequest, wordTitle, wordMeanings, phonetics, pronunciations, error } =
    useHttp();

  const onChangeHandler = (event) => {
    const enteredValue = event.target.value;
    setEnteredWord(enteredValue);
    if (enteredValue.length===0){
      return
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredWord === inputValue.current.value) {
        window.history.pushState(null, enteredWord, `/dictionary/${enteredWord}`)
        sendRequest(enteredWord);
      }
    }, 1000);

    if(enteredWord && inputValue.current.value===''){
      sendRequest(enteredWord)
      window.scrollTo(0, 0);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [enteredWord]);

  const setNewWordHandler = (word) =>{
    inputValue.current.value='';
    setEnteredWord(word);
  }

  useEffect(()=> {
    setEnteredWord(params.word);
  }, []);

 useEffect(() => {
    if(location.pathname.includes('/dictionary/')) {
      setEnteredWord(location.pathname.split('/').pop());
    }
  }, [location]);
  
  return (
    <div>
      <input type="text" onChange={onChangeHandler} ref={inputValue} />
      {wordMeanings.length > 0 && (
        <>
          <Pronunciation word={wordTitle} phonetics={phonetics} pronunciations={pronunciations} />
          <Meanings wordMeanings={wordMeanings} onClick={setNewWordHandler} />
        </>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};
export default Dictionary;
