import Antonyms from "./Antonyms";
import Definitions from "./Definitions";
import Synonyms from "./Synonyms";
import classes from './Meanings.module.css';

const Meanings = (props) => {
  let counter = 0;
  const meaningContent = (
    <ul className={classes.Definitions}>
      {props.wordMeanings.map((meaning) => {
        counter++;
        return (
          <li className={classes.meaningsItem} key={`${meaning.partOfSpeech}_${counter}`}>
            <h3>{meaning.partOfSpeech}</h3>
            <Definitions definitions={meaning.definitions} />
            {meaning.synonyms.length > 0 && (
              <Synonyms synonyms={meaning.synonyms} onClick={props.onClick} />
            )}
            {meaning.antonyms.length > 0 && (
              <Antonyms antonyms={meaning.antonyms} onClick={props.onClick} />
            )}
          </li>
        );
      })}
    </ul>
  );
  return <>{meaningContent}</>;
};
export default Meanings;
