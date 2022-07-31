import { useRef } from "react";

import useHttp from "../hooks/httpHook";
import Pronunciation from "./Pronunciation";
import Meanings from "./Meanings";
import classes from "./Synonyms.module.css";

const Synonyms = (props) => {
  const findDefinitionHandler = (e) => {
    const clickedWord = e.target.innerText;
    props.onClick(clickedWord);
  };

  const synonymsContent = (
    <ul className={classes.Synonyms}>
      {props.synonyms.map((syn) => {
        return (
          <li
            className={classes.synonymsItem}
            key={syn}
            onClick={findDefinitionHandler}
          >
            {syn}
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      <h4 className={classes.title}>Synonyms</h4>
      {synonymsContent}
    </>
  );
};
export default Synonyms;
