import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import classes from "./Modal.module.scss";

// Dialog has no modal={false} option, so keep its focus management while
// restoring the document styles changed by Headless UI's scroll lock.
const DocumentScrollUnlock = () => {
  const documentStyles = useRef();

  if (documentStyles.current === undefined && typeof document !== "undefined") {
    documentStyles.current = {
      overflow: document.documentElement.style.overflow,
      paddingRight: document.documentElement.style.paddingRight,
    };
  }

  useLayoutEffect(() => {
    if (!documentStyles.current) return undefined;

    const root = document.documentElement;
    const restoreDocumentStyles = () => {
      if (root.style.overflow !== documentStyles.current.overflow) {
        root.style.overflow = documentStyles.current.overflow;
      }

      if (root.style.paddingRight !== documentStyles.current.paddingRight) {
        root.style.paddingRight = documentStyles.current.paddingRight;
      }
    };
    const observer = new MutationObserver(restoreDocumentStyles);

    restoreDocumentStyles();
    observer.observe(root, { attributes: true, attributeFilter: ["style"] });

    return () => observer.disconnect();
  }, []);

  return null;
};

const Modal = ({ ariaLabel, children, onClose }) => {
  return (
    <Dialog
      open
      aria-label={ariaLabel}
      className={classes["modal-root"]}
      onClose={onClose}
    >
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
      <DocumentScrollUnlock />
    </Dialog>
  );
};

export default Modal;
