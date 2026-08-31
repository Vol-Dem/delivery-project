import { useCallback, useEffect, useMemo, useState } from "react";
import { getCities, getCountries } from "../../../api/geonames";
import { useValidation } from "../../hooks/use-validation";

const visibleCitiesAmount = 200;

const popularCountries = [
  { countryName: "United Kingdom", countryCode: "GB", isoNumeric: "826" },
  { countryName: "Germany", countryCode: "DE", isoNumeric: "276" },
  { countryName: "France", countryCode: "FR", isoNumeric: "250" },
];

const useCalculator = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestIsSended, setRequestIsSended] = useState(false);
  const [emailErrorIsVisible, setEmailErrorIsVisible] = useState(false);
  const [emailState, validateEmail] = useValidation("email");
  const [dispatchCountryQuery, setDispatchCountryQuery] = useState("");
  const [dispatchCityQuery, setDispatchCityQuery] = useState("");
  const [selectedDispatchCountry, setSelectedDispatchCountry] = useState({});
  const [selectedDispatchCity, setSelectedDispatchCity] = useState({});
  const [destinationCountryQuery, setDestinationCountryQuery] = useState("");
  const [destinationCityQuery, setDestinationCityQuery] = useState("");
  const [selectedDestinationCountry, setSelectedDestinationCountry] = useState(
    {},
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
    [],
  );

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setCountriesIsLoading(true);
        const countries = await getCountries();
        setCountriesData(countries);
        setCountriesIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setCountriesIsLoading(false);
      }
    };

    loadCountries();
  }, []);

  const filteredCountries = useMemo(() => {
    return dispatchCountryQuery === ""
      ? countriesData
      : countriesData.filter((country) =>
          country.countryName
            .toLowerCase()
            .includes(dispatchCountryQuery.toLowerCase()),
        );
  }, [dispatchCountryQuery, countriesData]);

  const filteredDispatchCities = useMemo(() => {
    return selectedDispatchCountry === ""
      ? []
      : citiesOfDispatchCountry
          .filter((city) =>
            city.name.toLowerCase().includes(dispatchCityQuery.toLowerCase()),
          )
          .slice(0, visibleCitiesAmount);
  }, [selectedDispatchCountry, dispatchCityQuery, citiesOfDispatchCountry]);

  const filteredDestinationCities = useMemo(() => {
    return selectedDestinationCountry === ""
      ? []
      : citiesOfDestinationCountry
          .filter((city) =>
            city.name
              .toLowerCase()
              .includes(destinationCityQuery.toLowerCase()),
          )
          .slice(0, visibleCitiesAmount);
  }, [
    selectedDestinationCountry,
    destinationCityQuery,
    citiesOfDestinationCountry,
  ]);

  const loadCities = useCallback(async (countryCode, setCities, setLoading) => {
    setLoading(true);
    const cities = await getCities(countryCode);
    setCities(cities);
    setLoading(false);
  }, []);

  useEffect(() => {
    try {
      if (selectedDispatchCountry?.countryCode) {
        loadCities(
          selectedDispatchCountry.countryCode,
          setCitiesOfDispatchCountry,
          setDispatchCitiesIsLoading,
        );
      }
    } catch (error) {
      console.log(error.message);
      setDispatchCitiesIsLoading(false);
    }
  }, [selectedDispatchCountry, loadCities]);

  useEffect(() => {
    try {
      if (selectedDestinationCountry?.countryCode) {
        loadCities(
          selectedDestinationCountry.countryCode,
          setCitiesOfDestinationCountry,
          setDestinationCitiesIsLoading,
        );
      }
    } catch (error) {
      console.log(error.message);
      setDestinationCitiesIsLoading(false);
    }
  }, [selectedDestinationCountry, loadCities]);

  const selectDispatchCountry = (country) => {
    setDispatchCityQuery("");
    setSelectedDispatchCity({});
    setSelectedDispatchCountry(country);
  };

  const selectDestinationCountry = (country) => {
    setDestinationCityQuery("");
    setSelectedDestinationCity({});
    setSelectedDestinationCountry(country);
  };

  const selectPopularDispatchCountry = (event) => {
    const { tag: countryName, iso: countryCode, id: isoNumeric } =
      event.target.dataset;

    if (countryName) {
      selectDispatchCountry({ countryName, countryCode, isoNumeric });
    }
  };

  const selectPopularDestinationCountry = (event) => {
    const { tag: countryName, iso: countryCode, id: isoNumeric } =
      event.target.dataset;

    if (countryName) {
      selectDestinationCountry({ countryName, countryCode, isoNumeric });
    }
  };

  const openQuote = (event) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  const submitQuote = (event) => {
    event.preventDefault();
    const email = event.target[0].value;

    if (email) {
      setRequestIsSended(true);
    }
  };

  const closeQuote = () => {
    setModalIsOpen(false);
    setRequestIsSended(false);
  };

  const showEmailError = (value) => {
    validateEmail(value);
    setEmailErrorIsVisible(true);
  };

  return {
    countriesIsLoading,
    popularCountries,
    dispatch: {
      country: {
        query: dispatchCountryQuery,
        options: filteredCountries,
        selected: selectedDispatchCountry,
        setQuery: setDispatchCountryQuery,
        select: selectDispatchCountry,
        selectPopular: selectPopularDispatchCountry,
      },
      city: {
        isLoading: dispatchCitiesIsLoading,
        query: dispatchCityQuery,
        options: filteredDispatchCities,
        selected: selectedDispatchCity,
        setQuery: setDispatchCityQuery,
        select: setSelectedDispatchCity,
      },
    },
    destination: {
      country: {
        query: destinationCountryQuery,
        options: filteredCountries,
        selected: selectedDestinationCountry,
        setQuery: setDestinationCountryQuery,
        select: selectDestinationCountry,
        selectPopular: selectPopularDestinationCountry,
      },
      city: {
        isLoading: destinationCitiesIsLoading,
        query: destinationCityQuery,
        options: filteredDestinationCities,
        selected: selectedDestinationCity,
        setQuery: setDestinationCityQuery,
        select: setSelectedDestinationCity,
      },
    },
    quote: {
      isOpen: modalIsOpen,
      isSent: requestIsSended,
      emailError: emailErrorIsVisible && emailState.errorMessage,
      open: openQuote,
      close: closeQuote,
      submit: submitQuote,
      validateEmail,
      showEmailError,
    },
  };
};

export default useCalculator;
