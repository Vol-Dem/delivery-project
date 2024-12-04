import classes from "./Modal.module.scss";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

const Modal = (props) => {
  return (
    <>
      {createPortal(
        <>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
              exit: { opacity: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${classes.modal} ${classes["modal--backdrop"]}`}
            onClick={props.onClose}
          ></motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, y: "-30%", x: "-50%" },
              visible: { opacity: 1, y: "-50%", x: "-50%" },
              exit: { opacity: 0, y: "-30%", x: "-50%" },
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`${classes.modal} ${classes["modal--content"]}`}
          >
            {props.children}
            <div className={classes["modal__close"]} onClick={props.onClose}>
              <span className={classes["modal__cross"]}></span>
            </div>
          </motion.div>
        </>,
        document.body
      )}
    </>
  );
};

export default Modal;
