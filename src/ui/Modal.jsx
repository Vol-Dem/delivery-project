import classes from "./Modal.module.scss";

const Modal = (props) => {
  return (
    <>
      <div
        className={`${classes.modal} ${classes["modal--backdrop"]}`}
        onClick={props.onClose}
      ></div>
      <div className={`${classes.modal} ${classes["modal--content"]}`}>
        {props.children}
        <span
          className={classes["modal__close"]}
          onClick={props.onClose}
        ></span>
      </div>
    </>
  );
};

export default Modal;
