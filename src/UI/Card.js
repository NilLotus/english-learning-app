import classes from "./Card.module.css";

const Card = (props) => {
  const cardClass = classes.card;
  return (
    <div
    onClick={props.onClick}
      className={
        props.className ? `${cardClass} ${props.className}` : cardClass
      }
    >
      {props.children}
    </div>
  );
};

export default Card;
