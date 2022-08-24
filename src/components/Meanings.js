import Antonyms from "./Antonyms";
import Definitions from "./Definitions";
import Synonyms from "./Synonyms";
import Card from '../UI/Card'
import classes from "./Meanings.module.css";

const Meanings = (props) => {
  const meaningContent = (
    <ul className={classes.Definitions}>
      {props.wordMeanings.map((meaning) => {
        const uniqueNumber = Math.random().toString();
        return (
          <Card key={`${meaning.partOfSpeech}_${uniqueNumber}`}>
            <li>
              <h3>{meaning.partOfSpeech}</h3>
              <Definitions definitions={meaning.definitions} />
              {meaning.synonyms.length > 0 && (
                <Synonyms synonyms={meaning.synonyms} onClick={props.onClick} />
              )}
              {meaning.antonyms.length > 0 && (
                <Antonyms antonyms={meaning.antonyms} onClick={props.onClick} />
              )}
            </li>
          </Card>
        );
      })}
    </ul>
  );
  return <>{meaningContent}</>;
};
export default Meanings;
