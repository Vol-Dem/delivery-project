import classes from "./Calculator.module.scss";
import { ReactComponent as EnvelopeImg } from "./../../../assets/box/envelope.svg";
import { ReactComponent as BoxImg } from "./../../../assets/box/box.svg";
import { ReactComponent as BoxPalletImg } from "./../../../assets/box/boxes-pallet.svg";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import useIntersection from "../../hooks/use-intersection";
import Button from "../../../ui/Button";
import Wrap from "../../layout/Wrap";
import Select from "../../../ui/forms/Select";
import Modal from "../../../ui/Modal";
import { useValidation } from "../../hooks/use-validation";
import { AnimatePresence } from "framer-motion";
import { getCities, getCountries } from "../../../api/geonames";
import { DestinationFields, DispatchFields } from "./CalculatorFields";
import QuoteRequestForm from "./QuoteRequestForm";

const visibleCitiesAmount = 200;

const popularCountries = [
  { countryName: "United Kingdom", countryCode: "GB", isoNumeric: "826" },
  { countryName: "Germany", countryCode: "DE", isoNumeric: "276" },
  { countryName: "France", countryCode: "FR", isoNumeric: "250" },
];

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestIsSended, setRequestIsSended] = useState(false);
  const sectionRef = useRef();
  const isIntersecting = useIntersection(sectionRef);
  const [showEmailError, setShowEmailError] = useState(false);
  const [emailState, validateEmail] = useValidation("email");
  const { errorMessage: emailErrorMessage } = emailState;
  const [dispatchCountryQuery, setDispatchCountryQuery] = useState("");
  const [dispatchCityQuery, setDispatchCityQuery] = useState("");
  const [selectedDispatchCountry, setSelectedDispatchCountry] = useState({});
  const [selectedDispatchCity, setSelectedDispatchCity] = useState({});
  const [destinationCountryQuery, setDestinationCountryQuery] = useState("");
  const [destinationCityQuery, setDestinationCityQuery] = useState("");
  const [selectedDestinationCountry, setSelectedDestinationCountry] = useState(
    {}
  );
  const [selectedDestinationCity, setSelectedDestinationCity] = useState({});

  const [countriesIsLoading, setCountriesIsLoading] = useState(false);
  const [dispatchCitiesIsLoading, setDispatchCitiesIsLoading] =
    useState(false);
  const [destinationCitiesIsLoading, setDestinationCitiesIsLoading] =
    useState(false);
  const [countriesData, setCountriesData] = useState([]);
  const [citiesOfDispatchCountry, setCitiesOfDispatchCountry] = useState([]);
  const [citiesOfDestinationCountry, setCitiesOfDestinationCountry] = useState(
    []
  );

  useEffect(() => {
    const getInfo = async () => {
      try {
        setCountriesIsLoading(true);
        const countries = await getCountries();
        setCountriesData(countries);
        setCountriesIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setCountriesIsLoading(false);
      }
    };
    getInfo();
  }, []);

  const filteredCountry = useMemo(() => {
    return dispatchCountryQuery === ""
      ? countriesData
      : countriesData.filter((country) => {
          return country.countryName
            .toLowerCase()
            .includes(dispatchCountryQuery.toLowerCase());
        });
  }, [dispatchCountryQuery, countriesData]);

  const filteredDispatchCity = useMemo(() => {
    return selectedDispatchCountry === ""
      ? []
      : citiesOfDispatchCountry
          .filter((city) => {
            return city.name
              .toLowerCase()
              .includes(dispatchCityQuery.toLowerCase());
          })
          .slice(0, visibleCitiesAmount);
  }, [selectedDispatchCountry, dispatchCityQuery, citiesOfDispatchCountry]);

  const filteredDestinationCity = useMemo(() => {
    return selectedDestinationCountry === ""
      ? []
      : citiesOfDestinationCountry
          .filter((city) => {
            return city.name
              .toLowerCase()
              .includes(destinationCityQuery.toLowerCase());
          })
          .slice(0, visibleCitiesAmount);
  }, [
    selectedDestinationCountry,
    destinationCityQuery,
    citiesOfDestinationCountry,
  ]);

  const getCitiesInfo = useCallback(
    async (countryCode, setCities, setLoading) => {
      setLoading(true);
      const cities = await getCities(countryCode);
      setCities(cities);
      setLoading(false);
    },
    []
  );

  useEffect(() => {
    try {
      if (selectedDispatchCountry?.countryCode) {
        getCitiesInfo(
          selectedDispatchCountry.countryCode,
          setCitiesOfDispatchCountry,
          setDispatchCitiesIsLoading
        );
      }
    } catch (err) {
      console.log(err.message);
      setDispatchCitiesIsLoading(false);
    }
  }, [selectedDispatchCountry, getCitiesInfo]);

  useEffect(() => {
    try {
      if (selectedDestinationCountry?.countryCode) {
        getCitiesInfo(
          selectedDestinationCountry.countryCode,
          setCitiesOfDestinationCountry,
          setDestinationCitiesIsLoading
        );
      }
    } catch (err) {
      console.log(err.message);
      setDestinationCitiesIsLoading(false);
    }
  }, [selectedDestinationCountry, getCitiesInfo]);

  const validateEmailOnChange = (value) => {
    validateEmail(value);
  };
  const showEmailErrorHandler = (value) => {
    validateEmail(value);
    setShowEmailError(true);
  };

  const onTagDispatch = (e) => {
    const countryName = e.target.dataset.tag;
    const countryCode = e.target.dataset.iso;
    const isoNumeric = e.target.dataset.id;
    if (!countryName) {
      return;
    }
    setDispatchCityQuery("");
    setSelectedDispatchCity({});
    setSelectedDispatchCountry({ countryName, countryCode, isoNumeric });
  };

  const onTagDestination = (e) => {
    const countryName = e.target.dataset.tag;
    const countryCode = e.target.dataset.iso;
    const isoNumeric = e.target.dataset.id;
    if (!countryName) {
      return;
    }

    setDestinationCityQuery("");
    setSelectedDestinationCity({});
    setSelectedDestinationCountry({ countryName, countryCode, isoNumeric });
  };

  const onCalculatorSubmit = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    if (email) {
      setRequestIsSended(true);
    }
  };

  const closeModalHandler = () => {
    setModalIsOpen(false);
    setRequestIsSended(false);
  };

  const selectDispatchCountryHandler = (country) => {
    setDispatchCityQuery("");
    setSelectedDispatchCity({});
    setSelectedDispatchCountry(country);
  };

  const selectDestinationCountryHandler = (country) => {
    setDestinationCityQuery("");
    setSelectedDestinationCity({});
    setSelectedDestinationCountry(country);
  };

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
            <DispatchFields
              countriesIsLoading={countriesIsLoading}
              countryQuery={dispatchCountryQuery}
              countryOptions={filteredCountry}
              setCountryQuery={setDispatchCountryQuery}
              selectedCountry={selectedDispatchCountry}
              selectCountry={selectDispatchCountryHandler}
              popularCountries={popularCountries}
              selectPopularCountry={onTagDispatch}
              citiesIsLoading={dispatchCitiesIsLoading}
              cityQuery={dispatchCityQuery}
              cityOptions={filteredDispatchCity}
              setCityQuery={setDispatchCityQuery}
              selectedCity={selectedDispatchCity}
              selectCity={setSelectedDispatchCity}
            />

            <Select
              options={parcelOptions}
              className={classes["calculator__select"]}
            />
            <DestinationFields
              countriesIsLoading={countriesIsLoading}
              countryQuery={destinationCountryQuery}
              countryOptions={filteredCountry}
              setCountryQuery={setDestinationCountryQuery}
              selectedCountry={selectedDestinationCountry}
              selectCountry={selectDestinationCountryHandler}
              popularCountries={popularCountries}
              selectPopularCountry={onTagDestination}
              citiesIsLoading={destinationCitiesIsLoading}
              cityQuery={destinationCityQuery}
              cityOptions={filteredDestinationCity}
              setCityQuery={setDestinationCityQuery}
              selectedCity={selectedDestinationCity}
              selectCity={setSelectedDestinationCity}
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
            {!requestIsSended && (
              <QuoteRequestForm
                onSubmit={onFormSubmit}
                onEmailBlur={showEmailErrorHandler}
                onEmailChange={validateEmailOnChange}
                emailError={showEmailError && emailErrorMessage}
              />
            )}
            {requestIsSended && successful}
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Calculator;
