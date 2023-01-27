import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { IoCloseOutline } from "react-icons/io5";

import classes from "./Drawer.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const Overlay = (props) => {
  return (
    <div className={classes.drawer}>
      <div className={classes.header}>
        <div>{props.header}</div>
        <button className={classes["close-btn"]} onClick={props.onClick}>
          <IoCloseOutline />
        </button>
      </div>
      <div className={classes.content}>{props.content}</div>
    </div>
  );
};

const Drawer = (props) => {
  return (
    <>
      {props.show &&
        ReactDOM.createPortal(
          <Backdrop onClick={props.onClick} />,
          document.getElementById("backdrop-root")
        )}
      {ReactDOM.createPortal(
        <CSSTransition
          in={props.show}
          timeout={300}
          unmountOnExit
          classNames={{
            enter: `${classes["fade-enter"]}`,
            enterDone: `${classes["fade-enter-done"]}`,
            exit: `${classes["fade-exit"]}`,
            exitDone: `${classes["fade-exit-done"]}`,
          }}
        >
          <Overlay
            onClick={props.onClick}
            header={props.header}
            content={props.content}
          />
        </CSSTransition>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};
export default Drawer;
