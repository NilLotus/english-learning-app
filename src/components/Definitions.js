import classes from './Definitions.module.css';

const Definitions = (props) => {
    let counter =0;
  const definitionsContent = (
    <ul className={classes.Definitions}>
      {props.definitions.map((def) => {
        counter++;
        return (
          <li className={classes.definitionsItem} key={def.definition}>
            <div className={classes.definition}>
              <span className={classes.counter}>{counter}.</span>
              <p>{def.definition}</p>
            </div>
            {def.example && <p className={classes.example}>{def.example}</p>}
          </li>
        );
      })}
    </ul>
  );
  return <>{definitionsContent}</>;
};
export default Definitions;
