import { ReactComponent as MarkerImg } from "../../../assets/layout/map-marker.svg";
import Tags from "../../../ui/Tags";
import ComboSelect from "../../../ui/forms/ComboSelect";
import classes from "./Calculator.module.scss";

export const DispatchFields = ({
  countriesIsLoading,
  countryQuery,
  countryOptions,
  setCountryQuery,
  selectedCountry,
  selectCountry,
  popularCountries,
  selectPopularCountry,
  citiesIsLoading,
  cityQuery,
  cityOptions,
  setCityQuery,
  selectedCity,
  selectCity,
}) => (
  <>
    <div className={classes["calculator__direction"]}>FROM</div>
    <div>
      <div className={classes["calculator__field"]}>
        <ComboSelect
          loading={countriesIsLoading}
          placeholder="Dispatch country"
          query={countryQuery}
          optionsData={countryOptions}
          setQuery={setCountryQuery}
          selected={selectedCountry}
          setSelected={selectCountry}
        />
        <MarkerImg className={classes["calculator__input-img"]} />
      </div>
      <Tags tagList={popularCountries} onClick={selectPopularCountry} />
    </div>
    <div>
      <div className={classes["calculator__field"]}>
        <ComboSelect
          disabled={!Object.keys(selectedCountry).length}
          loading={citiesIsLoading}
          placeholder="Dispatch city"
          query={cityQuery}
          optionsData={cityOptions}
          setQuery={setCityQuery}
          selected={selectedCity}
          setSelected={selectCity}
        />
        <MarkerImg className={classes["calculator__input-img"]} />
      </div>
    </div>
  </>
);

export const DestinationFields = ({
  countriesIsLoading,
  countryQuery,
  countryOptions,
  setCountryQuery,
  selectedCountry,
  selectCountry,
  popularCountries,
  selectPopularCountry,
  citiesIsLoading,
  cityQuery,
  cityOptions,
  setCityQuery,
  selectedCity,
  selectCity,
}) => (
  <>
    <div className={classes["calculator__direction"]}>TO</div>
    <div>
      <div className={classes["calculator__field"]}>
        <ComboSelect
          loading={countriesIsLoading}
          placeholder="Destination country"
          query={countryQuery}
          optionsData={countryOptions}
          setQuery={setCountryQuery}
          selected={selectedCountry}
          setSelected={selectCountry}
        />
        <MarkerImg className={classes["calculator__input-img"]} />
      </div>
      <Tags tagList={popularCountries} onClick={selectPopularCountry} />
    </div>
    <div className={classes["calculator__field"]}>
      <ComboSelect
        disabled={!Object.keys(selectedCountry).length}
        loading={citiesIsLoading}
        placeholder="Destination city"
        query={cityQuery}
        optionsData={cityOptions}
        setQuery={setCityQuery}
        selected={selectedCity}
        setSelected={selectCity}
      />
      <MarkerImg className={classes["calculator__input-img"]} />
    </div>
    <fieldset className={classes["calculator__options"]}>
      <input type="radio" name="delivery-type2" id="4" />
      <label className={classes["calculator__options-label"]} htmlFor="4">
        To the door
      </label>
      <input type="radio" name="delivery-type2" id="5" />
      <label className={classes["calculator__options-label"]} htmlFor="5">
        To pickup point
      </label>
    </fieldset>
  </>
);
