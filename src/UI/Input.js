import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={classes["form-control"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        className={props.hasError ? classes.invalid : null}
        value={props.inputValue}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      {props.showError && props.hasError && (
        <p className={classes.error}>{props.error}</p>
      )}
    </div>
  );
};
export default Input;
