import classes from "./Contacts.module.scss";
import { ReactComponent as DeliveryImg } from "./../../../assets/delivery.svg";
import { ReactComponent as PhoneImg } from "./../../../assets/phone.svg";
import Titles from "../../../ui/Titles";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import { useState, useRef } from "react";
import useIntersection from "../../hooks/use-intersection";
// import AuthForm from "../../auth/AuthForm";
import Wrap from "../../layout/Wrap";
import ContactForm from "../../contact-form/ContactForm";
import { AnimatePresence } from "framer-motion";

const Contacts = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const sectionRef = useRef();
  const isIntersecting = useIntersection(sectionRef);

  const openModalHandler = () => {
    setModalIsOpen(true);
  };
  const closeModalHandler = () => {
    setModalIsOpen(false);
  };
  return (
    <section
      ref={sectionRef}
      id="section-contacts"
      className={classes["contacts-section"]}
    >
      <Wrap>
        <div className={classes["container"]}>
          <Titles
            main="Sounds Like UNSTO Might Be The Right Choice For Your Business?"
            sub="Call Us"
            className={`${classes["contacts__title"]} ${
              isIntersecting ? classes["contacts__title--animate"] : ""
            }`}
          />
          <DeliveryImg
            className={`${classes["contacts-img"]} ${
              isIntersecting ? classes["contacts-img--animate"] : ""
            }`}
          />
          <div className={`${classes["contacts-content"]}`}>
            <div
              className={`${classes["contacts-content__text"]} ${
                isIntersecting ? classes["contacts-content__text--animate"] : ""
              }`}
            >
              <p>
                Call to arrange a shipment, or leave a request through the site
              </p>
            </div>
            <div
              className={`${classes["contacts-content__phone"]} ${
                isIntersecting
                  ? classes["contacts-content__phone--animate"]
                  : ""
              }`}
            >
              <PhoneImg className={classes["contacts-content__phone-img"]} />
              <span>77-777-77-77</span>
            </div>
            <Button
              className={`${classes["contacts-content__btn"]} ${
                isIntersecting ? classes["contacts-content__btn--animate"] : ""
              }`}
              onClick={openModalHandler}
            >
              Contact Us
            </Button>
          </div>
        </div>
        <AnimatePresence>
          {modalIsOpen && (
            <Modal onClose={closeModalHandler}>
              <ContactForm />
            </Modal>
          )}
        </AnimatePresence>
      </Wrap>
    </section>
  );
};

export default Contacts;
