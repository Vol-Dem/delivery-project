import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { motion } from "framer-motion";
import classes from "./Modal.module.scss";

const Modal = ({ ariaLabel, children, onClose }) => {
  return (
    <Dialog open aria-label={ariaLabel} onClose={onClose}>
      <DialogBackdrop
        as={motion.div}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1 },
          exit: { opacity: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`${classes.modal} ${classes["modal--backdrop"]}`}
      />
      <DialogPanel
        as={motion.div}
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
        {children}
        <button
          type="button"
          className={classes["modal__close"]}
          aria-label="Close dialog"
          onClick={onClose}
        >
          <span aria-hidden="true" className={classes["modal__cross"]} />
        </button>
      </DialogPanel>
    </Dialog>
  );
};

export default Modal;
