import { useState } from "react";

import classes from './StudyingWord.module.css'

const StudyingWord = (props) => {
  const [clicked, setClicked] = useState(false);

  let cartContent = (clicked && !!props.word ? props.meaning.map(meaning =>{
    return <div key={Math.floor(Math.random() * 10000)}>
      <span>{meaning[0]}: </span>
      <span>{meaning[1]}</span>
    </div>
  }) :
    <>
      <span>{props.word}</span>
      <span>{props.phonetic}</span>
    </>
  );
  
  const meaningToggleHandler = () => {
    setClicked((prevState) => !prevState);
  };

  return (
    <div className={classes['flashcards-item']} onClick={meaningToggleHandler}>
      {cartContent}
    </div>
  );
};

export default StudyingWord;
