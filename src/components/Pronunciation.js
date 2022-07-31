import Audio from "./Audio";
import classes from "./Pronunciation.module.css";

const Pronunciation = (props) => {
  return (
    <>
      <h2>{props.word}</h2>
      <div className={classes.phonetic}>
        <span>{props.phonetics.join(" & ")}</span>
        <Audio pronunciations={props.pronunciations} />
      </div>
    </>
  );
};
export default Pronunciation;
