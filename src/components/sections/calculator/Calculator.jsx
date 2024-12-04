import classes from "./Calculator.module.scss";
import { ReactComponent as EnvelopeImg } from "./../../../assets/box/envelope.svg";
import { ReactComponent as BoxImg } from "./../../../assets/box/box.svg";
import { ReactComponent as BoxPalletImg } from "./../../../assets/box/boxes-pallet.svg";
import { ReactComponent as MarkerImg } from "./../../../assets/layout/map-marker.svg";
import { useState, useRef } from "react";
import useIntersection from "../../hooks/use-intersection";
import Button from "../../../ui/Button";
import Tags from "../../../ui/Tags";
import Input from "../../../ui/Input";
import Wrap from "../../layout/Wrap";
import Select from "../../../ui/Select";
import Modal from "../../../ui/Modal";
import { useValidation } from "../../hooks/use-validation";
import { AnimatePresence } from "framer-motion";

const Calculator = () => {
  const [dispatchCity, setDispatchCity] = useState("");
  const [destinationCity, setDestinationCity] = useState("");
  const [parcelSize, setParcelSize] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deliveryFormData, setDeliveryFormData] = useState("");
  const [requestIsSended, setRequestIsSended] = useState(false);
  const sectionRef = useRef();
  const isIntersecting = useIntersection(sectionRef);
  const tags = ["London", "New York", "Kyiv"];
  const selectData = [
    {
      title: "Envelope",
      size: "42x36x5 cm, up to 2 kg",
      description: "Small items: documents, jewelry, accessories",
      img: <EnvelopeImg />,
    },
    {
      title: "Box S",
      size: "33x25x15 cm, up to 5 kg",
      description: "A little more than a shoebox",
      img: <BoxImg />,
    },
    {
      title: "Box M",
      size: "31x25x38 cm, up to 12 kg",
      description: "Like a microwave box",
      img: <BoxImg />,
    },

    {
      title: "Box L",
      size: "60x35x30 cm, up to 18 kg",
      description: "For equipment, spare parts, tools",
      img: <BoxImg />,
    },
    {
      title: "Pallet",
      size: "120x120x80 cm, up to 200 kg",
      description: "Large cargo: large household appliances, home library",
      img: <BoxPalletImg />,
    },
  ];
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailState, validateEmail] = useValidation("email");
  const { isValid: emailIsValid, errorMessage: emailErrorMessage } = emailState;

  const validateEmailOnChange = (value) => {
    validateEmail(value);
  };
  const showEmailErrorHandler = (value) => {
    validateEmail(value);
    setShowEmailError(true);
  };

  const onDispatchCityChangeHandler = (e) => {
    setDispatchCity(e.target.value);
  };
  const onDestinationCityChangeHandler = (e) => {
    setDestinationCity(e.target.value);
  };
  const onParcelSizeChangeHandler = (size) => {
    setParcelSize(size);
  };

  const onTagDispatch = (e) => {
    const city = e.target.dataset.city;
    if (!city) {
      return;
    }
    setDispatchCity(city);
  };

  const onTagDestination = (e) => {
    const city = e.target.dataset.city;
    if (!city) {
      return;
    }
    setDestinationCity(city);
  };

  const onCalculatorSubmit = (e) => {
    e.preventDefault();
    const deliveryData = {
      dispatchCity,
      destinationCity,
      parcelSize,
    };
    setModalIsOpen(true);
    setDeliveryFormData(deliveryData);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    if (email) {
      setRequestIsSended(true);
      // console.log(email);
      // console.log(deliveryFormData);
    }
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
    setRequestIsSended(false);
  };

  const calculatorForm = (
    <>
      <h3 className={classes["calculator__form-title"]}>
        Fill out the form to get a quote
      </h3>
      <form className={classes["calculator__form"]} onSubmit={onFormSubmit}>
        <Input
          type="email"
          placeholder="Email"
          className={`${classes["auth__input"]} ${
            showEmailError && !emailIsValid ? classes.invalid : ""
          }`}
          onBlur={showEmailErrorHandler}
          error={showEmailError && emailErrorMessage}
          autoFocus={true}
          onChange={validateEmailOnChange}
        />
        <Button type="submit">Get a quote</Button>
      </form>
    </>
  );

  const successful = (
    <div className={classes["calculator__successful"]}>
      Thank you! <span>We will call you back within 5 minutes</span>
    </div>
  );

  return (
    <section ref={sectionRef} className={classes["calculator-section"]}>
      <Wrap className={classes["calculator-wrap"]}>
        <div
          className={`${classes["calculator-container"]} ${
            isIntersecting ? classes["calculator-container--animate"] : ""
          }`}
        >
          <h2 className={classes["calculator-section__title"]}>
            Calculate shipping
          </h2>
          <form onSubmit={onCalculatorSubmit} className={classes["calculator"]}>
            <div>
              <div className={classes["calculator__field"]}>
                <Input
                  className={classes["calculator__input"]}
                  type="text"
                  placeholder="Dispatch city"
                  onChange={onDispatchCityChangeHandler}
                  value={dispatchCity}
                />
                <MarkerImg className={classes["calculator__input-img"]} />
              </div>
              <Tags tagList={tags} onClick={onTagDispatch} />
              <fieldset className={classes["calculator__options"]}>
                <input type="radio" name="delivery-type" id="1" />
                <label
                  className={classes["calculator__options-label"]}
                  htmlFor="1"
                >
                  From the door
                </label>
                <input type="radio" name="delivery-type" id="2" />
                <label
                  className={classes["calculator__options-label"]}
                  htmlFor="2"
                >
                  From stock
                </label>
              </fieldset>
            </div>
            <div>
              <div className={classes["calculator__field"]}>
                <Input
                  className={classes["calculator__input"]}
                  type="text"
                  placeholder="Destination city"
                  onChange={onDestinationCityChangeHandler}
                  value={destinationCity}
                />
                <MarkerImg className={classes["calculator__input-img"]} />
              </div>
              <Tags tagList={tags} onClick={onTagDestination} />
              <fieldset className={classes["calculator__options"]}>
                <input type="radio" name="delivery-type2" id="4" />
                <label
                  className={classes["calculator__options-label"]}
                  htmlFor="4"
                >
                  To the door
                </label>
                <input type="radio" name="delivery-type2" id="5" />
                <label
                  className={classes["calculator__options-label"]}
                  htmlFor="5"
                >
                  To pickup point
                </label>
              </fieldset>
            </div>

            <Select
              options={selectData}
              onChange={onParcelSizeChangeHandler}
              className={classes["calculator__select"]}
            />
            <Button className={classes["calculator__btn"]} type="submit">
              Calculate
            </Button>
          </form>
        </div>
      </Wrap>
      <AnimatePresence>
        {modalIsOpen && (
          <Modal onClose={closeModalHandler}>
            {!requestIsSended && calculatorForm}
            {requestIsSended && successful}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Calculator;
