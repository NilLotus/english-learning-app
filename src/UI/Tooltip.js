import classes from "./Tooltip.module.css";

const Tooltip = (props) => {
  return (
    <div className={`${classes.tooltip} ${props.className && props.className}`} onClick={props.onClick}>
      {props.children}
      <div className={classes["tooltip-text"]}>{props.title}</div>
    </div>
  );
};
export default Tooltip;
