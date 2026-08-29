import classes from "./Calculator.module.scss";
import { ReactComponent as EnvelopeImg } from "./../../../assets/box/envelope.svg";
import { ReactComponent as BoxImg } from "./../../../assets/box/box.svg";
import { ReactComponent as BoxPalletImg } from "./../../../assets/box/boxes-pallet.svg";
import { ReactComponent as MarkerImg } from "./../../../assets/layout/map-marker.svg";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import useIntersection from "../../hooks/use-intersection";
import Button from "../../../ui/Button";
import Tags from "../../../ui/Tags";
import Input from "../../../ui/forms/Input";
import Wrap from "../../layout/Wrap";
import Select from "../../../ui/forms/Select";
import Modal from "../../../ui/Modal";
import { useValidation } from "../../hooks/use-validation";
import { AnimatePresence } from "framer-motion";
import ComboSelect from "../../../ui/forms/ComboSelect";
import {
  API_GEONAMES_COUNTRY_INFO_URL,
  API_GEONAMES_SEARCH_URL,
} from "../../../variables/constants";
import TermsPrivacyField from "../../forms/ui/TermsPrivacyField";

const visibleCitiesAmoun = 200;

const Calculator = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestIsSended, setRequestIsSended] = useState(false);
  const sectionRef = useRef();
  const isIntersecting = useIntersection(sectionRef);
  const tags = [
    { countryName: "United Kingdom", countryCode: "GB", isoNumeric: "826" },
    { countryName: "Germany", countryCode: "DE", isoNumeric: "276" },
    { countryName: "France", countryCode: "FR", isoNumeric: "250" },
  ];
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
  const [dispatchCitiesIsLoading, setDispatchCitiesIsIsLoading] =
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
        const resp = await fetch(
          `${API_GEONAMES_COUNTRY_INFO_URL}?username=${import.meta.env.VITE_GEONAMES_USERNAME}`
        );
        const data = await resp.json();
        setCountriesData(data.geonames);
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
          .slice(0, visibleCitiesAmoun);
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
          .slice(0, visibleCitiesAmoun);
  }, [
    selectedDestinationCountry,
    destinationCityQuery,
    citiesOfDestinationCountry,
  ]);

  const getCitiesInfo = useCallback(
    async (countryCode, setCities, setLoading) => {
      setLoading(true);
      const resp = await fetch(
        `${API_GEONAMES_SEARCH_URL}?country=${countryCode}&featureClass=P&maxRows=1000&username=${import.meta.env.VITE_GEONAMES_USERNAME}`
      );
      const data = await resp.json();
      setCities(data.geonames);
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
          setDispatchCitiesIsIsLoading
        );
      }
    } catch (err) {
      console.log(err.message);
      setDispatchCitiesIsIsLoading(false);
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
        <TermsPrivacyField />
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
            <div className={classes["calculator__direction"]}>FROM</div>
            <div>
              <div className={classes["calculator__field"]}>
                <ComboSelect
                  loading={countriesIsLoading}
                  placeholder="Dispatch country"
                  query={dispatchCountryQuery}
                  optionsData={filteredCountry}
                  setQuery={setDispatchCountryQuery}
                  selected={selectedDispatchCountry}
                  setSelected={selectDispatchCountryHandler}
                />
                <MarkerImg className={classes["calculator__input-img"]} />
              </div>
              <Tags tagList={tags} onClick={onTagDispatch} />
            </div>
            <div>
              <div className={classes["calculator__field"]}>
                <ComboSelect
                  disabled={!Object.keys(selectedDispatchCountry).length}
                  loading={dispatchCitiesIsLoading}
                  placeholder="Dispatch city"
                  query={dispatchCityQuery}
                  optionsData={filteredDispatchCity}
                  setQuery={setDispatchCityQuery}
                  selected={selectedDispatchCity}
                  setSelected={setSelectedDispatchCity}
                />
                <MarkerImg className={classes["calculator__input-img"]} />
              </div>
            </div>

            <Select
              options={selectData}
              className={classes["calculator__select"]}
            />
            <div className={classes["calculator__direction"]}>TO</div>
            <div>
              <div className={classes["calculator__field"]}>
                <ComboSelect
                  loading={countriesIsLoading}
                  placeholder="Destination country"
                  query={destinationCountryQuery}
                  optionsData={filteredCountry}
                  setQuery={setDestinationCountryQuery}
                  selected={selectedDestinationCountry}
                  setSelected={selectDestinationCountryHandler}
                />
                <MarkerImg className={classes["calculator__input-img"]} />
              </div>
              <Tags tagList={tags} onClick={onTagDestination} />
            </div>

            <div className={classes["calculator__field"]}>
              <ComboSelect
                disabled={!Object.keys(selectedDestinationCountry).length}
                loading={destinationCitiesIsLoading}
                placeholder="Destination city"
                query={destinationCityQuery}
                optionsData={filteredDestinationCity}
                setQuery={setDestinationCityQuery}
                selected={selectedDestinationCity}
                setSelected={setSelectedDestinationCity}
              />
              <MarkerImg className={classes["calculator__input-img"]} />
            </div>
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
