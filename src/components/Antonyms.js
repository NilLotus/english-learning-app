import classes from './Antonyms.module.css';

const Antonyms = (props) => {
  const findDefinitionHandler = (e) => {
    const clickedWord = e.target.innerText;
    props.onClick(clickedWord);
  };

  const antonymsContent = (
    <ul className={classes.Antonyms}>
      {props.antonyms.map((ant) => {
        return <li className={classes.antonymsItem} key={ant} onClick={findDefinitionHandler}>{ant}</li>;
      })}
    </ul>
  );

  return (
    <>
      <h4 className={classes.title}>Antonyms</h4>
      {antonymsContent}
    </>
  );
};
export default Antonyms;
