import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const Overlay = (props) => {
  return (
    <div className={classes.overlay}>
      <header className={classes.header}>{props.title}</header>
      <div className={classes.content}>{props.message}</div>
      <footer className={classes.footer}>
        <div className={classes.action}>
          {props.secondOnClick && (
            <button
              className={classes["action-btn"]}
              onClick={props.secondOnClick}
            >
              {props.secondTextButton}
            </button>
          )}
          <button className={classes["confirm-btn"]} onClick={props.onClick}>
            {props.firstTextButton ? props.firstTextButton : "OK"}
          </button>
        </div>
      </footer>
    </div>
  );
};

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClick} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <Overlay
          onClick={props.onClick}
          title={props.title}
          message={props.message}
          secondOnClick={props.secondOnClick}
          secondTextButton={props.secondTextButton}
          firstTextButton={props.firstTextButton}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
export default Modal;
