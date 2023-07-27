import classes from "./Contacts.module.scss";
import { ReactComponent as DeliveryImg } from "./../../../assets/delivery.svg";
import { ReactComponent as PhoneImg } from "./../../../assets/phone.svg";
import Titles from "../../../ui/Titles";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import { useState } from "react";
import AuthForm from "../../auth/AuthForm";
import Wrap from "../../layout/Wrap";

const Contacts = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModalHandler = () => {
    setModalIsOpen(true);
  };
  const closeModalHandler = () => {
    setModalIsOpen(false);
  };
  return (
    <section className={classes["contacts-section"]}>
      <Wrap>
        <div className={classes["container"]}>
          <div className={classes["contacts-content"]}>
            <Titles
              main="Sounds Like UNSTO Might Be The Right Choice For Your Business?"
              sub="Call Us"
              className=""
            />
            <div className={classes["contacts-content__text"]}>
              <p>
                Call to arrange a shipment, or leave a request through the site
              </p>
            </div>
            <div className={classes["contacts-content__phone"]}>
              <PhoneImg className={classes["contacts-content__phone-img"]} />
              <span>+7-777-777-77</span>
            </div>
            <Button
              className={classes["contacts-content__btn"]}
              onClick={openModalHandler}
            >
              Contact Us
            </Button>
          </div>
          <DeliveryImg className={classes["contacts-img"]} />
        </div>
        {modalIsOpen && (
          <Modal onClose={closeModalHandler}>
            <AuthForm />
          </Modal>
        )}
      </Wrap>
    </section>
  );
};

export default Contacts;
