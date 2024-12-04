import { useState, useRef } from "react";
import useIntersection from "../../hooks/use-intersection";
import Button from "../../../ui/Button";
import classes from "./Cta.module.scss";
import Modal from "../../../ui/Modal";
import AuthForm from "../../auth/AuthForm";
import { AnimatePresence } from "framer-motion";

const Cta = () => {
  const [authIsOpen, setAuthIsOpen] = useState(false);
  const sectionRef = useRef();
  const isIntersecting = useIntersection(sectionRef);

  const openAuthForm = () => {
    setAuthIsOpen(true);
  };
  const closeAuthForm = () => {
    setAuthIsOpen(false);
  };
  return (
    <section ref={sectionRef} className={classes["cta-sections"]}>
      <div
        className={`${classes["cta__container"]} ${
          isIntersecting ? classes["cta__container--animate"] : ""
        }`}
      >
        <div>
          <h2 className={classes["cta__title"]}>
            Need to send parcels regularly? <span>Create an account</span>
          </h2>
          <p className={classes["cta__text"]}>
            Send goods quickly, easily and conveniently without restrictions
          </p>
        </div>
        <Button className={classes["cta__btn"]} onClick={openAuthForm}>
          Sign up!
        </Button>
      </div>
      <AnimatePresence>
        {authIsOpen && (
          <Modal onClose={closeAuthForm}>
            <AuthForm />
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Cta;
