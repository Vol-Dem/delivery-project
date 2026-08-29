import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import classes from "./ComboSelect.module.scss";
import { motion, AnimatePresence } from "framer-motion";

const ComboSelect = ({
  optionsData,
  setQuery,
  setSelected,
  selected,
  placeholder,
  loading,
  disabled,
}) => {
  const conditionalPlaceholder = !loading ? placeholder : "Loading...";
  const selectOptionHandler = (value) => setSelected(value);
  const closeOptionsHandler = () => setQuery("");
  const queryChangeHandler = (event) => setQuery(event.target.value);

  return (
    <div>
      <Combobox
        immediate
        value={selected}
        onChange={selectOptionHandler}
        onClose={closeOptionsHandler}
      >
        {({ open }) => (
          <>
            <div className={classes.relative}>
              <ComboboxInput
                disabled={loading || disabled}
                placeholder={
                  open && !!optionsData.length
                    ? "Start typing"
                    : conditionalPlaceholder
                }
                className={classes.select}
                displayValue={(options) =>
                  options?.name || options?.countryName
                }
                onChange={queryChangeHandler}
              />
              <ComboboxButton className={classes.button}>
                {!!optionsData?.length && (
                  <motion.div animate={{ rotate: open ? 180 : 0 }}>
                    <ChevronDownIcon className={classes.arrow} />
                  </motion.div>
                )}
              </ComboboxButton>
            </div>
            <AnimatePresence>
              {open && (
                <ComboboxOptions
                  static
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  anchor="bottom"
                  transition
                  className={classes.options}
                  onAnimationComplete={closeOptionsHandler}
                >
                  {optionsData.map((option, index) => {
                    const optionMatchesByName =
                      option?.name && option.name === selected?.name;
                    const optionMatchesCountryName =
                      option?.countryName &&
                      option.countryName === selected?.name;
                    const selectedClass =
                      optionMatchesByName || optionMatchesCountryName
                        ? classes.selected
                        : "";

                    return (
                      <ComboboxOption
                        key={option?.isoNumeric || index}
                        value={option}
                        className={`${classes.option} ${selectedClass}`}
                      >
                        {optionMatchesByName ||
                          (optionMatchesCountryName && (
                            <CheckIcon className={classes.check} />
                          ))}
                        <div>{option?.name || option?.countryName}</div>
                      </ComboboxOption>
                    );
                  })}
                </ComboboxOptions>
              )}
            </AnimatePresence>
          </>
        )}
      </Combobox>
    </div>
  );
};

export default ComboSelect;
