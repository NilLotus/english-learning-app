import ReactDOM from "react-dom";

import Card from "./Card";
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
          <button onClick={props.onClick}>Ok</button>
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
        />,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
export default Modal;
