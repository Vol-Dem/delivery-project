import { useCallback, useEffect, useMemo, useState } from "react";
import { getCities, getCountries } from "../../../api/geonames";
import type { City, Country } from "../../../api/geonames";
import type {
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
} from "react";
import { useValidation } from "../../hooks/use-validation";

const visibleCitiesAmount = 200;

const popularCountries = [
  { countryName: "United Kingdom", countryCode: "GB", isoNumeric: "826" },
  { countryName: "Germany", countryCode: "DE", isoNumeric: "276" },
  { countryName: "France", countryCode: "FR", isoNumeric: "250" },
];

/**
 * Owns GeoNames loading, route selection, and quote-dialog state for the
 * delivery calculator.
 */
const useCalculator = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [requestIsSended, setRequestIsSended] = useState(false);
  const [emailErrorIsVisible, setEmailErrorIsVisible] = useState(false);
  const [emailState, validateEmail] = useValidation("email");
  const [dispatchCountryQuery, setDispatchCountryQuery] = useState("");
  const [dispatchCityQuery, setDispatchCityQuery] = useState("");
  const [selectedDispatchCountry, setSelectedDispatchCountry] =
    useState<Country | null>(null);
  const [selectedDispatchCity, setSelectedDispatchCity] =
    useState<City | null>(null);
  const [destinationCountryQuery, setDestinationCountryQuery] = useState("");
  const [destinationCityQuery, setDestinationCityQuery] = useState("");
  const [selectedDestinationCountry, setSelectedDestinationCountry] =
    useState<Country | null>(null);
  const [selectedDestinationCity, setSelectedDestinationCity] =
    useState<City | null>(null);
  const [countriesIsLoading, setCountriesIsLoading] = useState(false);
  const [dispatchCitiesIsLoading, setDispatchCitiesIsLoading] =
    useState(false);
  const [destinationCitiesIsLoading, setDestinationCitiesIsLoading] =
    useState(false);
  const [countriesData, setCountriesData] = useState<Country[]>([]);
  const [citiesOfDispatchCountry, setCitiesOfDispatchCountry] = useState<City[]>(
    [],
  );
  const [citiesOfDestinationCountry, setCitiesOfDestinationCountry] = useState<
    City[]
  >([]);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setCountriesIsLoading(true);
        const countries = await getCountries();
        setCountriesData(countries);
      } catch (error) {
        console.error("Failed to load countries", error);
      } finally {
        setCountriesIsLoading(false);
      }
    };

    loadCountries();
  }, []);

  const filteredDispatchCountries = useMemo(() => {
    return dispatchCountryQuery === ""
      ? countriesData
      : countriesData.filter((country) =>
          country.countryName
            .toLowerCase()
            .includes(dispatchCountryQuery.toLowerCase()),
        );
  }, [dispatchCountryQuery, countriesData]);

  const filteredDestinationCountries = useMemo(() => {
    return destinationCountryQuery === ""
      ? countriesData
      : countriesData.filter((country) =>
          country.countryName
            .toLowerCase()
            .includes(destinationCountryQuery.toLowerCase()),
        );
  }, [destinationCountryQuery, countriesData]);

  const filteredDispatchCities = useMemo(() => {
    return !selectedDispatchCountry?.countryCode
      ? []
      : citiesOfDispatchCountry
          .filter((city) =>
            city.name.toLowerCase().includes(dispatchCityQuery.toLowerCase()),
          )
          .slice(0, visibleCitiesAmount);
  }, [selectedDispatchCountry, dispatchCityQuery, citiesOfDispatchCountry]);

  const filteredDestinationCities = useMemo(() => {
    return !selectedDestinationCountry?.countryCode
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

  const loadCities = useCallback(
    async (
      countryCode: string,
      setCities: Dispatch<SetStateAction<City[]>>,
      setLoading: Dispatch<SetStateAction<boolean>>,
    ) => {
      setLoading(true);

      try {
        const cities = await getCities(countryCode);
        setCities(cities);
      } catch (error) {
        console.error(`Failed to load cities for ${countryCode}`, error);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (selectedDispatchCountry?.countryCode) {
      loadCities(
        selectedDispatchCountry.countryCode,
        setCitiesOfDispatchCountry,
        setDispatchCitiesIsLoading,
      );
    }
  }, [selectedDispatchCountry, loadCities]);

  useEffect(() => {
    if (selectedDestinationCountry?.countryCode) {
      loadCities(
        selectedDestinationCountry.countryCode,
        setCitiesOfDestinationCountry,
        setDestinationCitiesIsLoading,
      );
    }
  }, [selectedDestinationCountry, loadCities]);

  const selectDispatchCountry = (country: Country | null) => {
    setDispatchCityQuery("");
    setSelectedDispatchCity(null);
    setCitiesOfDispatchCountry([]);
    setSelectedDispatchCountry(country);
  };

  const selectDestinationCountry = (country: Country | null) => {
    setDestinationCityQuery("");
    setSelectedDestinationCity(null);
    setCitiesOfDestinationCountry([]);
    setSelectedDestinationCountry(country);
  };

  const selectPopularDispatchCountry = (event: MouseEvent<HTMLDivElement>) => {
    const { tag: countryName, iso: countryCode, id: isoNumeric } =
      (event.target as HTMLElement).dataset;

    if (countryName && countryCode && isoNumeric) {
      selectDispatchCountry({ countryName, countryCode, isoNumeric });
    }
  };

  const selectPopularDestinationCountry = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    const { tag: countryName, iso: countryCode, id: isoNumeric } =
      (event.target as HTMLElement).dataset;

    if (countryName && countryCode && isoNumeric) {
      selectDestinationCountry({ countryName, countryCode, isoNumeric });
    }
  };

  const openQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const email = (event.currentTarget.elements.item(0) as HTMLInputElement)
      .value;

    if (email) {
      setRequestIsSended(true);
    }
  };

  const closeQuote = () => {
    setModalIsOpen(false);
    setRequestIsSended(false);
  };

  const showEmailError = (value: string) => {
    validateEmail(value);
    setEmailErrorIsVisible(true);
  };

  return {
    countriesIsLoading,
    popularCountries,
    dispatch: {
      country: {
        query: dispatchCountryQuery,
        options: filteredDispatchCountries,
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
        options: filteredDestinationCountries,
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
