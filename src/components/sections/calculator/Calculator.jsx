import { useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ReactComponent as EnvelopeImg } from "./../../../assets/box/envelope.svg";
import { ReactComponent as BoxImg } from "./../../../assets/box/box.svg";
import { ReactComponent as BoxPalletImg } from "./../../../assets/box/boxes-pallet.svg";
import Button from "../../../ui/Button";
import Modal from "../../../ui/Modal";
import Select from "../../../ui/forms/Select";
import useIntersection from "../../hooks/use-intersection";
import Wrap from "../../layout/Wrap";
import { DestinationFields, DispatchFields } from "./CalculatorFields";
import classes from "./Calculator.module.scss";
import QuoteRequestForm from "./QuoteRequestForm";
import useCalculator from "./use-calculator";

const parcelOptions = [
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

const Calculator = () => {
  const sectionRef = useRef();
  const isIntersecting = useIntersection(sectionRef);
  const {
    countriesIsLoading,
    popularCountries,
    dispatch,
    destination,
    quote,
  } = useCalculator();

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
          <form onSubmit={quote.open} className={classes.calculator}>
            <DispatchFields
              countriesIsLoading={countriesIsLoading}
              countryQuery={dispatch.country.query}
              countryOptions={dispatch.country.options}
              setCountryQuery={dispatch.country.setQuery}
              selectedCountry={dispatch.country.selected}
              selectCountry={dispatch.country.select}
              popularCountries={popularCountries}
              selectPopularCountry={dispatch.country.selectPopular}
              citiesIsLoading={dispatch.city.isLoading}
              cityQuery={dispatch.city.query}
              cityOptions={dispatch.city.options}
              setCityQuery={dispatch.city.setQuery}
              selectedCity={dispatch.city.selected}
              selectCity={dispatch.city.select}
            />

            <Select
              options={parcelOptions}
              className={classes["calculator__select"]}
            />
            <DestinationFields
              countriesIsLoading={countriesIsLoading}
              countryQuery={destination.country.query}
              countryOptions={destination.country.options}
              setCountryQuery={destination.country.setQuery}
              selectedCountry={destination.country.selected}
              selectCountry={destination.country.select}
              popularCountries={popularCountries}
              selectPopularCountry={destination.country.selectPopular}
              citiesIsLoading={destination.city.isLoading}
              cityQuery={destination.city.query}
              cityOptions={destination.city.options}
              setCityQuery={destination.city.setQuery}
              selectedCity={destination.city.selected}
              selectCity={destination.city.select}
            />
            <Button className={classes["calculator__btn"]} type="submit">
              Calculate
            </Button>
          </form>
        </div>
      </Wrap>
      <AnimatePresence>
        {quote.isOpen && (
          <Modal ariaLabel="Shipping quote" onClose={quote.close}>
            {!quote.isSent && (
              <QuoteRequestForm
                onSubmit={quote.submit}
                onEmailBlur={quote.showEmailError}
                onEmailChange={quote.validateEmail}
                emailError={quote.emailError}
              />
            )}
            {quote.isSent && successful}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Calculator;
